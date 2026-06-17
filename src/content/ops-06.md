# 도커 기반 MSA 통합 배포

이 장에서는 FastAPI + Vue.js + PostgreSQL 풀스택 애플리케이션을 EC2에 네이티브 방식으로 배포하는 기초부터 시작하여, 동일한 스택을 모노레포 + Docker Compose + DockerHub 파이프라인으로 컨테이너화하는 방법을 다룹니다. 마지막으로 Spring Boot(비즈니스 로직)와 FastAPI(AI 추론)를 분리한 마이크로서비스 아키텍처(MSA)를 Nginx 라우팅과 함께 네이티브/Docker 두 가지 방식으로 완성합니다. Nginx가 요청 경로에 따라 화면·일반 API·AI API를 각각의 백엔드로 분기하는 것이 전체 설계의 핵심입니다.

## 10.1 로컬 준비

배포 전 로컬 PC에서 FastAPI와 Vue.js를 각각 준비합니다. FastAPI는 DB 접속 주소를 환경 변수로 읽도록 작성하고 패키지 목록을 추출하며, Vue.js는 정적 파일로 빌드합니다.

### (1) FastAPI 준비

FastAPI 프로젝트의 DB 접속 주소를 `localhost`로 설정하고, 배포 서버에서 동일하게 재설치할 수 있도록 패키지 목록을 추출합니다.

```bash
# 로컬 PC 터미널 (FastAPI 프로젝트 폴더 안에서 실행)

# 현재 가상 환경에 설치된 모든 패키지와 버전을 requirements.txt 파일로 저장
# 배포 서버에서 pip install -r requirements.txt 로 동일 환경을 재현하기 위함
pip freeze > requirements.txt
```

FastAPI 코드에서는 DB 접속 주소를 코드에 직접 박지 않고 환경 변수에서 읽도록 작성합니다. 이렇게 하면 로컬·서버·도커 환경마다 코드를 고치지 않고 접속 정보만 바꿀 수 있습니다.

```python
# fastapi-project/main.py (DB 접속 예시)
import os                              # 운영체제 환경 변수에 접근하기 위한 표준 라이브러리
from sqlalchemy import create_engine   # SQLAlchemy의 DB 엔진 생성 함수

# 환경 변수 DATABASE_URL 값을 읽고, 없으면 두 번째 인자(localhost)를 기본값으로 사용
# 로컬에서는 localhost, 배포/도커 환경에서는 외부에서 주입된 값이 적용됨
DATABASE_URL = os.getenv(
    "DATABASE_URL",                                        # 읽을 환경 변수 이름
    "postgresql://myuser:mypassword@localhost:5432/mydb"   # 기본값(로컬 PostgreSQL)
)

# 읽어온 접속 문자열로 DB 엔진 생성 (실제 연결은 요청 시점에 맺어짐)
engine = create_engine(DATABASE_URL)
```

### (2) Vue.js 빌드

Vue.js 프로젝트를 정적 파일(HTML/CSS/JS)로 빌드합니다. 결과물은 `dist` 폴더에 생성되며, 이후 EC2의 웹 루트로 업로드합니다.

```bash
# 로컬 PC 터미널 (Vue.js 프로젝트 폴더 안에서 실행)

# 프로덕션용 정적 파일 빌드 → dist/ 폴더에 index.html, assets 등이 생성됨
npm run build
```

## 10.2 EC2 환경 구축

EC2 서버에 Nginx(웹 서버 겸 리버스 프록시), PostgreSQL(데이터베이스), Python 가상 환경 도구를 설치하고 DB를 생성합니다.

### (1) 필수 패키지 설치

```bash
# EC2 서버 내부

# 패키지 목록 최신화 후 설치된 패키지 업그레이드 (-y: 모든 확인에 yes)
sudo apt update && sudo apt upgrade -y

# Nginx, PostgreSQL 본체, PostgreSQL 부가 기능 패키지 설치
sudo apt install nginx postgresql postgresql-contrib -y

# Python 패키지 관리자(pip)와 가상 환경 생성 도구(venv) 설치
sudo apt install python3-pip python3-venv -y
```

