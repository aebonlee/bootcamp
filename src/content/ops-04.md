# 프레임워크별 AWS 배포 — HTML · Vue.js · Spring Boot

이 장에서는 세 가지 대표 유형의 웹 애플리케이션을 AWS EC2에 직접 배포합니다. 순수 HTML5 정적 사이트는 Nginx만으로 서빙하고, Vue.js SPA는 빌드 후 Nginx + Vue Router 설정으로 새로고침 404를 방지하며, Spring Boot 3 백엔드는 Java 21을 설치하고 .jar를 실행한 뒤 Nginx 리버스 프록시로 연결합니다. Docker 없이 가장 기본이 되는 네이티브 배포 방식을 단계별로 익힙니다.

## 4.1 EC2 서버에 Nginx 설치

순수 HTML5, CSS3, JavaScript로 구성된 정적 웹 애플리케이션을 별도의 백엔드 서버나 Docker 없이 Nginx 웹 서버만 설치하여 서빙합니다. 이 절에서는 EC2 서버에 접속하여 Nginx를 설치하고, HTML 파일을 업로드할 수 있도록 폴더 권한을 설정합니다.

### (1) Nginx 설치 및 폴더 권한 설정

apt 패키지 관리자를 사용하여 Nginx를 설치하고 `/var/www/html` 폴더의 소유권을 변경합니다. 아래 명령은 EC2 서버 내부(SSH 또는 WinSCP 터미널)에서 실행합니다.

```bash
# 1. 시스템 패키지 목록을 최신 상태로 갱신 (설치 전 항상 수행)
sudo apt update

# 2. Nginx 웹 서버 설치 (-y: 설치 도중 모든 확인 질문에 자동으로 yes 응답)
sudo apt install nginx -y

# 3. /var/www/html 폴더의 소유권(owner:group)을 ubuntu 유저에게 부여
#    -R: 하위 폴더·파일까지 재귀적으로 모두 변경
#    WinSCP로 파일을 드래그 앤 드롭으로 넣으려면 ubuntu 계정에 쓰기 권한이 있어야 함
sudo chown -R ubuntu:ubuntu /var/www/html
```

`sudo apt install nginx -y`는 Nginx 패키지를 자동 확인(`-y`) 옵션과 함께 설치합니다. `/var/www/html`은 Nginx가 기본적으로 정적 파일을 제공하는 디렉터리입니다. `sudo chown -R ubuntu:ubuntu /var/www/html` 명령은 이 폴더의 소유권을 ubuntu 계정으로 변경합니다. 이 설정이 없으면 WinSCP로 파일을 업로드할 때 권한 오류가 발생합니다.

## 4.2 HTML 파일 업로드 (WinSCP)

WinSCP GUI를 사용하여 로컬 PC의 HTML/CSS/JS 파일을 EC2 서버의 Nginx 폴더로 전송합니다.

### (1) 기본 파일 삭제 및 웹 파일 업로드

WinSCP 오른쪽 창에서 서버의 `/var/www/html` 폴더로 이동하고, 기본 파일을 삭제한 뒤 웹 파일을 업로드합니다.

**① 서버 폴더 이동**

WinSCP 오른쪽 창(AWS 서버) 상단의 경로를 클릭하거나 `[..]` 폴더 아이콘을 클릭하여 최상위 `/`(루트) 경로로 이동합니다. `var → www → html` 순서로 폴더를 더블클릭하여 `/var/www/html` 경로로 이동합니다.

**② 기본 파일 삭제**

`/var/www/html` 폴더 안에 있는 `index.nginx-debian.html` 파일을 우클릭하여 **[삭제]**합니다. 이 파일은 Nginx 설치 시 자동으로 생성되는 기본 환영 페이지 파일입니다.

**③ HTML 파일 업로드**

WinSCP 왼쪽 창(내 PC)에서 배포할 웹 애플리케이션 폴더로 이동합니다. `index.html`, `css` 폴더, `js` 폴더, `images` 폴더 등 웹 서비스에 필요한 모든 파일을 선택하여 오른쪽 창(`/var/www/html`)으로 드래그 앤 드롭합니다. 업로드 확인 창이 뜨면 **[확인]**을 클릭합니다.

파일 업로드가 완료되면 브라우저에서 `http://[탄력적_IP_주소]`로 접속합니다. 업로드한 `index.html` 파일이 시작 페이지로 표시되며, CSS와 JavaScript가 정상적으로 적용된 웹 애플리케이션이 전 세계 어디서든 접속 가능한 상태로 배포됩니다.

## 5.1 Vue.js 프로젝트 빌드

