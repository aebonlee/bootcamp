# AWS EC2 · Docker · WinSCP 배포

이 장에서는 Amazon Web Services(AWS) EC2 인스턴스를 생성하고, 고정 IP(탄력적 IP)를 할당하며, SSH를 통해 원격 접속한 뒤 Docker 환경을 구축하는 기본 설정을 실습합니다. 이어서 Windows 환경에서 GUI 기반 SFTP 클라이언트인 WinSCP를 사용하여 같은 EC2 서버에 접속하고, DockerHub 이미지를 활용해 풀스택 서비스를 배포하는 방법까지 다룹니다. 이 장의 내용은 이후 모든 AWS 배포의 공통 기반이 됩니다.

## 2.1 EC2 인스턴스 생성

AWS 콘솔에서 Ubuntu 기반 EC2 인스턴스를 생성합니다.

### (1) 인스턴스 시작 설정

**① AWS 콘솔 접속 및 EC2 이동**

AWS Management Console(<https://console.aws.amazon.com>)에 로그인합니다. 우측 상단 리전이 **'서울(ap-northeast-2)'** 인지 확인합니다. 상단 검색창에 `EC2`를 입력하고 클릭하여 EC2 대시보드로 이동합니다. **[인스턴스 시작(Launch instance)]** 주황색 버튼을 클릭합니다.

다음 표를 참고하여 인스턴스 생성에 필요한 각 항목을 설정합니다.

| 설정 항목 | 권장 값 |
| --- | --- |
| 이름 | `my-fullstack-app` (프로젝트 식별명) |
| OS(AMI) | Ubuntu Server 22.04 LTS 또는 24.04 LTS (프리 티어 사용 가능) |
| 인스턴스 유형 | `t2.micro` (프리 티어 무료) 또는 `t3.small` (AI 서비스) |
| 키 페어 | [새 키 페어 생성] → RSA → `.pem` 형식 → 안전한 곳에 보관 필수 |
| 보안 그룹 | SSH(22), HTTP(80), HTTPS(443) 허용 체크 |

> 키 페어로 생성한 `.pem` 파일은 서버 접속에 반드시 필요하며, 분실 시 재발급이 불가능하므로 안전한 위치에 보관해야 합니다. 보안 그룹에서 22번(SSH), 80번(HTTP), 443번(HTTPS) 포트를 열어야 원격 접속과 웹 서비스 노출이 가능합니다.

## 2.2 고정 IP(탄력적 IP) 할당

EC2 인스턴스에 고정 IP를 부여합니다. 기본 EC2는 재시작할 때마다 공인 IP가 바뀌므로, 안정적인 웹 서비스 운영을 위해 탄력적 IP(Elastic IP)를 할당해야 합니다.

### (1) 탄력적 IP 발급 및 연결

**① 할당 및 연결 절차**

1. EC2 대시보드 왼쪽 메뉴에서 **[네트워크 및 보안] → [탄력적 IP(Elastic IPs)]** 를 클릭합니다.
2. **[탄력적 IP 주소 할당]** 버튼을 클릭한 후 하단 **[할당]** 을 누릅니다.
3. 생성된 IP 주소를 선택하고 **[작업] → [탄력적 IP 주소 연결]** 을 클릭합니다.
4. 인스턴스 입력란에서 앞서 생성한 EC2 인스턴스를 선택하고, 프라이빗 IP를 선택한 뒤 **[연결]** 을 누릅니다.
5. 화면에 표시된 탄력적 IP 주소를 별도로 메모합니다. (이후 SSH 접속·브라우저 접속에 사용)

## 2.3 SSH를 통한 EC2 서버 접속

다운로드한 키 페어(`.pem`)를 사용하여 EC2 서버에 원격으로 접속합니다.

### (1) macOS / Linux에서 접속

macOS와 Linux 터미널에서 SSH로 EC2에 접속합니다.

```bash
# .pem 파일 권한 설정 (최초 1회만 수행, 이 설정 없으면 SSH가 접속을 거부함)
# 400 = 소유자에게만 읽기 권한 부여, 그룹/기타 사용자 권한은 모두 제거
chmod 400 my-app-key.pem

# EC2 서버 SSH 접속
#   -i : 접속에 사용할 개인 키(.pem) 파일 지정
#   ubuntu : Ubuntu AMI의 기본 관리자 계정 이름
#   [탄력적_IP_주소] : 2.2에서 메모한 실제 탄력적 IP로 변경
ssh -i "my-app-key.pem" ubuntu@[탄력적_IP_주소]

# 최초 접속 시 서버 지문(fingerprint) 신뢰 여부를 묻는 메시지가 표시됨 → yes 입력
Are you sure you want to continue connecting (yes/no)? yes

# 접속 성공 시 아래와 같은 형태의 프롬프트가 표시됨 (xx는 실제 IP 일부)
ubuntu@ip-172-xx-xx-xx:~$
```

`chmod 400`은 키 파일을 소유자만 읽을 수 있도록 권한을 제한합니다. 이 설정이 없으면 SSH가 보안상의 이유로 접속을 거부합니다. `ubuntu@[IP]`에서 `ubuntu`는 Ubuntu AMI의 기본 관리자 계정 이름입니다. 접속에 성공하면 `ubuntu@ip-xxx...` 형태의 프롬프트가 표시됩니다.

### (2) Windows에서 접속

Windows PowerShell 또는 CMD에서 SSH로 EC2에 접속합니다.

```bash
# Windows 10 이상은 OpenSSH가 기본 내장되어 별도 도구 없이 ssh 사용 가능
#   -i : 개인 키(.pem) 파일 경로 지정
#   ubuntu@[탄력적_IP_주소] : 기본 계정 ubuntu + 실제 탄력적 IP
ssh -i "my-app-key.pem" ubuntu@[탄력적_IP_주소]
```

## 2.4 Docker 엔진 설치

EC2 서버에 Docker Engine과 Docker Compose 플러그인을 설치합니다. Docker를 설치하면 별도로 Java, Python, Nginx 등을 서버에 직접 설치할 필요 없이 컨테이너로 모든 환경을 구성할 수 있습니다.

### (1) Docker 설치 명령어

Ubuntu에 Docker 공식 저장소를 등록하고 Docker Engine을 설치합니다. EC2에 SSH 접속한 상태에서 아래 명령어를 순서대로 실행합니다.

```bash
# 1. 시스템 패키지 목록 갱신 및 설치된 패키지 업그레이드
#    && : 앞 명령이 성공하면 뒤 명령 실행, -y : 모든 확인 질문에 자동 yes
sudo apt update && sudo apt upgrade -y

# 2. Docker 설치에 필요한 보안·네트워크 도구 설치
#    apt-transport-https : HTTPS 저장소 접근, ca-certificates : 인증서
#    curl : 파일 다운로드, software-properties-common : 저장소 관리 도구
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# 3. Docker 공식 GPG 서명 키 추가 (패키지 위변조 검증용)
#    curl -fsSL : 조용히(silent) 다운로드, 리다이렉트 추적, 오류 시 실패
#    gpg --dearmor : 키를 바이너리 형식으로 변환하여 keyrings 경로에 저장
curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
  | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 4. Docker 공식 저장소 주소를 시스템 apt 소스 목록에 등록
#    arch : 시스템 CPU 아키텍처 자동 감지(dpkg --print-architecture)
#    signed-by : 3단계에서 등록한 GPG 키로 서명 검증
#    lsb_release -cs : 현재 Ubuntu 코드명 자동 감지(예: jammy, noble)
echo "deb [arch=$(dpkg --print-architecture) \
  signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 5. 갱신된 저장소에서 Docker 엔진·CLI·containerd·Compose 플러그인 설치
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# 6. 현재 로그인 중인 ubuntu 계정을 docker 그룹에 추가
#    이렇게 하면 매번 sudo 없이 docker 명령을 실행할 수 있음
#    (적용하려면 접속 종료 후 재접속 필요)
sudo usermod -aG docker $USER
```

각 단계 설명:

- **1단계** — 시스템 패키지 목록을 최신 상태로 갱신하고 업그레이드합니다.
- **2단계** — Docker 설치에 필요한 보안·네트워크 도구를 설치합니다.
- **3단계** — Docker 공식 GPG 서명 키를 추가합니다.
- **4단계** — Docker 공식 저장소 주소를 시스템에 등록합니다.
- **5단계** — Docker Engine, CLI, containerd, Docker Compose 플러그인을 설치합니다.
- **6단계** — 현재 로그인 중인 ubuntu 계정을 docker 그룹에 추가합니다. 이 설정을 적용하려면 서버 접속을 종료(`exit`)하고 다시 접속해야 합니다.

**① Docker 설치 확인**

접속을 종료(`exit`)하고 다시 SSH 접속한 후 아래 명령으로 Docker가 정상 설치되었는지 확인합니다.

```bash
# 재접속 후 Docker 엔진 버전 확인
docker --version
# Docker Compose 플러그인 버전 확인
docker compose version

# 실행 결과 예시 (버전 번호는 환경에 따라 다를 수 있음)
Docker version 27.x.x, build xxxxxxx
Docker Compose version v2.x.x

# 현재 실행 중인 컨테이너 목록 확인 (설치 직후라 비어 있음)
docker ps

# 결과 (헤더만 출력되고 내용이 없는 빈 테이블 = 정상)
CONTAINER ID   IMAGE   COMMAND   CREATED   STATUS   PORTS   NAMES
```

## 2.5 docker-compose.yml 작성 및 서비스 실행

DockerHub에 올려둔 이미지를 사용하여 전체 서비스를 한 번에 실행하는 `docker-compose.yml`을 작성하고 실행합니다.

### (1) docker-compose.yml 파일 생성

EC2 서버에서 직접 `docker-compose.yml` 파일을 작성합니다.

```bash
# nano 텍스트 에디터로 docker-compose.yml 파일 새로 생성/편집
nano docker-compose.yml
```

아래 내용을 작성합니다. (`~/docker-compose.yml`, EC2 서버 내부)

```yaml
# Docker Compose 파일 형식 버전
version: '3.8'

# 실행할 서비스(컨테이너)들을 정의하는 영역
services:
  # 1) 데이터베이스 서비스
  db:
    image: postgres:15            # PostgreSQL 15 공식 이미지 사용
    environment:                  # 컨테이너 환경 변수(초기 DB 설정)
      POSTGRES_USER: myuser       # DB 접속 사용자명
      POSTGRES_PASSWORD: mypassword  # DB 접속 비밀번호
      POSTGRES_DB: mydb           # 생성할 기본 데이터베이스 이름
    volumes:
      # 명명 볼륨 pgdata를 DB 데이터 경로에 마운트
      # → 컨테이너를 재시작/삭제해도 데이터가 유지됨
      - pgdata:/var/lib/postgresql/data
    restart: always               # 컨테이너 종료 시 항상 자동 재시작

  # 2) 백엔드(API 서버) 서비스
  backend:
    image: your_docker_id/my-backend:v1  # DockerHub에서 가져올 백엔드 이미지
    environment:
      # DB 접속 URL: 서비스명 db가 컨테이너 내부 DNS로 해석됨
      DATABASE_URL: postgresql://myuser:mypassword@db:5432/mydb
    depends_on:
      - db                        # db 서비스가 먼저 시작된 후 backend 기동
    restart: always

  # 3) 프론트엔드(웹) 서비스
  frontend:
    image: your_docker_id/my-frontend:v1  # DockerHub에서 가져올 프론트 이미지
    ports:
      - "80:80"                   # 호스트 80번 포트 → 컨테이너 80번 포트 노출
    depends_on:
      - backend                   # backend 시작 후 frontend 기동
    restart: always

# 명명 볼륨 선언 (데이터 영속화에 사용)
volumes:
  pgdata:
```

저장 및 종료:

```text
# 저장: Ctrl + O → Enter
# 종료: Ctrl + X
```

`your_docker_id` 부분을 본인의 실제 DockerHub 계정 ID로 변경합니다. `services` 아래 각 항목이 하나의 컨테이너입니다. `db` 서비스는 PostgreSQL 공식 이미지를 사용하며, `volumes`를 통해 데이터를 컨테이너 재시작 후에도 유지합니다. `backend`는 DockerHub에서 이미지를 가져오며, `depends_on: db`를 통해 DB가 먼저 시작된 후 백엔드가 기동됩니다. `frontend`는 80번 포트를 외부에 노출합니다.

### (2) 서비스 실행 및 확인

`docker compose` 명령으로 전체 서비스를 백그라운드에서 실행하고 상태를 확인합니다.

```bash
# 백그라운드(-d, detached mode)에서 모든 컨테이너 실행
# 이미지가 로컬에 없으면 DockerHub에서 자동으로 내려받음
docker compose up -d

# 실행 중인 서비스 상태 확인
docker compose ps

# 결과 예시 (모든 서비스가 Up 또는 running 상태여야 정상)
NAME       IMAGE                    STATUS
db         postgres:15              Up 30 seconds
backend    your_id/my-backend:v1    Up 25 seconds
frontend   your_id/my-frontend:v1   Up 20 seconds
```

`docker compose up -d` 명령은 `docker-compose.yml`에 정의된 모든 서비스를 백그라운드(`-d`, detached mode)에서 실행합니다. 이미지가 로컬에 없으면 DockerHub에서 자동으로 내려받습니다. `docker compose ps`로 모든 컨테이너 상태가 `Up` 또는 `running`인지 확인합니다. 이후 브라우저에서 `http://[탄력적_IP_주소]`로 접속하면 배포된 웹 서비스를 확인할 수 있습니다.

## 3.1 WinSCP 설치 및 EC2 접속

이 절부터는 Windows 환경에서 GUI 기반 SFTP 클라이언트인 WinSCP를 사용합니다. 명령줄 인터페이스(CLI)에 익숙하지 않은 분도 마우스 드래그 앤 드롭으로 파일을 전송하고, WinSCP 내장 터미널로 명령어를 실행할 수 있습니다. 먼저 WinSCP를 설치하고 AWS EC2 서버에 SFTP로 접속합니다.

### (1) WinSCP 설치

WinSCP는 <https://winscp.net> 에서 무료로 다운로드할 수 있습니다. 다운로드하여 설치합니다.

**① 접속 설정**

WinSCP를 설치하고 실행하면 로그인 창이 나타납니다. 다음 표를 참고하여 접속 정보를 입력합니다.

| 항목 | 값 |
| --- | --- |
| 파일 프로토콜 | SFTP |
| 호스트 이름 | AWS 탄력적 IP 주소 (예: `54.180.xx.xx`) |
| 포트 번호 | 22 |
| 사용자 이름 | ubuntu |
| 비밀번호 | 비워둠 (키 파일 사용) |

### (2) .pem 키 파일 등록

EC2 접속에 필요한 `.pem` 키 파일을 WinSCP에 등록합니다.

**① 키 파일 등록 방법**

1. 로그인 창 하단의 **[고급(Advanced...)]** 버튼을 클릭합니다.
2. 왼쪽 메뉴에서 **[SSH] → [인증(Authentication)]** 을 클릭합니다.
3. **'개인 키 파일(Private key file)'** 우측의 **[...]** 버튼을 누릅니다.
4. 파일 선택 창에서 파일 형식을 **'모든 파일(\*.\*)'** 로 변경한 뒤 다운로드한 `.pem` 파일을 선택합니다.
5. **'PuTTY 형식(.ppk)으로 변환하시겠습니까?'** 안내창이 뜨면 **[확인]** 을 누르고 저장합니다.
6. **[확인]** 으로 고급 창을 닫고, **[저장]** 으로 세션을 저장한 뒤 **[로그인]** 을 클릭합니다.

접속에 성공하면 왼쪽 창에는 내 PC의 파일 시스템이, 오른쪽 창에는 AWS EC2 서버의 파일 시스템이 표시됩니다. 이제 파일을 마우스로 드래그 앤 드롭하여 서버로 전송할 수 있습니다.

## 3.2 WinSCP 터미널로 Docker 설치

WinSCP 내장 터미널(또는 PuTTY)을 사용하여 EC2 서버에 Docker를 설치합니다.

### (1) 터미널 열기

WinSCP 상단 툴바에서 **[터미널 열기]** 아이콘(검은색 화면 모양)을 클릭하거나, 단축키 **Ctrl+T** 를 누릅니다. 또는 **[PuTTY에서 열기]**(단축키 **Ctrl+P**)를 눌러 PuTTY 터미널을 사용할 수도 있습니다. 터미널 창이 열리면 EC2 서버에서 명령어를 직접 입력할 수 있습니다.

### (2) Docker 설치 명령 실행

아래 명령어를 복사하여 WinSCP 터미널 창에 붙여넣고 엔터를 누릅니다. (2.4의 Docker 설치 과정과 동일합니다.)

```bash
# 1. 시스템 패키지 목록 갱신 및 업그레이드
sudo apt update && sudo apt upgrade -y

# 2. Docker 설치에 필요한 보안·네트워크 도구 설치
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# 3. Docker 공식 GPG 서명 키 추가
curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
  | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 4. Docker 공식 저장소를 apt 소스 목록에 등록
echo "deb [arch=$(dpkg --print-architecture) \
  signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 5. Docker 엔진·CLI·containerd·Compose 플러그인 설치
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# 6. ubuntu 계정을 docker 그룹에 추가 (sudo 없이 docker 사용)
sudo usermod -aG docker $USER
```

설치 완료 후 반드시 **WinSCP 프로그램을 완전히 종료(X 버튼)** 하고 다시 열어서 재접속합니다. 이렇게 해야 docker 그룹 권한이 새 세션에 적용됩니다. 재접속 후 터미널에서 `docker ps` 명령을 실행하여 오류 없이 빈 테이블이 출력되면 Docker 설치가 완료된 것입니다.

## 3.3 docker-compose.yml 파일 전송 및 배포

로컬 PC에서 작성한 `docker-compose.yml` 파일을 WinSCP로 EC2 서버에 전송하고 서비스를 실행합니다.

### (1) docker-compose.yml 작성 (로컬 PC)

배포에 사용할 `docker-compose.yml` 파일을 로컬 PC에서 작성합니다.

```yaml
# Docker Compose 파일 형식 버전
version: '3.8'

services:
  # 1) PostgreSQL 데이터베이스
  db:
    image: postgres:15            # PostgreSQL 15 공식 이미지
    environment:
      POSTGRES_USER: myuser       # DB 사용자명
      POSTGRES_PASSWORD: mypassword  # DB 비밀번호
      POSTGRES_DB: mydb           # 기본 데이터베이스 이름
    volumes:
      - pgdata:/var/lib/postgresql/data  # 데이터 영속화용 명명 볼륨
    restart: always               # 항상 자동 재시작

  # 2) 백엔드 API 서버
  backend:
    image: your_docker_id/my-backend:v1   # DockerHub 백엔드 이미지
    environment:
      DATABASE_URL: postgresql://myuser:mypassword@db:5432/mydb  # DB 연결 URL
    depends_on:
      - db                        # db가 먼저 기동된 후 실행
    restart: always

  # 3) 프론트엔드 웹 서버
  frontend:
    image: your_docker_id/my-frontend:v1  # DockerHub 프론트엔드 이미지
    ports:
      - "80:80"                   # 호스트 80 → 컨테이너 80 포트 매핑
    depends_on:
      - backend                   # backend가 먼저 기동된 후 실행
    restart: always

# 명명 볼륨 선언
volumes:
  pgdata:
```

### (2) WinSCP로 파일 전송

WinSCP GUI를 사용하여 `docker-compose.yml` 파일을 EC2 서버로 전송합니다.

**① 파일 드래그 앤 드롭**

1. WinSCP 왼쪽 창(내 PC)에서 작성한 `docker-compose.yml` 파일이 있는 폴더로 이동합니다.
2. 오른쪽 창(AWS EC2 서버)의 경로가 `/home/ubuntu`인지 확인합니다.
3. 왼쪽 창의 `docker-compose.yml` 파일을 마우스로 클릭하여 오른쪽 창으로 드래그 앤 드롭합니다.
4. 업로드 확인 창이 뜨면 **[확인]** 을 클릭합니다.

### (3) 서비스 실행

WinSCP 터미널에서 `docker compose` 명령으로 서비스를 실행합니다.

```bash
# 파일이 정상 전송되었는지 확인 (docker-compose.yml이 목록에 보여야 함)
#   -l : 상세 목록, -a : 숨김 파일 포함
ls -la

# 모든 서비스를 백그라운드(-d)로 실행
docker compose up -d

# 실행 상태 확인
docker compose ps

# 결과 (모든 컨테이너가 Up 상태여야 정상)
NAME       IMAGE                    STATUS
db         postgres:15              Up 30 seconds
backend    your_id/my-backend:v1    Up 25 seconds
frontend   your_id/my-frontend:v1   Up 20 seconds
```

`docker compose up -d` 실행 시 DockerHub에서 이미지를 자동으로 내려받습니다. 모든 컨테이너의 Status가 `Up`이면 배포가 완료된 것입니다. 브라우저에서 `http://[탄력적_IP_주소]`로 접속하여 서비스를 확인합니다.