### (2) PostgreSQL DB 생성

PostgreSQL은 설치 시 `postgres`라는 OS 사용자를 만들며, 이 사용자로 psql 콘솔에 접속해 DB와 계정을 생성합니다.

```bash
# EC2 서버 내부

# postgres OS 계정으로 전환하여 psql 대화형 콘솔 실행
sudo -u postgres psql
```

```sql
-- psql 콘솔 내부 (프롬프트가 postgres=# 로 바뀐 상태)

-- 애플리케이션이 사용할 데이터베이스 생성
CREATE DATABASE mydb;

-- 암호화된 비밀번호를 가진 전용 사용자 계정 생성
CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypassword';

-- 생성한 사용자에게 해당 DB에 대한 모든 권한 부여
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;

-- psql 콘솔 종료
\q
```

## 10.3 파일 업로드 및 FastAPI 실행

WinSCP로 빌드 산출물과 소스를 업로드하고, FastAPI를 가상 환경에서 백그라운드 무중단으로 실행합니다.

### (1) 업로드 폴더 준비

```bash
# EC2 서버 내부

# Nginx 기본 웹 루트(/var/www/html)의 소유자를 ubuntu로 변경
# -R: 하위 폴더/파일까지 재귀적으로 적용 → WinSCP로 업로드 가능해짐
sudo chown -R ubuntu:ubuntu /var/www/html

# FastAPI 소스를 올릴 전용 폴더 생성
mkdir /home/ubuntu/fastapi_app
```

WinSCP를 사용하여 다음과 같이 파일을 전송합니다.

| 대상 | 업로드할 파일 | 업로드 위치 | 비고 |
| --- | --- | --- | --- |
| Vue.js | `dist` 폴더 내부의 모든 파일 | `/var/www/html` | 기존 `index.nginx-debian.html` 삭제 후 |
| FastAPI | `main.py`, 소스 코드 폴더들, `requirements.txt` | `/home/ubuntu/fastapi_app` | `venv`, `__pycache__` 폴더는 제외 |

### (2) 가상 환경 생성 및 FastAPI 실행

```bash
# EC2 서버 내부

# FastAPI 소스 폴더로 이동
cd /home/ubuntu/fastapi_app

# 가상 환경 생성 (venv 폴더가 만들어짐)
python3 -m venv venv

# 가상 환경 활성화 (프롬프트 앞에 (venv) 표시됨)
source venv/bin/activate

# requirements.txt에 명시된 패키지를 가상 환경에 설치
pip install -r requirements.txt

# 백그라운드 무중단 실행
#   nohup : 터미널 종료(로그아웃) 후에도 프로세스가 죽지 않게 함
#   --host 127.0.0.1 : 로컬에서만 접근(외부 노출은 Nginx가 담당)
#   --port 8000 : 8000번 포트로 서비스
#   &     : 백그라운드로 실행 (터미널을 계속 사용 가능)
nohup uvicorn main:app --host 127.0.0.1 --port 8000 &

# 실행 로그를 실시간 확인 (nohup.out 파일에 기록됨, Ctrl+C로 보기 종료)
tail -f nohup.out
```

```text
# 정상 실행 시 출력되는 성공 로그
INFO: Application startup complete.
INFO: Uvicorn running on http://127.0.0.1:8000
```

## 10.4 Nginx 통합 라우팅 설정

Nginx가 80번 포트로 들어온 요청을 경로에 따라 분기합니다. `/`는 Vue.js 정적 파일을 서빙하고, `/api/`는 8000번 포트의 FastAPI로 프록시합니다.

### (1) Nginx 설정

```bash
# EC2 서버 내부

# Nginx 기본 사이트 설정 파일을 편집기로 열기
sudo nano /etc/nginx/sites-available/default
```

