# AI 챗봇 — FastAPI + Gradio 허깅페이스 배포

이 장에서는 Hugging Face의 고성능 한국어 오픈소스 모델을 활용하여 FastAPI(백엔드)와 Gradio(프론트엔드 UI)를 결합한 AI 챗봇을 로컬에서 구동하고, 허깅페이스 스페이스(Spaces)에 배포하는 전 과정을 실습합니다. Qwen2.5-1.5B-Instruct 모델을 4-bit 양자화 기술로 경량화하여 일반 PC(VRAM 16GB 이상)에서도 실행할 수 있도록 구성합니다.

## 1.1 개발 환경 구성

이 절에서는 AI 챗봇 프로젝트를 위한 Python 가상 환경을 생성하고, 웹 서버(FastAPI, Uvicorn), UI(Gradio), AI 구동을 위한 PyTorch 및 Hugging Face 패키지를 설치합니다.

### (1) 프로젝트 폴더 및 가상 환경 생성

이 소절에서는 프로젝트 폴더를 만들고 Python 가상 환경을 생성하여 의존성을 격리합니다.

#### ① 폴더 생성 및 가상 환경 활성화

터미널(명령 프롬프트)을 열고 아래 명령어를 순서대로 입력합니다.

```bash
# 프로젝트 폴더 생성 및 이동
mkdir ai-chatbot && cd ai-chatbot   # ai-chatbot 폴더를 만들고(&&로 연결) 곧바로 그 폴더로 이동


# Python 가상 환경 생성 (Windows)
python -m venv venv                 # 현재 폴더 안에 venv 라는 이름의 가상 환경 폴더 생성
venv\Scripts\activate               # Windows에서 가상 환경 활성화 (배치 스크립트 실행)


# Python 가상 환경 생성 및 활성화 (macOS / Linux)
python3 -m venv venv                # macOS/Linux는 python3 명령으로 가상 환경 생성
source venv/bin/activate            # source 명령으로 활성화 스크립트를 현재 셸에 적용
```

`mkdir` 명령은 폴더를 생성하고, `cd` 명령은 해당 폴더로 이동합니다. `python -m venv venv` 명령은 현재 폴더 안에 `venv`라는 이름의 가상 환경 폴더를 생성합니다. 가상 환경을 활성화하면 프롬프트 앞에 `(venv)` 표시가 나타나며, 이후 설치되는 패키지는 가상 환경 내부에만 적용됩니다.

### (2) 필수 라이브러리 설치

이 소절에서는 웹 서버, UI, AI 구동에 필요한 Python 패키지를 모두 설치합니다.

#### ① 패키지 설치 명령

```bash
# 웹 서버 및 UI 패키지
pip install fastapi uvicorn gradio   # fastapi(웹 프레임워크) + uvicorn(ASGI 서버) + gradio(웹 UI) 설치


# PyTorch (CUDA 12.1 기반 GPU 가속 버전)
# --index-url 옵션으로 CUDA 12.1용 전용 휠(wheel) 저장소를 지정해 GPU 가속 빌드를 설치
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121


# Hugging Face 및 양자화 관련 패키지
# transformers(모델 로딩) + accelerate(디바이스 분배) + bitsandbytes(4-bit 양자화)
pip install transformers accelerate bitsandbytes
```

`fastapi`는 고성능 Python 웹 프레임워크이며, `uvicorn`은 FastAPI를 실행하는 ASGI 서버입니다. `gradio`는 머신러닝 모델의 웹 UI를 빠르게 만들 수 있는 라이브러리입니다. `torch`(PyTorch)는 딥러닝 연산 라이브러리로 GPU 가속을 지원합니다. `transformers`는 Hugging Face의 사전 학습된 AI 모델을 불러오고 사용하는 핵심 라이브러리입니다. `bitsandbytes`는 모델을 4-bit로 양자화하여 메모리 사용량을 크게 줄여주는 라이브러리입니다.

## 1.2 main.py 소스 코드 작성

이 절에서는 FastAPI 위에 Gradio를 마운트하여 하나의 포트(8000)에서 API 서버와 챗봇 화면이 동시에 구동되는 애플리케이션을 작성합니다.

### (1) 전체 소스 코드

이 소절에서는 AI 모델 로딩, 추론 함수, Gradio UI, FastAPI 통합을 모두 포함하는 `main.py` 파일을 작성합니다.

