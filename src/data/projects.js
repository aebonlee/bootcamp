// 학습 후 직접 만들어 보는 프로젝트 예제 — 입문 → 중급 → 고급
// track: web | react | ai | ops | fullstack
export const PROJECT_LEVELS = ['입문', '중급', '고급']

export const PROJECTS = [
  // ===== 입문 =====
  {
    id: 'p-profile-cards', level: '입문', track: 'react',
    title: '프로필 카드 갤러리',
    summary: 'JSX와 props, 배열 map 렌더링으로 팀원 프로필 카드를 그리드로 보여주는 첫 React 앱.',
    duration: '2~3시간',
    stack: ['React', 'JSX', 'props', 'CSS'],
    features: ['컴포넌트 분리(Card)와 props 전달', '배열 데이터를 map으로 반복 렌더링', '반응형 그리드 레이아웃', '조건부 렌더링(재직/퇴사 배지)'],
    chapters: ['react-01', 'react-02'],
  },
  {
    id: 'p-todo', level: '입문', track: 'react',
    title: '할 일 관리 Todo 앱',
    summary: 'useState로 추가·완료·삭제를 처리하고 localStorage로 데이터를 보존하는 대표 입문 실습.',
    duration: '3~4시간',
    stack: ['React', 'useState', 'localStorage'],
    features: ['할 일 추가/삭제/완료 토글', '불변성을 지키는 상태 배열 관리', '필터(전체/진행/완료)', 'localStorage 영속화'],
    chapters: ['react-02', 'react-04', 'react-05'],
  },
  {
    id: 'p-weather', level: '입문', track: 'react',
    title: '날씨·환율 조회 위젯',
    summary: 'fetch/axios로 공개 API를 호출하고 로딩·에러 상태를 처리하는 비동기 데이터 연동 입문.',
    duration: '3시간',
    stack: ['React', 'fetch', 'useEffect'],
    features: ['도시 입력 → 외부 API 호출', '로딩 스피너와 에러 메시지 처리', 'useEffect 의존성 이해', '응답 데이터 가공·표시'],
    chapters: ['react-04', 'react-05'],
  },
  {
    id: 'p-sentiment', level: '입문', track: 'ai',
    title: 'AI 감정 분석기 API',
    summary: 'FastAPI와 Hugging Face 파이프라인으로 문장의 긍·부정을 판별하는 첫 AI 웹 API.',
    duration: '3시간',
    stack: ['FastAPI', 'Hugging Face', 'pipeline'],
    features: ['pipeline("sentiment-analysis")로 추론', 'POST /predict 엔드포인트 설계', 'Pydantic 요청/응답 모델', 'Swagger UI(/docs)로 테스트'],
    chapters: ['ai-01', 'ai-02'],
  },

  // ===== 중급 =====
  {
    id: 'p-movie', level: '중급', track: 'react',
    title: '영화 검색 SPA',
    summary: 'react-router로 목록·상세 화면을 라우팅하고 외부 API 검색·페이지네이션을 구현하는 실무형 SPA.',
    duration: '6~8시간',
    stack: ['React', 'react-router', 'REST API'],
    features: ['검색어 → API 호출과 디바운스', '목록 → 상세 라우팅(useParams)', '즐겨찾기(Context/localStorage)', '로딩·빈 결과·에러 UX'],
    chapters: ['react-04', 'react-05', 'react-06'],
  },
  {
    id: 'p-board', level: '중급', track: 'fullstack',
    title: 'Supabase 게시판 (CRUD + 인증)',
    summary: '구글/카카오 로그인과 Supabase 데이터베이스로 글 작성·수정·삭제와 권한(RLS)을 구현하는 풀스택 게시판.',
    duration: '8~10시간',
    stack: ['React', 'Supabase', 'OAuth', 'RLS'],
    features: ['소셜 로그인과 세션 유지', '글 CRUD와 본인 글만 수정/삭제(RLS)', '페이지네이션·검색', '작성자 프로필 연동'],
    chapters: ['react-05', 'react-06'],
  },
  {
    id: 'p-nlp-service', level: '중급', track: 'ai',
    title: '문서 요약·번역 웹서비스',
    summary: 'T5 요약기와 MarianMT 번역 모델을 FastAPI로 묶고 간단한 프론트엔드에서 호출하는 NLP 서비스.',
    duration: '7시간',
    stack: ['FastAPI', 'T5', 'MarianMT'],
    features: ['요약 API와 번역 API 라우터 분리', '긴 문서 입력 처리와 길이 제한', 'CORS 설정과 프론트 연동', 'Swagger로 다국어 입력 테스트'],
    chapters: ['ai-03'],
  },
  {
    id: 'p-vision', level: '중급', track: 'ai',
    title: '이미지 분류 웹앱',
    summary: '이미지를 업로드하면 사전학습 모델이 분류 결과를 돌려주는 컴퓨터 비전 웹앱.',
    duration: '6시간',
    stack: ['FastAPI', 'transformers', 'UploadFile'],
    features: ['이미지 업로드(UploadFile) 처리', '분류 모델 추론과 Top-K 결과', '결과 시각화 UI', '파일 검증·임시파일 정리'],
    chapters: ['ai-06'],
  },

  // ===== 고급 =====
  {
    id: 'p-dashboard', level: '고급', track: 'fullstack',
    title: '학습 진도 대시보드',
    summary: '이 사이트처럼 소셜 인증·진도 저장·달성률 시각화를 갖춘 풀스택 학습 플랫폼을 직접 설계·구현.',
    duration: '12시간+',
    stack: ['React', 'Supabase', 'react-router', '차트'],
    features: ['구글/카카오 인증과 프로필', '섹션 단위 진도 저장(upsert)', '트랙·챕터별 달성률 차트', '리팩터링과 정적 배포(CI/CD)'],
    chapters: ['react-06', 'react-07', 'react-08'],
  },
  {
    id: 'p-multimodal', level: '고급', track: 'ai',
    title: '멀티모달 AI 챗봇',
    summary: 'CLIP/LLaVA로 이미지와 텍스트를 함께 이해하고 답하는 멀티모달 챗봇을 FastAPI + React로 구축.',
    duration: '12시간+',
    stack: ['FastAPI', 'CLIP', 'LLaVA', 'React'],
    features: ['이미지+질문 멀티파트 업로드', '멀티모달 추론 파이프라인', '대화 컨텍스트 유지', '스트리밍 응답(SSE)'],
    chapters: ['ai-07'],
  },
  {
    id: 'p-voice', level: '고급', track: 'ai',
    title: '음성 비서 웹앱',
    summary: 'Whisper 음성인식 → 챗봇 → TTS로 이어지는 음성 대화 파이프라인을 갖춘 보이스 어시스턴트.',
    duration: '12시간+',
    stack: ['FastAPI', 'Whisper', 'TTS'],
    features: ['마이크 녹음 업로드와 STT', 'STT→LLM→TTS 파이프라인', '오디오 스트리밍 응답', '통합 main.py와 운영 구성'],
    chapters: ['ai-05'],
  },
  {
    id: 'p-saas', level: '고급', track: 'fullstack',
    title: 'AI 이미지 생성 SaaS MVP',
    summary: 'Stable Diffusion 생성 API에 인증·크레딧·배포까지 얹은 미니 SaaS를 React+FastAPI+Supabase로 완성.',
    duration: '16시간+',
    stack: ['React', 'FastAPI', 'Stable Diffusion', 'Docker'],
    features: ['프롬프트 → 이미지 생성 API', '로그인과 사용량(크레딧) 관리', 'Docker 컨테이너화와 배포', '모니터링·속도 최적화'],
    chapters: ['ai-04', 'ai-08', 'react-07'],
  },

  // ===== 입문 추가 =====
  {
    id: 'p-pomodoro', level: '입문', track: 'react',
    title: '포모도로 집중 타이머',
    summary: 'useState와 useEffect로 카운트다운 타이머를 만들고, 집중/휴식 사이클을 자동 전환하는 생산성 앱.',
    duration: '3시간',
    stack: ['React', 'useEffect', 'setInterval'],
    features: ['setInterval로 1초 단위 카운트다운', '집중·휴식 모드 자동 전환', '시작/정지/리셋 컨트롤', 'useEffect 클린업으로 타이머 정리'],
    chapters: ['react-02', 'react-04'],
  },
  {
    id: 'p-markdown', level: '입문', track: 'react',
    title: '실시간 마크다운 미리보기',
    summary: '제어 컴포넌트로 입력값을 관리하고, 입력과 동시에 마크다운을 HTML로 변환해 보여주는 에디터.',
    duration: '3시간',
    stack: ['React', '제어 컴포넌트', 'onChange'],
    features: ['textarea 제어 컴포넌트 상태 관리', '입력 → 실시간 변환·렌더링', '좌우 분할 에디터 레이아웃', '글자 수·단어 수 카운터'],
    chapters: ['react-03', 'react-04'],
  },

  // ===== 중급 추가 =====
  {
    id: 'p-kanban', level: '중급', track: 'react',
    title: '칸반 보드 (할 일 관리)',
    summary: '여러 컬럼 사이로 카드를 옮기는 칸반 보드를 만들며 복잡한 상태 구조와 드래그 인터랙션을 다룹니다.',
    duration: '7시간',
    stack: ['React', 'Context API', 'localStorage'],
    features: ['컬럼·카드 중첩 상태 구조 설계', '드래그 앤 드롭으로 카드 이동', 'Context로 보드 전역 상태 공유', 'localStorage 자동 저장·복원'],
    chapters: ['react-04', 'react-06'],
  },
  {
    id: 'p-chatbot-web', level: '중급', track: 'ai',
    title: 'AI 챗봇 웹앱',
    summary: 'FastAPI 챗봇 API와 React 채팅 UI를 연결해, 입력·응답·대화 기록을 갖춘 풀스택 챗봇을 완성합니다.',
    duration: '8시간',
    stack: ['FastAPI', 'React', 'REST API'],
    features: ['FastAPI 챗봇 엔드포인트 구현', 'React 채팅 인터페이스와 상태 관리', '로딩·타이핑 인디케이터 UX', '대화 컨텍스트·기록 유지'],
    chapters: ['ai-03', 'react-05'],
  },

  // ===== 고급 추가 (배포·협업 연계) =====
  {
    id: 'p-git-portfolio', level: '고급', track: 'ops',
    title: 'Git 협업 포트폴리오 배포',
    summary: 'React 포트폴리오를 Git·GitHub으로 협업 관리하고, 빌드 결과물을 AWS EC2 + Nginx로 직접 배포합니다.',
    duration: '10시간+',
    stack: ['Git', 'GitHub', 'AWS', 'Nginx'],
    features: ['브랜치 전략과 Pull Request 협업', 'React 빌드와 정적 파일 산출', 'EC2 + Nginx 정적 호스팅 배포', '커스텀 도메인·SPA 라우팅 설정'],
    chapters: ['ops-01', 'ops-04', 'react-07'],
  },
  {
    id: 'p-docker-msa', level: '고급', track: 'ops',
    title: '도커 MSA 풀스택 서비스',
    summary: 'FastAPI·Vue·PostgreSQL을 컨테이너로 묶어 DockerHub에 올리고, EC2에서 docker-compose로 통합 배포합니다.',
    duration: '16시간+',
    stack: ['Docker', 'docker-compose', 'PostgreSQL', 'DockerHub'],
    features: ['서비스별 Dockerfile 작성', 'DockerHub 이미지 빌드·푸시', 'docker-compose 통합 오케스트레이션', 'Nginx 통합 라우팅과 MSA 구성'],
    chapters: ['ops-05', 'ops-06'],
  },
]

export const byLevel = (lv) => PROJECTS.filter((p) => p.level === lv)
export const getProject = (id) => PROJECTS.find((p) => p.id === id)
export const TOTAL_PROJECTS = PROJECTS.length