```nginx
# /etc/nginx/sites-available/default
server {
    listen 80 default_server;        # IPv4 80번 포트 수신, 기본 서버로 지정
    listen [::]:80 default_server;   # IPv6 80번 포트 수신
    server_name _;                   # 모든 호스트명에 매칭(도메인 미지정)

    # Vue.js 정적 파일 서빙
    location / {
        root /var/www/html;                 # 정적 파일이 위치한 웹 루트
        index index.html index.htm;         # 디렉터리 접근 시 기본 파일
        try_files $uri $uri/ /index.html;   # 파일이 없으면 index.html 반환
                                            #   (Vue Router 새로고침 404 방지)
    }

    # FastAPI API 포워딩 (/api/ → 8000 포트)
    location /api/ {
        proxy_pass http://127.0.0.1:8000;                       # 요청을 FastAPI로 전달
        proxy_set_header X-Real-IP $remote_addr;                # 실제 클라이언트 IP 전달
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  # 프록시 경유 IP 체인
        proxy_set_header Host $http_host;                        # 원본 Host 헤더 유지
    }
}
```

```bash
# 설정 변경 사항을 반영하기 위해 Nginx 재시작
sudo systemctl restart nginx
```

## 11.1 프로젝트 구조

이 장(11장)에서는 FastAPI, Vue.js, PostgreSQL을 모노레포(Monorepo) 방식으로 구성하고 로컬에서 Docker Compose로 테스트한 뒤 DockerHub를 거쳐 AWS EC2에 배포하는 완전한 파이프라인을 실습합니다. 백엔드와 프론트엔드를 하나의 저장소 안에 폴더로 분리하고, 최상위에 전체 서비스를 오케스트레이션하는 `docker-compose.yml`을 둡니다.

```text
my_fullstack_app/
├── backend/                # FastAPI (Python)
│   ├── main.py             # FastAPI 애플리케이션 진입점
│   ├── requirements.txt    # Python 의존성 목록
│   └── Dockerfile          # 백엔드 컨테이너 빌드 정의
├── frontend/               # Vue.js (Node.js)
│   ├── src/                # Vue 소스 코드
│   ├── package.json        # Node 의존성 및 스크립트
│   └── Dockerfile          # 프론트엔드 컨테이너 빌드 정의
└── docker-compose.yml      # 전체 서비스 오케스트레이션
```

## 11.2 백엔드 예시 코드

PostgreSQL과 연동하는 FastAPI 예시 코드를 작성합니다. DB 접속 정보는 환경 변수로 받아 Docker Compose가 주입하도록 설계합니다.

### (1) FastAPI 메인 코드

```text
# backend/requirements.txt
fastapi            # 웹 프레임워크 본체
uvicorn            # ASGI 서버 (FastAPI 실행기)
sqlalchemy         # 파이썬 ORM / DB 툴킷
psycopg2-binary    # PostgreSQL 드라이버 (바이너리 배포판)
```

```python
# backend/main.py
from fastapi import FastAPI                    # FastAPI 프레임워크
from sqlalchemy import create_engine, text     # DB 엔진 생성, 원시 SQL 실행 헬퍼
import os                                      # 환경 변수 접근

app = FastAPI()   # FastAPI 애플리케이션 인스턴스 생성

# 환경 변수에서 DB 접속 정보 가져오기 (Docker Compose의 environment 항목으로 주입)
# 로컬 단독 실행 시에는 기본값(localhost)을 사용
DATABASE_URL = os.getenv(
    "DATABASE_URL",                                      # 읽을 환경 변수
    "postgresql://user:password@localhost:5432/mydb"     # 기본값
)

# 접속 문자열로 DB 엔진 생성
engine = create_engine(DATABASE_URL)

# GET /api/status 엔드포인트: 서버와 DB 연결 상태를 점검
@app.get("/api/status")
def read_status():
    try:
        # DB 커넥션을 열고 (with 블록 종료 시 자동 반환)
        with engine.connect() as conn:
            # 가장 가벼운 검증 쿼리 실행 (성공하면 DB 연결 정상)
            conn.execute(text("SELECT 1"))
            return {
                "status": "ok",
                "db_connection": "success",
                "message": "FastAPI와 PostgreSQL이 연결되었습니다."
            }
    except Exception as e:
        # 연결 실패 시 에러 상세를 응답으로 반환
        return {"status": "error", "details": str(e)}
```

