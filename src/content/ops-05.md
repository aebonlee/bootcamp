# 풀스택 통합 배포 — Spring Boot · FastAPI · Vue · PostgreSQL

이 장에서는 풀스택 애플리케이션을 실제 서버에 올리는 세 가지 시나리오를 실습한다. 먼저 Docker 없이 하나의 EC2 서버에 PostgreSQL · Spring Boot · Vue.js + Nginx를 직접 설치하는 네이티브 배포(7장), 이어서 동일한 스택을 Docker 이미지로 만들어 DockerHub에 올리고 `docker-compose.yml` 하나로 배포하는 컨테이너 방식(8장), 마지막으로 백엔드를 FastAPI(Python)로 교체한 컨테이너 배포(9장)를 다룬다. 세 방식 모두 Nginx가 80번 포트에서 화면(`/`)과 API(`/api/`) 요청을 분기하는 통합 라우팅 구조를 공유한다.

## 7.1 전체 아키텍처

이 절에서는 7장에서 구성할 시스템의 전체 트래픽 흐름을 설명한다. Docker를 사용하지 않고 하나의 EC2 서버에 PostgreSQL(DB), Spring Boot(백엔드), Vue.js + Nginx(프론트엔드)를 직접 설치하여 연결하는 네이티브 배포 방식이다. Nginx가 80번 포트에서 모든 요청을 받아 화면 요청은 Vue.js 정적 파일로, API 요청(`/api/`)은 Spring Boot(8080)로 분기한다.

```text
브라우저 HTTP 요청  →  [Nginx 포트 80]
 ├── /     → /var/www/html        (Vue.js 정적 파일 서빙)
 └── /api/ → localhost:8080       (Spring Boot 리버스 프록시)
              └── localhost:5432  (PostgreSQL)
```

| 구성 요소 | 역할 | 포트 |
| --- | --- | --- |
| Nginx | 진입점 · 정적 파일 서빙 · 리버스 프록시 | 80 |
| Vue.js (정적 dist) | 프론트엔드 화면 | (Nginx가 서빙) |
| Spring Boot | 백엔드 API | 8080 |
| PostgreSQL | 데이터베이스 | 5432 |

핵심은 모든 구성 요소가 같은 서버(localhost)에서 동작한다는 점이다. 따라서 Spring Boot의 DB 접속 주소도, Nginx의 프록시 대상도 모두 `localhost`를 가리킨다.

## 7.2 로컬 빌드

이 절에서는 배포 전 로컬 PC에서 Spring Boot와 Vue.js를 각각 빌드한다.

### (1) Spring Boot 설정 변경

배포용 DB 접속 주소를 `localhost`로 설정한다. 서버 한 대에 DB와 백엔드가 함께 실행되므로 `localhost`를 사용한다.

```yaml
# src/main/resources/application.yml
spring:
  datasource:
    # 같은 EC2 서버 안의 PostgreSQL(5432)에 접속하므로 호스트는 localhost
    url: jdbc:postgresql://localhost:5432/mydb   # jdbc:postgresql://[호스트]:[포트]/[DB이름]
    username: myuser        # 7.4에서 생성할 DB 사용자 계정
    password: mypassword    # 해당 사용자의 비밀번호 (운영에서는 환경변수 권장)
```

```bash
# 로컬 PC 터미널 (Spring Boot 프로젝트 폴더)
# clean: 기존 빌드 산출물 삭제 / build: 새로 빌드 / -x test: 테스트 단계 건너뛰기(배포 속도 향상)
./gradlew clean build -x test
# 빌드 성공 시 build/libs/ 폴더에 *-SNAPSHOT.jar 파일이 생성된다.
```

### (2) Vue.js 빌드

Vue.js 프론트엔드를 빌드한다. 코드에서 API 요청이 `/api/...` 형태로 호출되는지 미리 확인한다(Nginx가 이 경로를 기준으로 백엔드에 분기하기 때문).

```bash
# 로컬 PC 터미널
cd my-vue-project   # Vue 프로젝트 폴더로 이동
npm run build       # 프로덕션 빌드 실행 → dist/ 폴더에 index.html, assets/ 생성
# dist/ 폴더가 곧 Nginx가 서빙할 정적 파일 묶음이다.
```

## 7.3 EC2 서버 환경 구축

이 절에서는 EC2에 Nginx, PostgreSQL, Java 21을 한 번에 설치한다.

### (1) 한 번에 설치