Vue.js 싱글 페이지 애플리케이션(SPA)을 로컬에서 빌드하여 배포용 정적 파일로 만듭니다. 빌드 결과물은 `dist` 폴더에 생성됩니다.

### (1) npm run build 실행

로컬 PC 터미널에서 Vue.js 프로젝트를 빌드합니다.

```bash
# Vue.js 프로젝트 폴더로 이동
cd my-vue-project

# 프로덕션 빌드 실행 (Vite 또는 Webpack이 코드를 최적화·압축)
npm run build
```

빌드가 완료되면 프로젝트 폴더 안에 `dist` 폴더가 생성되며, 구조는 다음과 같습니다.

```text
dist/
├── index.html          # SPA 진입점 HTML
└── assets/             # 번들된 정적 자산 폴더
    ├── index-xxxxxx.js   # 압축·해시된 JavaScript 번들
    └── index-xxxxxx.css  # 압축·해시된 CSS 번들
```

`npm run build` 명령은 Vite 또는 Webpack을 사용하여 개발용 코드를 브라우저가 읽기 좋게 최적화·압축합니다. 빌드가 완료되면 프로젝트 폴더 안에 `dist` 폴더가 생성됩니다. `dist` 폴더 내부의 모든 파일이 서버에 배포될 파일입니다.

## 5.2 EC2 서버에 Nginx 설치 및 파일 업로드

EC2에 Nginx를 설치하고 Vue.js 빌드 파일을 업로드합니다.

### (1) Nginx 설치 및 폴더 권한

EC2 서버 내부에서 다음 명령을 실행합니다. (4.1과 동일한 절차)

```bash
# 패키지 목록 갱신
sudo apt update

# Nginx 웹 서버 설치 (-y: 확인 질문 자동 yes)
sudo apt install nginx -y

# /var/www/html 소유권을 ubuntu 유저에게 부여 (-R: 하위 항목까지 재귀 적용)
# WinSCP 업로드 시 권한 오류를 방지하기 위함
sudo chown -R ubuntu:ubuntu /var/www/html
```

### (2) 빌드 파일 업로드 (WinSCP)

빌드된 `dist` 폴더 내부의 파일을 서버로 전송합니다.

WinSCP 오른쪽 창에서 `/var/www/html`로 이동하여 기존 `index.nginx-debian.html` 파일을 삭제합니다. 왼쪽 창에서 Vue.js 프로젝트의 `dist` 폴더 안으로 들어갑니다.

> **주의:** `dist` 폴더 자체가 아닌 `dist` 폴더 **내부의** `index.html`과 `assets` 폴더를 선택해야 합니다.

선택한 파일을 오른쪽 창(`/var/www/html`)으로 드래그 앤 드롭합니다.

## 5.3 Nginx Vue Router 설정 (404 에러 방지)

Vue Router의 history 모드를 지원하도록 Nginx 설정을 수정합니다. 이 설정이 없으면 Vue Router 경로에서 새로고침 시 404 에러가 발생합니다.

### (1) Nginx 설정 파일 수정

nano 편집기로 Nginx 기본 설정 파일을 엽니다. (EC2 서버 내부에서 실행)

```bash
# Nginx 기본 사이트 설정 파일을 nano 편집기로 열기
sudo nano /etc/nginx/sites-available/default
```

편집기가 열리면 `location / { ... }` 블록을 찾아 아래와 같이 수정합니다.

**수정 전** — `/etc/nginx/sites-available/default`

```nginx
location / {
    # 요청한 파일($uri) 또는 디렉터리($uri/)를 찾고, 없으면 404 에러 반환
    # → SPA 라우트 새로고침 시 실제 파일이 없어 404가 발생함
    try_files $uri $uri/ =404;
}
```

**수정 후** — `/etc/nginx/sites-available/default`

```nginx
location / {
    # 요청한 파일이나 디렉터리가 없으면 404 대신 /index.html을 반환
    # → 모든 경로 처리를 Vue Router(JavaScript)에 위임하여 새로고침 404 방지
    try_files $uri $uri/ /index.html;
}
```

설정 파일을 저장하고 Nginx에 적용합니다.

```bash
# 저장: Ctrl + O → Enter
# 종료: Ctrl + X

# Nginx를 재시작하여 변경된 설정을 적용
sudo systemctl restart nginx
```

`try_files $uri $uri/ /index.html` 설정은 요청된 URL에 해당하는 파일이 없을 때 `/index.html`을 대신 반환합니다. Vue Router가 `/about`, `/products` 등의 경로를 처리하는 것은 모두 `index.html` 내부의 JavaScript에서 이루어지므로, 서버가 항상 `index.html`을 반환해야 합니다. 설정 후 F5(새로고침)를 눌러도 404 에러 없이 페이지가 정상 유지되면 배포 성공입니다.