`os.getenv("DATABASE_URL")`는 환경 변수에서 DB 접속 문자열을 읽습니다. Docker Compose에서 `environment` 항목으로 이 값을 컨테이너에 주입합니다. `engine.connect()`로 DB 연결을 시도하고 `SELECT 1` 쿼리가 성공하면 정상 연결로 판단합니다.

## 11.3 프론트엔드 예시 코드

FastAPI 백엔드를 호출하는 Vue.js 컴포넌트 예시를 작성합니다. 핵심은 백엔드 주소를 직접 지정하지 않고 `/api/` 상대 경로로 호출하여 Nginx가 라우팅하게 하는 것입니다.

### (1) App.vue

```javascript
// frontend/src/App.vue
<template>
  <div id="app">
    <h1>풀스택 앱 상태 확인</h1>
    <!-- 버튼 클릭 시 checkStatus 메서드 호출 -->
    <button @click="checkStatus">서버 및 DB 상태 확인</button>
    <!-- statusMessage가 있을 때만 결과를 그대로(pre) 표시 -->
    <pre v-if="statusMessage">{{ statusMessage }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    // 화면에 출력할 상태 메시지 (초기값 빈 문자열)
    return { statusMessage: '' }
  },
  methods: {
    async checkStatus() {
      try {
        // Nginx 리버스 프록시를 통해 /api 요청이 백엔드로 전달됨
        // (백엔드 주소를 직접 쓰지 않고 상대 경로 사용)
        const response = await fetch('/api/status');
        const data = await response.json();              // JSON 응답 파싱
        // 보기 좋게 들여쓰기(2칸)된 문자열로 변환하여 표시
        this.statusMessage = JSON.stringify(data, null, 2);
      } catch (error) {
        // 네트워크 오류 등 실패 시 메시지 표시
        this.statusMessage = '서버 통신 실패: ' + error.message;
      }
    }
  }
}
</script>
```

Vue.js에서 API 호출 시 `http://backend:8000/api/status`처럼 직접 백엔드 주소를 지정하지 않고 `/api/status`처럼 상대 경로를 사용합니다. Nginx가 `/api/` 경로를 감지하여 백엔드 컨테이너로 요청을 전달합니다. 이 방식은 프론트엔드 코드를 수정하지 않고도 백엔드 주소를 변경할 수 있어 유지보수가 편리합니다.

## 11.4 로컬 테스트 및 DockerHub 배포

로컬에서 `docker compose`로 전체 서비스를 한 번에 띄워 테스트하고, 검증이 끝나면 이미지를 DockerHub에 Push합니다.

### (1) 로컬 테스트용 docker-compose.yml

```yaml
# my_fullstack_app/docker-compose.yml
version: '3.8'           # Compose 파일 형식 버전
services:
  db:                                  # PostgreSQL 데이터베이스 서비스
    image: postgres:15                 # 공식 PostgreSQL 15 이미지 사용
    environment:                       # 컨테이너 초기화 환경 변수
      POSTGRES_USER: myuser            # 생성할 DB 사용자
      POSTGRES_PASSWORD: mypassword    # 사용자 비밀번호
      POSTGRES_DB: mydb                # 생성할 기본 데이터베이스
    ports:
      - "5432:5432"                    # 호스트 5432 → 컨테이너 5432 (로컬 접속용)
    volumes:
      - pgdata:/var/lib/postgresql/data  # 데이터 영속화(컨테이너 삭제돼도 보존)

  backend:                             # FastAPI 백엔드 서비스
    build: ./backend                   # ./backend 폴더의 Dockerfile로 빌드
    environment:
      # 컨테이너 간 통신은 서비스명(db)을 호스트로 사용
      DATABASE_URL: postgresql://myuser:mypassword@db:5432/mydb
    depends_on:
      - db                             # db가 먼저 시작된 뒤 backend 시작

  frontend:                            # Vue.js + Nginx 프론트엔드 서비스
    build: ./frontend                  # ./frontend 폴더의 Dockerfile로 빌드
    ports:
      - "80:80"                        # 호스트 80 → 컨테이너 80 (브라우저 접속)
    depends_on:
      - backend                        # backend가 먼저 시작된 뒤 frontend 시작

volumes:
  pgdata:                              # 위에서 사용한 명명 볼륨 선언
```