```bash
# EC2 서버 내부 (SSH 접속 상태)

# 패키지 목록 갱신 후 설치된 패키지 업그레이드 (-y: 모든 확인에 자동 yes)
sudo apt update && sudo apt upgrade -y

# Nginx, PostgreSQL 설치 (postgresql-contrib: 부가 확장 모듈 포함)
sudo apt install nginx postgresql postgresql-contrib -y

# --- Zulu Java 21 설치 (Azul OpenJDK 저장소 사용) ---
# 저장소 키를 다루기 위한 필수 도구 설치
sudo apt install -y gnupg ca-certificates curl

# Azul 저장소 서명 키를 내려받아 keyring 형식으로 변환·저장
curl -s https://repos.azul.com/azul-repo.key \
 | sudo gpg --dearmor -o /usr/share/keyrings/azul.gpg

# Azul APT 저장소를 소스 목록에 추가 (위에서 받은 키로 서명 검증)
echo "deb [signed-by=/usr/share/keyrings/azul.gpg] \
 https://repos.azul.com/zulu/apt stable main" \
 | sudo tee /etc/apt/sources.list.d/zulu.list > /dev/null

# 저장소 목록 갱신 후 Zulu JDK 21 설치
sudo apt update && sudo apt install -y zulu21-jdk
```

## 7.4 PostgreSQL DB 및 사용자 생성

이 절에서는 PostgreSQL에 Spring Boot가 사용할 데이터베이스와 사용자를 생성한다.

### (1) DB 콘솔 접속 및 생성

```bash
# EC2 서버 내부
# postgres 관리자(슈퍼유저) 계정으로 psql DB 콘솔에 진입
sudo -u postgres psql
```

```sql
-- DB 콘솔 내부에서 실행 (각 문장 끝의 세미콜론 ; 필수)

-- 애플리케이션이 사용할 데이터베이스 생성
CREATE DATABASE mydb;

-- 접속용 사용자 생성 (비밀번호는 암호화 저장)
CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypassword';

-- 위 사용자에게 mydb에 대한 모든 권한 부여
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;

-- 콘솔 종료
\q
```

> application.yml의 `username/password/url`과 위 SQL의 사용자·DB 이름이 정확히 일치해야 Spring Boot가 DB에 연결된다.

## 7.5 파일 업로드 및 서비스 실행

이 절에서는 WinSCP로 빌드 파일을 업로드하고 서비스를 실행한다.

### (1) 폴더 권한 설정 및 파일 업로드

```bash
# EC2 서버 내부

# Nginx 웹 루트 폴더의 소유권을 ubuntu 사용자로 변경 (-R: 하위 전체 재귀 적용)
# → WinSCP로 파일을 올릴 때 권한 오류를 방지
sudo chown -R ubuntu:ubuntu /var/www/html

# Spring Boot jar 파일을 업로드할 폴더 생성
mkdir /home/ubuntu/spring_app
```

WinSCP 업로드 절차:

1. WinSCP 오른쪽 창(서버)을 `/var/www/html` 경로로 이동하여 기본 파일 `index.nginx-debian.html`을 삭제한다.
2. 왼쪽 창(로컬)의 Vue.js `dist` 폴더 내부 파일(`index.html`, `assets/`)을 `/var/www/html`로 드래그 앤 드롭한다.
3. 다시 오른쪽 창을 `/home/ubuntu/spring_app` 경로로 이동하고, Spring Boot의 `.jar` 파일을 드래그 앤 드롭한다.

### (2) Spring Boot 실행

```bash
# EC2 서버 내부
cd /home/ubuntu/spring_app

# nohup: 터미널을 닫아도 프로세스 유지 / java -jar: jar 실행 / & : 백그라운드 실행
nohup java -jar myproject-0.0.1-SNAPSHOT.jar &

# 실행 로그(nohup.out)를 실시간으로 확인 (정상 기동·DB 연결 여부 점검)
tail -f nohup.out
```

## 7.6 Nginx 통합 라우팅 설정

이 절에서는 Nginx가 Vue.js 화면과 Spring Boot API 요청을 올바르게 분기하도록 설정한다.

### (1) Nginx 설정 파일 작성

```bash
# EC2 서버 내부
# 기본 사이트 설정 파일을 편집기로 연다
sudo nano /etc/nginx/sites-available/default
```