## 6.1 Spring Boot 프로젝트 빌드

Spring Boot 3(Java 21 Zulu OpenJDK)로 개발된 백엔드 애플리케이션을 빌드합니다. Spring Boot는 내장 Tomcat을 포함하므로 `.jar` 파일 하나만 실행하면 됩니다. 이 절에서는 로컬 PC에서 배포 가능한 `.jar` 파일로 빌드합니다.

### (1) Gradle 빌드

로컬 PC 터미널에서 Gradle을 사용하여 Spring Boot 프로젝트를 빌드합니다.

```bash
# Spring Boot 프로젝트 폴더로 이동
cd my-spring-project

# Gradle 빌드 (-x test: 단위 테스트 실행을 건너뛰어 빌드 시간 단축)
# clean: 이전 빌드 결과물 삭제 / build: 컴파일 + 패키징(.jar 생성)
# macOS / Linux 에서는 프로젝트에 포함된 gradlew 래퍼 스크립트 사용
./gradlew clean build -x test

# Windows 에서는 (앞에 ./ 없이) gradlew 실행
gradlew clean build -x test
```

빌드가 성공하면 다음과 같은 출력이 표시됩니다.

```text
BUILD SUCCESSFUL in 45s
5 actionable tasks: 5 executed
```

빌드 결과물은 `build/libs/` 폴더에 생성되며, `plain`이 붙지 않은 파일이 배포용입니다.

```text
build/libs/
├── myproject-0.0.1-SNAPSHOT.jar        ← 배포용 (내장 Tomcat 포함, 실행 가능)
└── myproject-0.0.1-SNAPSHOT-plain.jar  ← 제외 (라이브러리용, 실행 불가)
```

`./gradlew clean build -x test` 명령에서 `clean`은 이전 빌드 결과물을 삭제하고, `build`는 컴파일과 패키징을 수행합니다. `-x test` 옵션은 단위 테스트 실행을 건너뛰어 빌드 시간을 줄입니다. 빌드 완료 후 `build/libs/` 폴더에 `.jar` 파일이 생성됩니다. `plain`이 붙지 않은 파일이 내장 Tomcat을 포함하는 실행 가능한 배포용 파일입니다.

## 6.2 EC2에 Java 21(Zulu OpenJDK) 설치

EC2 서버에 Azul Zulu OpenJDK 21을 설치합니다. Spring Boot 3는 Java 17 이상을 필요로 하며, 이 책에서는 Azul Zulu의 Java 21 버전을 사용합니다.

### (1) Zulu OpenJDK 21 설치

Azul Systems의 공식 저장소를 등록하고 Zulu JDK 21을 설치합니다. (EC2 서버 내부에서 실행)

```bash
# 1. 필수 패키지 설치
#    apt update: 패키지 목록 갱신 / apt upgrade -y: 설치된 패키지 최신화
sudo apt update && sudo apt upgrade -y
#    gnupg: GPG 키 처리 / ca-certificates: HTTPS 인증서 / curl: 파일 다운로드 도구
sudo apt install -y gnupg ca-certificates curl

# 2. Azul 공식 GPG 키 추가 (저장소 패키지의 서명을 검증하기 위한 키)
#    curl -s: 조용히 다운로드 / gpg --dearmor: 바이너리 키 형식으로 변환하여 저장
curl -s https://repos.azul.com/azul-repo.key \
  | sudo gpg --dearmor -o /usr/share/keyrings/azul.gpg

# 3. Azul Zulu APT 저장소 등록
#    signed-by: 위에서 등록한 GPG 키로 서명 검증
#    tee로 zulu.list 파일에 저장소 주소를 기록 (> /dev/null: 화면 출력 생략)
echo "deb [signed-by=/usr/share/keyrings/azul.gpg] \
  https://repos.azul.com/zulu/apt stable main" \
  | sudo tee /etc/apt/sources.list.d/zulu.list > /dev/null

# 4. Zulu OpenJDK 21 설치
#    새로 등록한 저장소를 인식하도록 목록 갱신 후 설치
sudo apt update
sudo apt install -y zulu21-jdk

# 5. 설치 확인 (21 버전이 표시되면 성공)
java -version
```

설치가 정상적으로 완료되면 다음과 같은 결과가 표시됩니다.

```text
openjdk version "21.x.x" 2024-xx-xx LTS
OpenJDK Runtime Environment Zulu21.xx+xx-CA (build 21.x.x+xx-LTS)
OpenJDK 64-Bit Server VM Zulu21.xx+xx-CA (build 21.x.x+xx-LTS, mixed mode, sharing)
```