```bash
# 로컬 PC 터미널

# 로컬에서 전체 서비스(db + backend + frontend) 빌드 후 실행
docker compose up

# 테스트 완료 후 DockerHub에 Push
docker login                                          # DockerHub 로그인
docker build -t your_id/my-backend:v1 ./backend       # 백엔드 이미지 빌드 + 태그
docker build -t your_id/my-frontend:v1 ./frontend     # 프론트엔드 이미지 빌드 + 태그
docker push your_id/my-backend:v1                      # 백엔드 이미지 업로드
docker push your_id/my-frontend:v1                     # 프론트엔드 이미지 업로드
```

## 12.1 전체 MSA 아키텍처

이 장(12장)에서는 일반 비즈니스 로직을 담당하는 Spring Boot(메인 백엔드)와 AI 추론 전용 FastAPI(AI 백엔드)를 분리하여 운영하는 마이크로서비스 아키텍처(MSA)를 구성합니다. Nginx가 요청 경로에 따라 Spring Boot 또는 FastAPI로 요청을 분기하며, 네이티브 방식과 Docker 방식 두 가지를 모두 실습합니다.

```text
브라우저 HTTP 요청 → [Nginx 포트 80]
 ├── /      → /var/www/html       (Vue.js 화면 서빙)
 ├── /api/  → localhost:8080      (Spring Boot 비즈니스 로직)
 └── /ai/   → localhost:8000      (FastAPI AI 추론 로직)

Spring Boot (8080) ↔ PostgreSQL (5432)
```

| 경로 | 처리 주체 | 포트 | 역할 |
| --- | --- | --- | --- |
| `/` | Nginx 정적 서빙 | 80 | Vue.js 화면 |
| `/api/` | Spring Boot | 8080 | 일반 비즈니스 로직 |
| `/ai/` | FastAPI | 8000 | AI 추론 로직 |
| (내부) | PostgreSQL | 5432 | 데이터 저장소 |

## 12.2 네이티브 배포 (Docker 미사용)

Docker 없이 EC2 서버에 Nginx, PostgreSQL, Spring Boot, FastAPI를 직접 설치·실행합니다.

### (1) 로컬 빌드 준비

세 가지 서비스를 각각 빌드 또는 배포 준비합니다.

```bash
# 로컬 PC 터미널

# Spring Boot 빌드 (테스트 제외하여 빠르게 jar 생성)
cd spring-project
./gradlew clean build -x test      # clean: 이전 산출물 삭제, -x test: 테스트 스킵

# FastAPI 패키지 목록 추출
cd fastapi-project
pip freeze > requirements.txt       # 설치된 패키지를 requirements.txt로 저장

# Vue.js 빌드 (API 경로 확인: /api/ → Spring, /ai/ → FastAPI)
cd vue-project
npm run build                       # dist/ 폴더에 정적 파일 생성
```

### (2) EC2 환경 구축

EC2에 Nginx, PostgreSQL, Java 21, Python 가상 환경을 설치합니다.