```nginx
# /etc/nginx/sites-available/default (파일 내용 전체 교체)
server {
    listen 80 default_server;        # IPv4 80번 포트에서 수신 (기본 서버 블록)
    listen [::]:80 default_server;   # IPv6 80번 포트에서 수신
    server_name _;                   # 모든 호스트명 매칭 (도메인 미지정 시 _)

    # Vue.js 화면 서빙 (새로고침 404 방지 포함)
    location / {
        root /var/www/html;                  # 정적 파일이 위치한 루트 디렉터리
        index index.html index.htm;          # 디렉터리 요청 시 기본 제공 파일
        try_files $uri $uri/ /index.html;    # 요청 경로가 없으면 index.html로 폴백
                                             # → Vue Router 경로에서 새로고침해도 404 방지
    }

    # Spring Boot API 포워딩 (/api/ 경로 → 8080 포트)
    location /api/ {
        proxy_pass http://localhost:8080;                         # 내부 Spring Boot로 전달
        proxy_set_header X-Real-IP $remote_addr;                  # 실제 클라이언트 IP 전달
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # 프록시 체인 IP 누적
        proxy_set_header Host $http_host;                         # 원본 Host 헤더 보존
    }
}
```

```bash
# nano 저장: Ctrl + O → Enter → Ctrl + X
# 설정 적용을 위해 Nginx 재시작
sudo systemctl restart nginx
```

이 Nginx 설정으로 두 가지 라우팅이 동시에 적용된다. 첫째, `/` 경로는 `/var/www/html`의 Vue.js 파일을 서빙한다. `try_files $uri $uri/ /index.html` 덕분에 Vue Router 경로에서 새로고침해도 404 에러가 발생하지 않는다. 둘째, `/api/` 경로는 `proxy_pass`를 통해 내부의 Spring Boot(8080 포트)로 요청을 전달한다.

## 8.1 Dockerfile 작성 및 DockerHub Push

8장에서는 Spring Boot, Vue.js, PostgreSQL을 각각 도커 이미지로 만들어 DockerHub에 업로드한 후, AWS EC2에서 `docker-compose.yml` 파일 하나로 전체 풀스택 서비스를 배포하는 현대적인 프로덕션 배포 방식을 실습한다. 이 절에서는 Spring Boot와 Vue.js 각각에 대한 Dockerfile을 작성하고 DockerHub에 이미지를 업로드한다.

### (1) Spring Boot Dockerfile

```dockerfile
# spring-project/Dockerfile

# Java 21 Zulu OpenJDK 공식 이미지를 베이스로 사용
FROM azul/zulu-openjdk:21

# 컨테이너 내 작업 디렉터리 설정 (이후 명령의 기준 경로)
WORKDIR /app

# 빌드된 jar 파일을 컨테이너 안으로 복사 (build/libs/의 SNAPSHOT jar → app.jar)
COPY build/libs/*-SNAPSHOT.jar app.jar

# Spring Boot 기본 포트 (문서화 목적의 노출 선언)
EXPOSE 8080

# 컨테이너 실행 시 jar 파일 구동
CMD ["java", "-jar", "app.jar"]
```

```bash
# 로컬 PC 터미널 (Spring Boot 프로젝트 폴더)

# Spring Boot 먼저 빌드 (jar 산출물 생성)
./gradlew clean build -x test

# 도커 이미지 빌드 ( -t: 이미지 이름:태그 지정 / . : 현재 폴더의 Dockerfile 사용 )
docker build -t your_id/spring-backend:v1 .

# DockerHub에 이미지 업로드 (사전 docker login 필요)
docker push your_id/spring-backend:v1
```

### (2) Vue.js Dockerfile (Nginx 내장)

Vue.js를 빌드하고 Nginx로 서빙하는 멀티 스테이지 Dockerfile을 작성한다.

```dockerfile
# vue-project/Dockerfile

# 1단계: Node.js로 빌드
FROM node:18 AS build-stage      # 빌드 전용 스테이지에 이름 부여
WORKDIR /app
COPY package*.json ./            # 의존성 정의 파일 먼저 복사 (레이어 캐시 최적화)
RUN npm install                  # 의존성 설치
COPY . .                         # 나머지 소스 전체 복사
RUN npm run build                # 프로덕션 빌드 → /app/dist 생성

# 2단계: Nginx로 정적 파일 서빙 + API 리버스 프록시
FROM nginx:alpine                # 경량 Nginx Alpine 이미지 (최종 이미지)

# 빌드 결과물만 복사 (1단계 dist → Nginx 기본 웹 루트)
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Nginx 설정 생성: / → Vue, /api/ → Spring Boot(backend:8080)
# (echo로 한 줄짜리 server 블록을 conf.d/default.conf에 기록)
RUN echo "server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files \$uri \$uri/ /index.html; \
    }\
    location /api/ { \
        proxy_pass http://backend:8080/api/; \
    }\
}" > /etc/nginx/conf.d/default.conf

EXPOSE 80                        # 외부 노출 포트
CMD ["nginx", "-g", "daemon off;"]  # Nginx를 포그라운드로 실행(컨테이너 유지)
```