```python
# ai-chatbot/main.py
import uvicorn                       # ASGI 서버 실행용 모듈
from fastapi import FastAPI          # FastAPI 웹 프레임워크 클래스
import gradio as gr                  # Gradio UI 라이브러리 (gr 별칭)
import torch                         # PyTorch (텐서 연산 및 dtype 지정)
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
# AutoTokenizer: 텍스트를 토큰으로 변환 / AutoModelForCausalLM: 생성형 LM 로드 / BitsAndBytesConfig: 양자화 설정


# ==========================================
# 1. FastAPI 애플리케이션 초기화
# ==========================================
app = FastAPI()                      # FastAPI 인스턴스 생성 (모든 라우팅의 기준 객체)


# ==========================================
# 2. AI 모델 설정 (Qwen2.5-7B-Instruct)
# ==========================================
MODEL_ID = "Qwen/Qwen2.5-7B-Instruct"   # Hugging Face Hub에서 내려받을 모델 경로


# 일반 PC(VRAM 8GB 수준)에서 구동하기 위한 4-bit 양자화 설정
bnb_config = BitsAndBytesConfig(
  load_in_4bit=True,                 # 모델 가중치를 4-bit로 로드 (메모리 대폭 절감) — 핵심 옵션
  bnb_4bit_use_double_quant=True,    # 이중 양자화로 메모리를 한 번 더 절약
  bnb_4bit_quant_type="nf4",         # NF4(Normal Float 4) 방식 — 4-bit 중 성능이 가장 우수
  bnb_4bit_compute_dtype=torch.bfloat16  # 실제 연산은 bfloat16으로 수행 (정확도/속도 균형)
)


print("모델을 다운로드하고 불러오는 중입니다... (최초 1회 시간이 걸립니다)")


# 토크나이저 및 모델 로드
tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)   # 모델에 맞는 토크나이저 자동 로드
model = AutoModelForCausalLM.from_pretrained(
   MODEL_ID,                         # 로드할 모델 경로
   quantization_config=bnb_config,   # 위에서 정의한 4-bit 양자화 설정 적용
   device_map="auto"                 # 사용 가능한 GPU에 모델 레이어를 자동 분배
)


# ==========================================
# 3. 챗봇 추론 함수 구현
# ==========================================
def generate_response(message, history):   # message: 현재 입력, history: 이전 대화 기록
   messages = []                            # 모델에 전달할 대화 메시지 목록
   messages.append({
      "role": "system",                     # 시스템 프롬프트로 AI의 성격/언어를 지정
      "content": "당신은 친절하고 똑똑한 AI 어시스턴트입니다. 한국어로 답변해 주세요."
   })
   for user_msg, bot_msg in history:        # 이전 (사용자, 봇) 대화 쌍을 순회
      messages.append({"role": "user",      "content": user_msg})   # 과거 사용자 발화 추가
      messages.append({"role": "assistant", "content": bot_msg})    # 과거 봇 응답 추가
   messages.append({"role": "user", "content": message})            # 현재 사용자 입력 추가


   input_ids = tokenizer.apply_chat_template(   # 메시지 목록을 모델용 입력 형식으로 변환
      messages,
      add_generation_prompt=True,           # 모델이 응답을 시작하도록 생성 프롬프트 추가
      return_tensors="pt"                   # PyTorch 텐서 형태로 반환
   ).to(model.device)                        # 모델이 올라간 디바이스(GPU 등)로 이동


   outputs = model.generate(                 # 실제 텍스트 생성 수행
      input_ids,
      max_new_tokens=1024,                   # 최대 생성 토큰 수 (응답 길이 상한)
      eos_token_id=model.config.eos_token_id, # 종료 토큰 — 응답 끝을 판단
      do_sample=True,                        # 확률적 샘플링 사용 (다양한 응답)
      temperature=0.7,                       # 다양성 제어 (0=결정적, 1=창의적)
      top_p=0.9,                             # 누적 확률 0.9 이내 토큰만 후보로 (nucleus 샘플링)
   )
   response = outputs[0][input_ids.shape[-1]:]   # 입력 부분을 제외한 새로 생성된 토큰만 추출
   return tokenizer.decode(response, skip_special_tokens=True)   # 토큰을 텍스트로 디코딩(특수 토큰 제거)


# ==========================================
# 4. Gradio 웹 UI 설정
# ==========================================
demo = gr.ChatInterface(                     # 채팅형 UI를 자동 생성하는 Gradio 컴포넌트
   fn=generate_response,                     # 메시지 처리에 사용할 함수 연결
   title="무료 한국어 AI 챗봇 (FastAPI + Gradio)",   # 화면 상단 제목
   description="Qwen2.5-7B 모델이 백엔드에서 구동되고 있습니다.",  # 설명 문구
   examples=["안녕? 넌 누구야?", "스마트 모빌리티에 대해 쉽게 설명해줘."],  # 예시 질문 버튼
   theme="soft"                              # UI 테마 (부드러운 스타일)
)


# ==========================================
# 5. FastAPI에 Gradio 화면 마운트
# ==========================================
app = gr.mount_gradio_app(app, demo, path="/")   # Gradio UI를 FastAPI 루트 경로(/)에 마운트


@app.get("/api/health")                      # GET /api/health 엔드포인트 정의 (헬스체크)
def health_check():
   return {"status": "ok", "message": "FastAPI 백엔드가 정상 작동 중입니다."}  # JSON 응답 반환


if __name__ == "__main__":                   # 스크립트를 직접 실행할 때만 동작
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=False)
    # main 모듈의 app 객체를 모든 IP(0.0.0.0)·8000 포트로 서비스, 코드 자동 재시작은 끔
```