```bash
# EC2 서버 내부

# 패키지 최신화 및 업그레이드
sudo apt update && sudo apt upgrade -y

# Nginx, PostgreSQL, Python 도구 일괄 설치
sudo apt install nginx postgresql postgresql-contrib python3-pip python3-venv -y

# Java 21 설치 (Azul Zulu OpenJDK)
sudo apt install -y gnupg ca-certificates curl              # 키 등록에 필요한 도구
# Azul 저장소 GPG 키를 내려받아 dearmor(바이너리 변환) 후 저장
curl -s https://repos.azul.com/azul-repo.key \
  | sudo gpg --dearmor -o /usr/share/keyrings/azul.gpg
# Azul Zulu apt 저장소를 sources 목록에 등록 (위 키로 서명 검증)
echo "deb [signed-by=/usr/share/keyrings/azul.gpg] \
  https://repos.azul.com/zulu/apt stable main" \
  | sudo tee /etc/apt/sources.list.d/zulu.list > /dev/null
# 저장소 갱신 후 Zulu 21 JDK 설치
sudo apt update && sudo apt install -y zulu21-jdk
```

### (3) PostgreSQL DB 생성

```bash
# EC2 서버 내부

# postgres 계정으로 psql 콘솔 접속
sudo -u postgres psql
```

```sql
-- psql 콘솔 내부
CREATE DATABASE mydb;                                          -- DB 생성
CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypassword';       -- 사용자 생성
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;               -- 권한 부여
\q                                                             -- 콘솔 종료
```

### (4) 파일 업로드 및 서비스 실행

폴더를 생성하고 WinSCP로 파일을 업로드한 후 두 개의 백엔드를 실행합니다.

```bash
# EC2 서버 내부

# 웹 루트 소유권 변경 (Vue.js 업로드 가능하게)
sudo chown -R ubuntu:ubuntu /var/www/html

# Spring Boot, FastAPI용 폴더 각각 생성
mkdir /home/ubuntu/spring_app
mkdir /home/ubuntu/fastapi_app
```

WinSCP로 다음과 같이 파일을 전송합니다.

| 대상 | 업로드할 파일 | 업로드 위치 | 비고 |
| --- | --- | --- | --- |
| Vue.js | `dist` 내부 파일 | `/var/www/html` | 기존 기본 페이지 삭제 후 |
| Spring Boot | `.jar` 파일 | `/home/ubuntu/spring_app` | gradlew 빌드 산출물 |
| FastAPI | `main.py`, 소스 폴더, `requirements.txt` | `/home/ubuntu/fastapi_app` | `venv` 제외 |

```bash
# EC2 서버 내부

# Spring Boot 실행 (8080 포트)
cd /home/ubuntu/spring_app
nohup java -jar myproject-0.0.1-SNAPSHOT.jar &   # 백그라운드 무중단 실행
tail -f nohup.out                                # 시작 로그 확인
# 시작 확인 후 Ctrl+C (로그 보기만 종료, 프로세스는 계속 동작)

# FastAPI 실행 (8000 포트)
cd /home/ubuntu/fastapi_app
python3 -m venv venv                                          # 가상 환경 생성
source venv/bin/activate                                      # 활성화
pip install -r requirements.txt                               # 패키지 설치
nohup uvicorn main:app --host 127.0.0.1 --port 8000 &         # 백그라운드 실행
tail -f nohup.out                                             # 시작 로그 확인
```

### (5) Nginx MSA 라우팅 설정

Nginx가 경로에 따라 Spring Boot(`/api/`)와 FastAPI(`/ai/`)로 요청을 분기하도록 설정합니다.

```bash
# EC2 서버 내부

# Nginx 기본 사이트 설정 편집
sudo nano /etc/nginx/sites-available/default
```