```bash
# 로컬 PC 터미널 (Vue.js 프로젝트 폴더)
docker build -t your_id/vue-frontend:v1 .   # 멀티 스테이지 이미지 빌드
docker push your_id/vue-frontend:v1         # DockerHub 업로드
```

이 Dockerfile은 멀티 스테이지(Multi-Stage) 빌드 방식을 사용한다. 1단계(build-stage)에서 Node.js 환경에서 `npm run build`를 실행하여 dist 폴더를 생성한다. 2단계에서는 경량 Nginx Alpine 이미지에 1단계의 빌드 결과물만 복사한다. 최종 이미지에 Node.js 환경이 포함되지 않으므로 이미지 크기가 훨씬 작아진다. `RUN echo`의 Nginx 설정에서 `proxy_pass http://backend:8080`은 Docker Compose 네트워크 내부에서 `backend`라는 이름의 컨테이너로 요청을 전달한다.

## 8.2 EC2 배포용 docker-compose.yml

이 절에서는 EC2 서버에서 사용할 배포용 `docker-compose.yml`을 작성하고 배포한다. DockerHub에 올린 이미지를 그대로 내려받아 실행하는 구조다.

### (1) docker-compose.yml 작성 및 업로드

```yaml
# docker-compose.yml (로컬 작성 후 WinSCP로 EC2 서버에 전송)
version: '3.8'

services:
  db:
    image: postgres:15                 # PostgreSQL 15 공식 이미지
    environment:                       # 컨테이너 최초 기동 시 DB 자동 생성
      POSTGRES_USER: myuser            # DB 사용자
      POSTGRES_PASSWORD: mypassword    # DB 비밀번호
      POSTGRES_DB: mydb                # 기본 생성 데이터베이스
    volumes:
      - pgdata:/var/lib/postgresql/data  # 데이터 영구 보존 (컨테이너 삭제돼도 유지)
    restart: always                    # 비정상 종료·재부팅 시 자동 재시작

  backend:
    image: your_id/spring-backend:v1   # 8.1에서 push한 Spring Boot 이미지
    environment:                       # application.yml을 덮어쓰는 환경변수
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/mydb  # 호스트명 db = 위 db 서비스
      SPRING_DATASOURCE_USERNAME: myuser
      SPRING_DATASOURCE_PASSWORD: mypassword
    depends_on:
      - db                             # db 컨테이너 시작 후 기동
    restart: always

  frontend:
    image: your_id/vue-frontend:v1     # 8.1에서 push한 Vue + Nginx 이미지
    ports:
      - "80:80"                        # 호스트 80 ↔ 컨테이너 80 (외부 진입점)
    depends_on:
      - backend                        # backend 시작 후 기동
    restart: always

volumes:
  pgdata:                              # 위에서 참조한 명명 볼륨 선언
```

```bash
# EC2 서버 내부
docker compose up -d   # 모든 서비스를 백그라운드(-d)로 실행 (이미지 자동 pull)
docker compose ps      # 컨테이너 상태 확인 (db / backend / frontend)
```

> 컨테이너 간 통신은 Compose가 만든 내부 네트워크에서 **서비스 이름**(`db`, `backend`)을 호스트명처럼 사용한다. 그래서 7장의 `localhost`가 여기서는 `db`, `backend`로 바뀐다.

## 9.1 FastAPI 배포 준비 및 Dockerfile

9장에서는 FastAPI(Python 3.12)를 백엔드로 사용하는 풀스택 애플리케이션을 DockerHub에 올리고 AWS EC2에 배포한다. Python은 Java와 달리 별도의 컴파일 과정 없이 소스 코드 자체를 도커 이미지로 패키징한다. 이 절에서는 FastAPI 프로젝트의 의존성을 추출하고 Dockerfile을 작성한다.

### (1) requirements.txt 생성

현재 Python 가상 환경에 설치된 패키지 목록을 `requirements.txt` 파일로 추출한다.

```bash
# 로컬 PC 터미널 (FastAPI 프로젝트 폴더, 가상환경 활성화 상태)
# 설치된 모든 패키지와 버전을 파일로 저장 → 도커 이미지에서 동일하게 재현
pip freeze > requirements.txt
```

### (2) FastAPI Dockerfile