`MODEL_ID`는 Hugging Face Hub에서 내려받을 모델의 경로입니다. `BitsAndBytesConfig`는 4-bit 양자화 설정으로, `load_in_4bit=True`가 핵심 옵션입니다. `bnb_4bit_quant_type="nf4"`는 NF4(Normal Float 4) 양자화 방식을 사용하며, 4-bit 중 가장 성능이 좋습니다. `device_map="auto"`는 사용 가능한 GPU에 모델 레이어를 자동으로 분배합니다. `generate_response` 함수는 Gradio의 `ChatInterface`에 연결되며, `message`(현재 입력)와 `history`(이전 대화 기록)를 받아 AI 응답을 생성합니다. `apply_chat_template`은 `messages` 목록을 모델이 이해할 수 있는 형식으로 변환합니다. `temperature=0.7`은 답변의 다양성을 제어합니다(0에 가까울수록 결정적, 1에 가까울수록 창의적). `gr.mount_gradio_app`을 통해 Gradio UI가 FastAPI의 루트 경로(`/`)에 마운트됩니다.

## 1.3 로컬 서버 실행 및 접속

이 절에서는 작성한 `main.py`를 uvicorn으로 실행하고 브라우저로 접속하여 챗봇이 동작하는지 확인합니다.

### (1) 서버 실행

이 소절에서는 uvicorn 명령으로 FastAPI + Gradio 서버를 시작합니다.

```bash
# main 모듈의 app 객체를 모든 IP(0.0.0.0)·8000 포트로 실행
uvicorn main:app --host 0.0.0.0 --port 8000


# 실행 결과 (최초 실행 시 모델 다운로드 포함 5~20분 소요)
모델을 다운로드하고 불러오는 중입니다... (최초 1회 시간이 걸립니다)
INFO: Started server process [12345]
INFO: Application startup complete.
INFO: Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

최초 실행 시 Hugging Face 서버에서 약 14GB 크기의 모델 파일을 다운로드합니다. 네트워크 환경에 따라 5~20분이 소요될 수 있습니다. 이후 실행부터는 로컬 캐시에서 즉시 로드됩니다. 서버가 시작되면 브라우저에서 `http://localhost:8000` 으로 접속하면 Gradio 챗봇 UI가 표시됩니다. `http://localhost:8000/api/health` 로 접속하면 FastAPI 헬스체크 JSON 응답을 확인할 수 있습니다.

## 1.4 FastAPI + Gradio 허깅페이스 스페이스 배포

이 절에서는 로컬에서 개발한 FastAPI + Gradio 애플리케이션을 허깅페이스 스페이스(Hugging Face Spaces)에 Docker 방식으로 배포합니다. 허깅페이스는 무료로 AI 애플리케이션을 배포하고 공유할 수 있는 플랫폼입니다.

### (1) 프로젝트 파일 구조

이 소절에서는 허깅페이스 배포에 필요한 3개의 파일 구조를 설명합니다.