```nginx
# /etc/nginx/sites-available/default
server {
    listen 80 default_server;        # IPv4 80번 포트 수신
    listen [::]:80 default_server;   # IPv6 80번 포트 수신
    server_name _;                   # 모든 호스트명에 매칭

    # Vue.js 화면 (새로고침 404 방지 포함)
    location / {
        root /var/www/html;                 # 정적 파일 위치
        index index.html index.htm;         # 기본 문서
        try_files $uri $uri/ /index.html;   # 없는 경로는 index.html로 (SPA 라우팅)
    }

    # Spring Boot 비즈니스 API (8080 포트)
    location /api/ {
        proxy_pass http://127.0.0.1:8080;                            # Spring Boot로 전달
        proxy_set_header X-Real-IP $remote_addr;                     # 실제 클라이언트 IP
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # 프록시 IP 체인
        proxy_set_header Host $http_host;                            # 원본 Host 유지
    }

    # FastAPI AI 추론 API (8000 포트)
    location /ai/ {
        proxy_pass http://127.0.0.1:8000;                            # FastAPI로 전달
        proxy_set_header X-Real-IP $remote_addr;                     # 실제 클라이언트 IP
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # 프록시 IP 체인
        proxy_set_header Host $http_host;                            # 원본 Host 유지
    }
}
```

```bash
# 설정 반영을 위해 Nginx 재시작
sudo systemctl restart nginx
```

## 12.3 Docker 기반 MSA 배포 (DockerHub 활용)

Docker를 사용하여 네 개의 컨테이너(PostgreSQL, Spring Boot, FastAPI, Vue.js + Nginx)로 구성된 MSA 시스템을 배포합니다. 각 서비스를 이미지로 빌드해 DockerHub에 Push한 뒤, EC2에서 `docker-compose.yml` 하나로 모두 실행합니다.

### (1) Spring Boot Dockerfile 및 Push

```dockerfile
# spring-project/Dockerfile
FROM azul/zulu-openjdk:21                    # Java 21 런타임이 포함된 베이스 이미지
WORKDIR /app                                 # 컨테이너 작업 디렉터리 설정
COPY build/libs/*-SNAPSHOT.jar app.jar       # 빌드된 jar를 app.jar로 복사
EXPOSE 8080                                  # 8080 포트 사용을 문서화(노출 선언)
CMD ["java", "-jar", "app.jar"]              # 컨테이너 시작 시 jar 실행
```

```bash
# 로컬 PC 터미널

./gradlew clean build -x test                  # jar 빌드(테스트 제외)
docker build -t your_id/spring-backend:v1 .    # 이미지 빌드 + 태그
docker push your_id/spring-backend:v1          # DockerHub에 업로드
```

### (2) FastAPI Dockerfile 및 Push

```dockerfile
# fastapi-project/Dockerfile
FROM python:3.12-slim                                          # 경량 Python 3.12 베이스
WORKDIR /app                                                   # 작업 디렉터리
COPY requirements.txt .                                        # 의존성 목록 먼저 복사(캐시 활용)
RUN pip install --no-cache-dir -r requirements.txt            # 의존성 설치(캐시 미사용)
COPY . .                                                       # 나머지 소스 전체 복사
EXPOSE 8000                                                    # 8000 포트 노출 선언
# 컨테이너 시작 시 uvicorn 실행 (--host 0.0.0.0: 컨테이너 외부에서 접근 가능)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```bash
# 로컬 PC 터미널

docker build -t your_id/fastapi-backend:v1 .   # 이미지 빌드 + 태그
docker push your_id/fastapi-backend:v1         # DockerHub에 업로드
```

### (3) Vue.js Dockerfile (이중 프록시)

`/api/`는 Spring Boot로, `/ai/`는 FastAPI로 전달하는 Nginx 설정이 포함된 Vue.js Dockerfile을 작성합니다. 컨테이너 간 통신이므로 `proxy_pass` 대상에 서비스명(`spring-backend`, `fastapi-backend`)을 사용합니다.

```dockerfile
# vue-project/Dockerfile
FROM nginx:alpine                          # 경량 Nginx 베이스 이미지
COPY dist /usr/share/nginx/html            # 빌드된 Vue 정적 파일을 웹 루트로 복사

