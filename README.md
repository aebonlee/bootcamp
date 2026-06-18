# DreamIT 부트캠프 — 웹개발 학습 플랫폼

웹 기초(HTML·CSS·JS)부터 React 프론트엔드, 생성형 AI 웹 서비스, 실전 배포까지 — **4개 트랙 · 27개 챕터 · 137개 강의**로 완성하는 실무형 웹 개발 학습 플랫폼.

🔗 **https://bootcamp.dreamitbiz.com**

NOVAWORKS 디자인 아티팩트(블루 그라데이션 + 오렌지 포인트, Pretendard, 플로팅 필 헤더)를 React로 포팅하고,
교재 내용을 웹페이지로 재구성해 커리큘럼을 구성했습니다(교재 원본 파일은 비배포).

## 기술 스택
- **React 18 + Vite 5** — SPA, `react-router-dom`, 챕터 본문 lazy 로딩
- **Supabase** — 인증(구글·카카오 OAuth) + 학습 진도 저장 (`webpro_` 접두사, RLS)
- **react-markdown + react-syntax-highlighter** — 강의 본문 렌더링(구문강조·녹색 주석·복사)
- **sharp** — OG 이미지(1200×630) 생성
- **GitHub Actions** — `main` 푸시 시 GitHub Pages 자동 배포 (커스텀 도메인)

## 4개의 학습 트랙
| 트랙 | 내용 | 챕터 |
|------|------|------|
| **웹 기초** | HTML 구조 · CSS 기초 · CSS 레이아웃 · JS 문법 · JS와 브라우저(DOM/이벤트/fetch) | 5 |
| **React 프론트엔드** | JSX · Props/State · UI · 상태관리 · API/인증 · 설계 · 배포 · 실무 | 8 |
| **AI 웹 서비스** | FastAPI/Hugging Face · Transformers · NLP · 이미지생성 · 음성 · CV · 멀티모달 · 배포운영 | 8 |
| **실전 배포·협업** | Git·GitHub · AI챗봇 배포 · EC2/Docker/WinSCP · 프레임워크 AWS 배포 · 풀스택·MSA | 6 |

## 주요 기능
- **강의** — 좌측 목차(섹션 진도 체크) + 우측 본문(설명·코드·표·상세 주석)
- **프로젝트** — 입문·중급·고급 18개, 상세 페이지에 **실제 구현 코드 + 라이브 데모/결과 미리보기**
- **복습·퀴즈** — 핵심 용어 216개(검색·트랙필터) + 퀴즈 135문항(챕터별/랜덤, 채점·해설·최고점)
- **자료실** — 전 챕터 목차·실습 예제 모아보기

## 로컬 개발
```bash
npm install
cp .env.example .env.local   # Supabase 값 입력
npm run dev                  # http://localhost:5173
npm run og                   # public/og-image.png 재생성
npm run build && npm run preview
```

## 환경 변수
| 키 | 설명 |
|----|------|
| `VITE_SUPABASE_URL` | Supabase 프로젝트 URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon 키 |

> 배포 시 동일 키를 GitHub 저장소 **Secrets** 에 등록하면 Actions 빌드에서 주입됩니다.

## Supabase 준비
1. `supabase/schema.sql` 을 SQL Editor에서 실행 (webpro_ 테이블 + RLS).
2. Authentication → Providers 에서 **Google**, **Kakao** 활성화.
3. Redirect URL 에 `https://bootcamp.dreamitbiz.com/auth/callback` (및 로컬 `http://localhost:5173/auth/callback`) 추가.

## 폴더 구조
```
src/
  components/   Header, Footer, Logo, Reveal, ui(ChapterCard 등)
  pages/        Home, Curriculum, Track, Lesson, Login, MyPage, About, AuthCallback, NotFound
  hooks/        useAuth, useProgress, useReveal
  lib/          supabase, db
  data/         curriculum.js  (← docs/curriculum 에서 생성)
  theme.js      디자인 토큰
scripts/gen-og.mjs   OG 이미지 생성기
supabase/schema.sql  DB 스키마
docs/                원본 학습자료(PDF·추출 텍스트·커리큘럼 JSON)
```

## 학습자료 출처
`docs/` 폴더 참조 — 원본 PDF 16종, 추출 텍스트, 커리큘럼 JSON. 자세한 내용은 [`docs/README.md`](docs/README.md).

---
© DreamIT Biz · Powered by React · Vite · Supabase