## 6.3 .jar 파일 업로드 및 실행

빌드된 `.jar` 파일을 WinSCP로 EC2에 업로드하고 백그라운드에서 실행합니다.

### (1) WinSCP로 .jar 파일 업로드

WinSCP를 사용하여 빌드된 `.jar` 파일을 EC2의 `/home/ubuntu` 경로로 전송합니다.

WinSCP 왼쪽 창(내 PC)에서 Spring Boot 프로젝트의 `build/libs/` 폴더로 이동합니다. `myproject-0.0.1-SNAPSHOT.jar` 파일을 오른쪽 창(EC2 서버, `/home/ubuntu`)으로 드래그 앤 드롭합니다.

### (2) 백그라운드 무중단 실행

`nohup` 명령으로 `.jar` 파일을 터미널 종료 후에도 계속 실행되도록 백그라운드에서 시작합니다. (EC2 서버 내부에서 실행)

```bash
# 1. 파일 업로드 확인 (현재 폴더의 모든 파일을 상세 표시)
ls -la

# 2. 백그라운드 무중단 실행 (파일명은 본인의 jar 파일명으로 변경)
#    nohup: 터미널 연결이 끊겨도 프로세스 유지 / 끝의 &: 백그라운드 실행
nohup java -jar myproject-0.0.1-SNAPSHOT.jar &

# 3. 서버 시작 로그 실시간 확인 (nohup.out 파일에 로그가 쌓임)
#    tail -f: 파일 끝부분을 실시간으로 따라가며 출력
tail -f nohup.out
```

시작에 성공하면 Spring Boot 배너와 함께 다음과 같은 로그가 출력됩니다.

```text
    .   ____          _            __ _ _
   /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
   ...
Started MyProjectApplication in 3.456 seconds (process running for 4.123)
```

```bash
# 로그 확인 종료: Ctrl + C (서버 프로세스는 계속 백그라운드에서 실행됨)
```

`nohup`(No Hang UP)은 터미널 연결이 끊겨도 프로세스를 계속 실행하도록 합니다. 마지막의 `&` 기호는 프로세스를 백그라운드에서 실행합니다. 실행 로그는 `nohup.out` 파일에 저장됩니다. `tail -f nohup.out` 명령으로 로그를 실시간 확인할 수 있으며, `Ctrl + C`로 로그 확인을 종료합니다(서버는 계속 실행됨).

## 6.4 Nginx 리버스 프록시 설정 (80 → 8080)

Spring Boot의 기본 포트(8080)로 들어오는 요청을 웹 표준 포트(80)에서 받아 전달하는 Nginx 리버스 프록시를 설정합니다. 이렇게 하면 사용자가 포트 번호 없이 표준 주소로 접속할 수 있습니다.

### (1) Nginx 설치 및 설정

EC2 서버 내부에서 Nginx를 설치하고 설정 파일을 엽니다.

```bash
# Nginx 웹 서버 설치 (이미 설치되어 있으면 그대로 유지됨)
sudo apt install nginx -y

# 기본 사이트 설정 파일을 nano 편집기로 열기
sudo nano /etc/nginx/sites-available/default
```

`location / { ... }` 블록을 아래와 같이 수정합니다.

**수정 후** — `/etc/nginx/sites-available/default`

```nginx
location / {
    # 80번 포트로 들어온 요청을 서버 내부 8080번(Spring Boot)으로 전달
    proxy_pass http://localhost:8080;

    # 실제 클라이언트의 IP 주소를 백엔드에 전달
    proxy_set_header X-Real-IP $remote_addr;

    # 프록시를 거친 원본 클라이언트 IP 체인을 백엔드에 전달
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    # 클라이언트가 요청한 원본 Host 헤더를 백엔드에 전달
    proxy_set_header Host $http_host;
}
```

설정을 저장하고 Nginx를 재시작합니다.

```bash
# 저장: Ctrl + O → Enter → Ctrl + X

# 변경된 설정을 적용하기 위해 Nginx 재시작
sudo systemctl restart nginx
```

`proxy_pass http://localhost:8080`은 80번 포트로 들어온 요청을 서버 내부의 8080번 포트(Spring Boot)로 전달합니다. `proxy_set_header` 설정들은 실제 클라이언트의 IP 주소와 호스트 정보를 백엔드 서버에 전달합니다. 설정 완료 후 브라우저에서 `http://[탄력적_IP_주소]`(포트 번호 없이)로 접속하면 Spring Boot 애플리케이션이 응답합니다.
