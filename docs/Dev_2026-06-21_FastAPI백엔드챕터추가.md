# 개발일지 — AI 트랙 신규 챕터 ai-09 "FastAPI 백엔드 완성" 추가

**날짜:** 2026-06-21
**작업자:** Claude Code (with DreamIT Biz)
**저장소:** github.com/aebonlee/bootcamp · **배포:** https://bootcamp.dreamitbiz.com

---

## 1. 목표
- 신규 학습자료 `docs/FastAPI_교안_V9_완성본.pdf`(24p, 8챕터+부록)를 사이트 콘텐츠로 반영
- AI 웹 서비스 트랙에 **FastAPI 백엔드 정공법** 전용 챕터 신설(운영자 결정: "새 챕터 추가")

## 2. 자료 분석 — 교안 구성
"FastAPI 백엔드 개발 완성 과정": CH01 개요·환경 → CH02 라우터·HTTP메서드 → CH03 Pydantic 검증 → CH04 SQLAlchemy·DB → CH05 CRUD API 완성(Repository 패턴) → CH06 React 연동(CORS) → CH07 React CRUD UI → CH08 pytest·Docker + 부록(도서 관리 API 종합실습).
- 기존 AI 트랙(ai-01~08)은 **Hugging Face/모델 중심**이라 DB·CRUD·Pydantic 검증·React 연동·pytest·Docker가 체계적으로 부재 → 교안이 정확히 그 빈틈을 보강.

## 3. 구현 내역
| 영역 | 파일 | 설명 |
|------|------|------|
| 본문 | `src/content/ai-09.md` | 교안 CH01~08 + 부록을 9.1~9.9 섹션으로 작성(앵커 `s-9.1`~`s-9.9` 매칭). 기존 챕터 문체/코드주석 스타일 준수, 교안 코드 충실 재현 |
| 커리큘럼 | `src/data/curriculum.js` | `ai-09` 챕터 엔트리(track ai, no 9, 9개 섹션, 난이도 실전, 약 5시간) — ai-08 블록 직후 삽입 |
| 실습 랩 | `src/data/labs.js` | `LABS['ai-09']` 5종(Pydantic 검증·CRUD·React연동·pytest/Docker·도서관리 종합) |
| 복습 퀴즈 | `src/data/review.js` | `QUIZZES['ai-09']` 5문항(Path/Query·422·스키마분리·get_db·CORS) |
| 용어집 | `src/data/review.js` | `GLOSSARY` ai-09 용어 7종(APIRouter·Pydantic 스키마·Depends·Repository 패턴·response_model·CORS·TestClient) |
| 카운트 | `README.md`, `usePageMeta.js`, `Curriculum.jsx` | 하드코딩된 챕터/강의 수 갱신, AI 트랙 행 8→9 |

## 4. 정합성 / 검증
- 총계: **28개 챕터 · 146개 강의**(AI 트랙 8→9). 대부분의 사이트 표기는 `CHAPTERS`에서 동적 계산되어 자동 반영(Home·Login·Footer·About·Resources).
- 섹션 no ↔ 본문 `##` 헤딩 9/9 매칭 확인(TOC 스크롤 앵커 정상).
- `npx vitest run src/data/data.test.js` → **15/15 통과**(labs·quiz 챕터 커버리지 포함).
- `npm run build` → 성공, `dist/assets/ai-09-*.js` 청크(lazy 본문) 정상 생성.

## 5. 비고
- 원본 PDF(`docs/FastAPI_교안_V9_완성본.pdf`)는 docs에 보관(비배포 자료).
- ai-09는 모델 데모를 넘어 사용자·데이터·인증을 갖춘 실서비스로 확장하는 백엔드 한 사이클을 담당.

## 6. 후속 — 코칭 가이드 반영 (coach-fastapi)
- 운영자 요청으로 ai-09 백엔드 내용을 **코칭 가이드(부록)** 에도 반영.
- `coach-supabase`("Supabase 실전 패턴 — 백엔드를 백엔드 없이")의 짝으로 **`coach-fastapi` "FastAPI 백엔드 실전 패턴"** 신설(category appendix).
- `src/content/coach-fastapi.md`: 폴더 분리 / Create·Response 스키마 분리(보안) / Depends(get_db) 세션 / Repository 패턴 / 상태 코드 / CORS / TestClient / Dockerfile + 자주 겪는 함정 · 백엔드 선택 가이드(Supabase vs FastAPI) · 점검 체크리스트 · 실습 과제. 본문에서 강의 9장(/lesson/ai-09)으로 연결.
- `src/data/coaching.js`: GUIDES에 coach-fastapi 추가(coach-supabase 직후) → APPENDIX 9→10종, Coaching 페이지 카운트 자동 반영.
- 검증: data.test + render.test 29/29 통과, build 성공(coach-fastapi 청크 생성).