```text
ai-chatbot/
├── main.py          # FastAPI + Gradio 메인 코드
├── requirements.txt # 의존성 패키지 목록
└── Dockerfile       # 허깅페이스 배포용 도커 설정
```

### (2) requirements.txt 작성

이 소절에서는 배포에 필요한 Python 패키지 목록을 작성합니다.

```text
# ai-chatbot/requirements.txt
fastapi          # 웹 프레임워크
uvicorn          # ASGI 서버
gradio           # 웹 UI
transformers     # Hugging Face 모델 로딩
accelerate       # 디바이스 자동 분배
bitsandbytes     # 4-bit 양자화
torch            # PyTorch 딥러닝 연산
```

허깅페이스 스페이스 배포용 `requirements.txt`는 최소한의 패키지만 명시합니다. 로컬 개발에서 사용한 `torch`, `transformers` 등의 AI 패키지는 모델 서빙 목적이 아닌 UI 데모용이므로 여기서는 제외합니다. AI 모델이 필요한 경우 별도로 추가합니다.

### (3) Dockerfile 작성

이 소절에서는 허깅페이스 스페이스에서 FastAPI를 안정적으로 구동하기 위한 Dockerfile을 작성합니다. 허깅페이스는 기본적으로 7860 포트를 외부로 노출합니다.

```dockerfile
# ai-chatbot/Dockerfile

# Python 3.12 슬림 이미지 사용 (경량 베이스 이미지)
FROM python:3.12-slim


# 작업 디렉토리 설정 (컨테이너 내부 기준 경로를 /code로 지정)
WORKDIR /code


# 의존성 파일 복사 및 설치
COPY ./requirements.txt /code/requirements.txt          # requirements.txt 를 먼저 복사 (캐시 활용 목적)
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
# --no-cache-dir: pip 캐시를 남기지 않아 이미지 용량 절감 / --upgrade: 최신 버전으로 설치


# 소스 코드 복사 (현재 디렉토리 전체를 컨테이너 작업 디렉토리로 복사)
COPY . .


# 허깅페이스 기본 포트(7860) 사용
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
# 컨테이너 시작 시 uvicorn으로 main:app 을 0.0.0.0:7860 으로 실행
```

`FROM python:3.12-slim`은 Python 3.12 경량 이미지를 베이스로 사용합니다. `WORKDIR /code`는 컨테이너 내부의 작업 디렉터리를 `/code`로 설정합니다. `requirements.txt`를 먼저 복사하고 설치하는 이유는 도커 레이어 캐시를 활용하여 소스 코드만 변경될 때는 `pip install`을 다시 실행하지 않도록 하기 위함입니다. 허깅페이스 스페이스는 7860 포트를 외부에 노출하므로 uvicorn 실행 시 `--port 7860`을 지정합니다.

### (4) 허깅페이스 스페이스 생성 및 파일 업로드

이 소절에서는 허깅페이스 계정에서 새 스페이스를 생성하고 파일을 업로드하여 배포를 완료합니다.

#### ① 스페이스 생성

허깅페이스(https://huggingface.co)에 로그인한 후 우측 상단 프로필 → **[New Space]**를 클릭합니다. Space 이름을 입력합니다(예: `fastapi-gradio-chatbot`). Space SDK 선택 화면에서 반드시 Gradio가 아닌 **Docker**를 선택합니다. **Blank** 템플릿을 선택하고, 하드웨어는 무료인 **CPU basic**을 선택한 뒤 **[Create Space]**를 클릭합니다.

#### ② 파일 업로드

생성된 Space 페이지의 **[Files]** 탭으로 이동합니다. **[Add file] → [Upload files]**를 클릭하여 로컬에서 작성한 `main.py`, `requirements.txt`, `Dockerfile` 세 파일을 선택하고 업로드합니다. 하단의 'Commit changes to main'을 클릭하여 파일을 저장합니다.

#### ③ 빌드 확인

파일을 업로드하면 허깅페이스가 자동으로 Docker 이미지를 빌드하기 시작합니다(상태: **Building**). 1~2분 후 상태가 **Running**으로 바뀌면 앱 탭에서 Gradio UI를 확인할 수 있습니다. 앱 URL 뒤에 `/docs`를 붙이면(예: `https://유저명-스페이스명.hf.space/docs`) FastAPI의 Swagger UI를 확인할 수 있습니다.