# 이미지 빌드 시점에 Nginx 설정 파일을 생성 (\ 는 줄 연결, \$ 는 셸 변수 치환 방지)
RUN echo "server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files \$uri \$uri/ /index.html; \
    }\
    location /api/ { \
        proxy_pass http://spring-backend:8080; \
    }\
    location /ai/ { \
        proxy_pass http://fastapi-backend:8000; \
    }\
}" > /etc/nginx/conf.d/default.conf

EXPOSE 80                                  # 80 포트 노출 선언
CMD ["nginx", "-g", "daemon off;"]         # 포그라운드로 Nginx 실행(컨테이너 유지)
```

```bash
# 로컬 PC 터미널

npm run build                               # Vue 정적 파일 빌드(dist 생성)
docker build -t your_id/vue-frontend:v1 .   # 이미지 빌드 + 태그
docker push your_id/vue-frontend:v1         # DockerHub에 업로드
```

### (4) EC2 배포용 docker-compose.yml

4개 컨테이너를 한 번에 실행하는 `docker-compose.yml`을 작성합니다. WinSCP로 EC2의 `/home/ubuntu`에 업로드합니다.

```yaml
# docker-compose.yml
version: '3.8'

services:
  db:                                  # PostgreSQL 데이터베이스
    image: postgres:15                 # 공식 PostgreSQL 15 이미지
    environment:
      POSTGRES_USER: myuser            # DB 사용자
      POSTGRES_PASSWORD: mypassword    # 비밀번호
      POSTGRES_DB: mydb                # 기본 DB
    volumes:
      - pgdata:/var/lib/postgresql/data  # 데이터 영속화
    restart: always                    # 비정상 종료/재부팅 시 자동 재시작

  spring-backend:                      # Spring Boot 비즈니스 백엔드
    image: your_id/spring-backend:v1   # DockerHub에서 받은 이미지 사용
    environment:
      # JDBC 접속 URL (호스트=서비스명 db)
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/mydb
      SPRING_DATASOURCE_USERNAME: myuser       # DB 사용자
      SPRING_DATASOURCE_PASSWORD: mypassword   # DB 비밀번호
    depends_on:
      - db                             # db 시작 후 기동
    restart: always

  fastapi-backend:                     # FastAPI AI 백엔드
    image: your_id/fastapi-backend:v1  # DockerHub 이미지
    environment:
      # SQLAlchemy 접속 URL (호스트=서비스명 db)
      DATABASE_URL: postgresql://myuser:mypassword@db:5432/mydb
    depends_on:
      - db
    restart: always

  frontend:                            # Vue.js + Nginx 프론트엔드
    image: your_id/vue-frontend:v1     # DockerHub 이미지
    ports:
      - "80:80"                        # 호스트 80 → 컨테이너 80 (외부 진입점)
    depends_on:
      - spring-backend                 # 두 백엔드 기동 후 시작
      - fastapi-backend
    restart: always

volumes:
  pgdata:                              # 명명 볼륨 선언
```

```bash
# EC2 서버 내부

docker compose up -d        # 4개 컨테이너를 백그라운드(-d)로 실행
docker compose ps           # 실행 중인 컨테이너 상태 확인
```

```text
# 성공 시 4개 컨테이너 모두 Up 상태
NAME              IMAGE                        STATUS
db                postgres:15                  Up 30 seconds
spring-backend    your_id/spring-backend:v1    Up 25 seconds
fastapi-backend   your_id/fastapi-backend:v1   Up 23 seconds
frontend          your_id/vue-frontend:v1      Up 20 seconds
```

4개 컨테이너가 모두 Up 상태이면 MSA 기반 풀스택 배포가 성공적으로 완료된 것입니다. 브라우저에서 `http://[탄력적_IP_주소]`로 접속하면 Vue.js 화면이 표시되고, 일반 로직은 Spring Boot가, AI 추론 로직은 FastAPI가 처리하며, 각각 PostgreSQL과 통신하는 완전한 4중 컨테이너 MSA 시스템이 작동합니다.