## 7. 전체 점검 & 메뉴 정합화 (사이트 감사)
- **전체 라우트 라이브 감사**(홈·소개·커리큘럼·트랙4·강의·자료·프로젝트·퀴즈·코칭·가이드): HTTP 200·콘솔에러 0·h1 정상. /login·/me의 404는 프리렌더 제외 인증페이지의 의도된 SPA fallback. 콘텐츠 무결성(본문42=챕터28+가이드14, 고아·깨진링크·앵커누락 0).
- **메뉴 추가 방식 확인**: 상단 네비(Header.jsx NAV)는 미수정. ai-09는 기존 'AI' 트랙 메뉴(/track/ai)+커리큘럼·자료에, coach-fastapi는 기존 '코칭' 메뉴(/coaching) 부록탭에 **데이터 기반으로 자동 편입**.
- **메뉴명 정확화**: 네비 라벨 '코칭' → **'코칭·가이드'**(페이지 제목 '코칭 & 가이드'와 일치, 가이드 포함 사실 반영).
- **stale 카운트 일괄 수정 → 동적 계산으로 self-heal**: ai-09/coach-fastapi 추가로 옛 숫자가 곳곳에 잔존했던 것을 발견·수정.
  - 동적화: `prerender.mjs`(DEFAULT_DESC·커리큘럼·프로젝트·퀴즈·코칭 desc → TOTAL_*/length 참조), `gen-og.mjs`(OG이미지 챕터·강의 수), `Quiz.jsx`(용어·퀴즈 수)
  - 정적 갱신: `index.html` 3곳(28챕터·146강의), `README.md`(용어223·퀴즈140), `review.js` 주석(28챕터)
  - 실제 값: 챕터28·강의146·용어223·퀴즈140·코칭4·부록10·Tips17·프로젝트18
- 검증: 잔존 stale 0, build 성공, `npm run og`·`prerender`(70라우트) 동적 값으로 정상 생성, 테스트 29/29.

## 8. 자료실에 코칭·가이드 섹션 추가
- 운영자 요청으로 자료실(`/resources`)에 **코칭·가이드 섹션 신설**(기존엔 커리큘럼 챕터만 노출).
- `src/pages/Resources.jsx`: `coaching.js`의 COACHING·APPENDIX import → BY TRACK 섹션 하단에 "코칭 · 가이드"(인디고 #6D5BD0) 섹션 추가. 기술 코칭/부록 가이드 2그룹, 가이드별 카드(카테고리 배지·제목·요약·태그)로 `/coaching/{id}` 링크. 히어로 통계에 '코칭·가이드 N종' 칩 + 소개문구 갱신.
- 검증: render.test 14/14, build 성공, 로컬 프리뷰에서 섹션·전체 가이드(coach-fastapi 포함) 노출·에러 0 확인.

## 9. 상단 메뉴 그룹 구분 (데스크톱)
- 데스크톱 상단 네비가 10개 항목을 평평하게 나열하던 것을 **3그룹으로 시각 구분**(드롭다운 미사용 — 기존 결정 존중).
- `src/components/Header.jsx`: 메인(소개·커리큘럼) ┃ 학습 트랙(웹기초·프론트엔드·AI·배포) ┃ 학습 도구(프로젝트·퀴즈·자료·코칭·가이드) 사이에 **세로 구분선** 삽입. 트랙 4종엔 **trackColor 색상 점**(보라·블루·오렌지·그린)으로 한눈에 구분. 모바일 그룹 논리와 일치.
- 반응형 분기점 1040px 이하는 기존 버거→풀스크린 메뉴(이미 '학습 트랙' 그룹 보유) 유지.
- 검증: render.test 14/14, 1280·1041px(최소 데스크톱) 한 줄 유지·CTA 미겹침, 빌드 OK.
- 후속: 트랙 메뉴명을 정식 명칭으로 통일 — AI → **"AI 웹 서비스"**, 배포 → **"실전 배포·협업"**(TRACKS 라벨과 일치). 1280·1100·1041px 모두 한 줄·미겹침 확인.
- 후속2: 나머지 트랙도 정식 명칭으로 — 웹기초 → **"웹 기초"**, 프론트엔드 → **"React 프론트엔드"**. 4종 모두 풀네임이 되어 폭이 늘어 **반응형 분기점 1040→1100px 상향**(1041~1100 구간은 버거 메뉴로). ≥1101px 데스크톱 nav 여유 40px+ 확보, 1280·1101px 한 줄 확인.

## 10. 히어로 배경 JS 효과 (파티클 네트워크)
- 홈 히어로(`Home.jsx`)에 캔버스 기반 인터랙티브 배경 효과 추가.
- `src/components/HeroCanvas.jsx` 신설: 브랜드 블루/오렌지 파티클이 떠다니며 가까운 점끼리 선 연결, 마우스 근처로 끌림+연결선(pointermove). silk.svg·라디얼 그라데이션 위·콘텐츠 아래에 배치, `pointer-events:none`으로 클릭 통과.
- 품질: `prefers-reduced-motion` 시 1프레임 정적 렌더, DPR 보정(상한 2), 면적 비례 점 개수(26~70), rAF·리사이즈·언마운트 정리. jsdom 등 캔버스 미지원 환경 가드(getContext/matchMedia) → 렌더 테스트 안전.
- 검증: render.test 14/14, build OK, 로컬 프리뷰에서 캔버스 마운트·마우스 인터랙션·텍스트 가독성·콘솔에러0 확인.
- 업그레이드(화려하게) 시도 → 산만하다는 피드백으로 정리(라인 네트워크) → **최종적으로 효과 전체 제거**: `HeroCanvas.jsx` 삭제, `Home.jsx`에서 import·컴포넌트 제거. 히어로는 원래 배경(silk.svg + 라디얼 그라데이션)으로 복원. 결론적으로 히어로 JS 배경 효과는 도입하지 않음. 검증: render.test 14/14, build OK, 캔버스 0개·라이브 확인.

## 참고: FastAPI 교안 PDF의 반영 위치
- 원본 `docs/FastAPI_교안_V9_완성본.pdf`는 **docs/에 그대로 보관**(이동·재추가 없음). Vite 빌드는 public/+src만 번들 → **dist 미포함, 사이트 비배포** 레퍼런스 자료.
- PDF '내용'이 반영된 산출물: 강의 `src/content/ai-09.md`(+curriculum/labs/review 메타), 코칭 가이드 `src/content/coach-fastapi.md`(+coaching.js).
