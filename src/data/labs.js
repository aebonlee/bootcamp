// 챕터별 실습 예제(핸즈온) — docs PDF 교재의 실습 과제를 정리
// chapterId -> [{ title, desc, stack:[] }]
export const LABS = {
  'react-01': [
    { title: 'Vite로 첫 React 프로젝트 생성', desc: 'create-vite로 개발환경을 구성하고 "Hello React" 컴포넌트를 렌더링합니다.', stack: ['Vite', 'npm'] },
    { title: 'JSX 프로필 카드 만들기', desc: 'JSX 작성 규칙과 단일 루트 노드 원칙을 지켜 프로필 카드 UI를 구현합니다.', stack: ['JSX'] },
  ],
  'react-02': [
    { title: 'Props 상품 카드 컴포넌트', desc: '부모가 내려준 props로 상품명·가격·이미지를 표시하는 재사용 카드.', stack: ['Props'] },
    { title: 'useState 카운터 & 토글', desc: 'State로 숫자 증감과 좋아요 토글을 구현하며 리렌더링을 이해합니다.', stack: ['useState'] },
    { title: '상위/하위 컴포넌트 통신', desc: '콜백 props로 자식→부모 데이터 전달 흐름을 실습합니다.', stack: ['Props', 'State'] },
  ],
  'react-03': [
    { title: 'Figma 시안 → 기본 컴포넌트', desc: '버튼·입력 필드·카드를 디자인 토큰에 맞춰 컴포넌트로 제작합니다.', stack: ['Figma', 'CSS'] },
    { title: '로그인 화면 UI 구현', desc: '입력 폼과 버튼을 조합해 로그인 화면을 마크업합니다.', stack: ['Form UI'] },
  ],
  'react-04': [
    { title: '이벤트 처리 폼', desc: 'onChange/onSubmit 이벤트로 제어 컴포넌트 폼을 만듭니다.', stack: ['Events'] },
    { title: 'useEffect 데이터 패칭', desc: '마운트 시 데이터를 불러오고 정리(cleanup)까지 다룹니다.', stack: ['useEffect'] },
    { title: 'Context API 전역 상태', desc: '테마/사용자 정보를 Context로 전역 공유합니다.', stack: ['Context API'] },
  ],
  'react-05': [
    { title: 'fetch/axios API 호출', desc: '공개 REST API를 호출해 로딩·에러 상태를 처리합니다.', stack: ['fetch', 'axios'] },
    { title: 'Todo 애플리케이션', desc: '추가·완료·삭제가 가능한 할 일 앱으로 CRUD 흐름을 익힙니다.', stack: ['CRUD', 'State'] },
    { title: '로그인 프로세스 + 토큰', desc: '로그인 API 호출과 토큰 저장·인증 헤더 처리를 구현합니다.', stack: ['Auth', 'JWT'] },
  ],
  'react-06': [
    { title: '실무 컴포넌트 구조 설계', desc: 'features/components/pages로 폴더 구조와 책임을 분리합니다.', stack: ['Architecture'] },
    { title: 'react-router 화면 흐름', desc: '라우팅으로 페이지 전환과 중첩 라우트를 구성합니다.', stack: ['react-router'] },
  ],
  'react-07': [
    { title: '커스텀 훅으로 리팩터링', desc: '중복 로직을 커스텀 훅으로 추출해 가독성을 높입니다.', stack: ['Custom Hook'] },
    { title: '빌드 & 정적 호스팅 배포', desc: 'vite build 산출물을 정적 호스팅에 배포합니다.', stack: ['Vite', 'Deploy'] },
  ],
  'react-08': [
    { title: '금융 서비스 목록·상세 화면', desc: '리스트→상세 라우팅과 데이터 바인딩으로 실무형 화면을 완성합니다.', stack: ['Routing', 'UI'] },
    { title: '미니 프로젝트 완성 & 발표', desc: '배운 내용을 통합한 미니 프로젝트를 마무리하고 발표합니다.', stack: ['Project'] },
  ],
  'ai-01': [
    { title: 'FastAPI Hello World 서버', desc: 'uvicorn으로 첫 FastAPI 서버를 띄우고 /docs를 확인합니다.', stack: ['FastAPI', 'Uvicorn'] },
    { title: 'AI Hello World API', desc: 'Hugging Face 감정분석 모델을 FastAPI 엔드포인트로 래핑합니다.', stack: ['Hugging Face', 'pipeline'] },
  ],
  'ai-02': [
    { title: 'pipeline 텍스트 분류', desc: '한 줄로 사전학습 모델을 불러와 감정/주제를 분류합니다.', stack: ['pipeline'] },
    { title: 'GPT-2 / KoGPT 텍스트 생성', desc: '한국어 텍스트를 자동 생성하고 파라미터를 조절합니다.', stack: ['GPT-2', 'KoGPT'] },
    { title: '저장 모델 FastAPI 서빙', desc: '로컬에 저장한 모델을 API/Streamlit으로 서빙합니다.', stack: ['FastAPI', 'Streamlit'] },
  ],
  'ai-03': [
    { title: 'FastAPI 챗봇 API', desc: '텍스트 입출력 기반의 간단한 챗봇 엔드포인트를 만듭니다.', stack: ['DialoGPT'] },
    { title: 'T5 문서 요약 API', desc: '긴 문서를 요약하는 Seq2Seq 요약기 API를 구현합니다.', stack: ['T5'] },
    { title: 'MarianMT 번역 API', desc: '영↔한 번역 API를 만들고 응답 품질을 확인합니다.', stack: ['MarianMT'] },
    { title: 'FAISS 유사도 검색 API', desc: '문장 임베딩과 FAISS로 의미 기반 검색을 구현합니다.', stack: ['sentence-transformers', 'FAISS'] },
  ],
  'ai-04': [
    { title: 'Stable Diffusion 이미지 생성 API', desc: '프롬프트를 받아 이미지를 생성하는 API를 만듭니다.', stack: ['Stable Diffusion'] },
    { title: 'ControlNet · LoRA 이미지 변환', desc: '조건부 생성과 LoRA로 스타일을 제어합니다.', stack: ['ControlNet', 'LoRA'] },
  ],
  'ai-05': [
    { title: 'Whisper 음성 인식 API', desc: '오디오 업로드를 받아 텍스트로 전사하는 STT API.', stack: ['Whisper'] },
    { title: 'TTS 음성 합성 API', desc: '텍스트를 음성으로 변환해 오디오를 반환합니다.', stack: ['TTS', 'Bark'] },
    { title: '음성 챗봇 파이프라인', desc: 'STT→LLM→TTS를 연결한 음성 챗봇을 구축합니다.', stack: ['STT', 'TTS'] },
  ],
  'ai-06': [
    { title: '이미지 분류 웹앱', desc: '업로드 이미지를 분류해 결과를 보여주는 웹 앱.', stack: ['ViT', 'ResNet'] },
    { title: 'YOLOv8 객체 탐지 API', desc: '이미지에서 객체를 탐지해 박스를 반환합니다.', stack: ['YOLOv8'] },
    { title: 'BLIP 이미지 캡셔닝', desc: '이미지 설명문을 자동 생성하는 API.', stack: ['BLIP'] },
  ],
  'ai-07': [
    { title: 'CLIP 이미지 검색', desc: '텍스트-이미지 공동 임베딩으로 시맨틱 검색을 구현합니다.', stack: ['CLIP'] },
    { title: 'LLaVA 멀티모달 챗봇', desc: '이미지+질문을 함께 처리하는 비전 챗봇을 만듭니다.', stack: ['LLaVA'] },
    { title: '멀티모달 통합 API', desc: 'UploadFile+Form으로 이미지·텍스트 통합 요청을 처리합니다.', stack: ['FastAPI'] },
  ],
  'ai-08': [
    { title: 'Docker로 API 컨테이너화', desc: 'FastAPI 서비스를 Docker 이미지로 패키징합니다.', stack: ['Docker'] },
    { title: 'Spaces · Render · AWS 배포', desc: '여러 호스팅에 모델 API를 실제로 배포합니다.', stack: ['HF Spaces', 'Render', 'AWS'] },
    { title: 'API 모니터링 & 최적화', desc: 'Gunicorn 워커와 모니터링으로 운영 성능을 최적화합니다.', stack: ['Gunicorn'] },
  ],
}

export const labsOf = (chapterId) => LABS[chapterId] || []
export const totalLabs = Object.values(LABS).reduce((n, a) => n + a.length, 0)