```dockerfile
# fastapi-project/Dockerfile

# Python 3.12 슬림 버전 이미지 (불필요한 패키지 제외, 경량)
FROM python:3.12-slim

WORKDIR /app

# 패키지 목록 먼저 복사 (레이어 캐시 최적화)
COPY requirements.txt .
# --no-cache-dir: pip 캐시 미저장으로 이미지 용량 절감
RUN pip install --no-cache-dir -r requirements.txt

# 소스 코드 전체 복사
COPY . .

# FastAPI 기본 포트
EXPOSE 8000

# uvicorn으로 FastAPI 서버 구동 (main 모듈의 app 객체, 외부 접속 허용 0.0.0.0)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```bash
# 로컬 PC 터미널
docker build -t your_id/fastapi-backend:v1 .   # FastAPI 이미지 빌드
docker push your_id/fastapi-backend:v1         # DockerHub 업로드
```

Python FastAPI의 Dockerfile은 소스 코드 원본과 `requirements.txt`를 함께 이미지에 포함한다. `COPY requirements.txt .`을 소스 코드 복사 전에 수행하는 이유는 도커 레이어 캐시를 활용하기 위해서다. `requirements.txt`가 변경되지 않으면 `pip install` 단계가 캐시에서 재사용되어 빌드 시간이 크게 줄어든다.

## 9.2 Vue.js Dockerfile (FastAPI 연동)

이 절에서는 API 요청을 FastAPI(8000 포트)로 전달하는 Nginx 설정이 포함된 Vue.js Dockerfile을 작성한다. 8장과 달리 프록시 대상 포트가 8080이 아니라 8000이다.

### (1) Vue.js Dockerfile

```dockerfile
# vue-project/Dockerfile
FROM nginx:alpine                 # 경량 Nginx 이미지

# 로컬에서 미리 빌드한 dist 폴더를 Nginx 웹 루트로 복사
COPY dist /usr/share/nginx/html

# /api/ 요청을 backend 컨테이너(8000 포트)로 전달하는 Nginx 설정 생성
RUN echo "server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files \$uri \$uri/ /index.html; \
    }\
    location /api/ { \
        proxy_pass http://backend:8000; \
    }\
}" > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# 로컬 PC 터미널 (Vue.js 프로젝트 폴더, npm run build 후)
docker build -t your_id/vue-frontend:v1 .   # dist를 담은 Nginx 이미지 빌드
docker push your_id/vue-frontend:v1         # DockerHub 업로드
```

> 이 Dockerfile은 `npm run build`로 만든 `dist`가 이미 있어야 한다(8장처럼 컨테이너 내부에서 빌드하지 않고 로컬 산출물을 그대로 복사하는 단순 방식).

## 9.3 EC2 배포용 docker-compose.yml

이 절에서는 FastAPI 기반 풀스택 서비스를 EC2에서 실행하는 `docker-compose.yml`을 작성한다. 8.2와 거의 동일하나 백엔드 이미지와 DB 접속 환경변수 형식이 다르다.

### (1) docker-compose.yml 작성

```yaml
# docker-compose.yml
version: '3.8'

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydb
    volumes:
      - pgdata:/var/lib/postgresql/data   # 데이터 영구 보존
    restart: always

  backend:
    image: your_id/fastapi-backend:v1     # 9.1에서 push한 FastAPI 이미지
    environment:
      # FastAPI/SQLAlchemy 형식의 접속 URL (호스트명 db = db 서비스)
      DATABASE_URL: postgresql://myuser:mypassword@db:5432/mydb
    depends_on:
      - db
    restart: always

  frontend:
    image: your_id/vue-frontend:v1        # 9.2에서 push한 Vue + Nginx 이미지
    ports:
      - "80:80"                           # 외부 진입점
    depends_on:
      - backend
    restart: always

volumes:
  pgdata:
```

```bash
# EC2 서버 내부
docker compose up -d   # 전체 스택 백그라운드 실행
docker compose ps      # db / backend / frontend 상태 확인
```

| 항목 | 8장 (Spring Boot) | 9장 (FastAPI) |
| --- | --- | --- |
| 백엔드 이미지 | `your_id/spring-backend:v1` | `your_id/fastapi-backend:v1` |
| 백엔드 포트 | 8080 | 8000 |
| DB 접속 환경변수 | `SPRING_DATASOURCE_URL` 등 3개 | `DATABASE_URL` 1개 |
| 빌드 방식 | jar 빌드 후 패키징 | 소스 코드 그대로 패키징 |
| Nginx 프록시 대상 | `http://backend:8080/api/` | `http://backend:8000` |

세 시나리오를 관통하는 공통 원칙은 동일하다. Nginx가 단일 진입점(80)에서 화면과 API를 분기하고, `try_files`로 SPA 새로고침 404를 막으며, 백엔드는 DB 접속 정보를 환경에 맞게(localhost 또는 서비스명) 주입받는다는 점이다.
