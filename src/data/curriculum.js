// 자동 생성: docs/curriculum/*.json (web-pro 리포 PDF 학습자료 기반)
// 편집 시 docs 원본과 동기화 권장
export const CHAPTERS = [
  {
    "id": "react-01",
    "track": "react",
    "no": 1,
    "title": "JSX 문법과 React 기본 개념",
    "summary": "React의 핵심인 선언적 UI 작성 방식을 JSX 문법을 통해 익히고, Virtual DOM이 어떻게 실제 화면을 효율적으로 갱신하는지 그 원리를 이해합니다. 단일 루트 노드 규칙과 Vite 기반 개발환경 구성까지 실습하며 이후 컴포넌트 설계와 상태 관리로 나아갈 탄탄한 기초를 다집니다.",
    "duration": "약 4시간",
    "level": "입문",
    "tags": [
      "JSX",
      "Virtual DOM",
      "Fragment",
      "Vite",
      "React 19"
    ],
    "sections": [
      {
        "no": "1.1",
        "title": "JSX 정의 및 작성 규칙",
        "summary": "JSX는 JavaScript 안에서 UI를 선언적으로 표현하는 HTML 유사 문법으로, 마크업과 로직을 한 컴포넌트에 결합해 가독성과 유지보수성을 높입니다. 작성 규칙과 Babel 변환 과정을 이해하면 직관적이고 오류 없는 컴포넌트 코드를 작성할 수 있습니다.",
        "points": [
          "JSX는 HTML 유사 문법에 중괄호 {} 표현식을 결합해 정적 구조와 동적 데이터를 함께 정의한다",
          "class는 className, for는 htmlFor로 작성하고 모든 태그는 self-closing 등으로 반드시 닫아야 한다",
          "{} 안에는 statement가 아닌 expression만 올 수 있어 조건은 삼항/논리 연산자, 반복은 map()으로 처리한다",
          "Babel이 JSX를 React.createElement() 또는 자동 런타임(jsx)으로 변환해 브라우저가 실행할 수 있게 한다"
        ]
      },
      {
        "no": "1.2",
        "title": "React DOM 렌더링 구조",
        "summary": "Virtual DOM은 실제 DOM의 경량 표현으로, 변경 전후를 비교하는 reconciliation을 통해 최소한의 DOM 조작만 수행해 성능을 최적화합니다. createRoot 기반의 React 18/19 렌더링 엔진과 Diffing 알고리즘, UI 갱신 흐름을 학습합니다.",
        "points": [
          "Virtual DOM은 메모리상 트리를 비교(reconciliation)해 바뀐 부분만 실제 DOM에 반영한다",
          "React 18부터 createRoot()가 표준이며 동시성·자동 배칭을 제공하고 render()는 React 19에서 제거된다",
          "Diffing은 같은 타입이면 속성만 갱신하고 타입이 다르면 서브트리를 교체하며, key로 리스트 항목을 추적한다",
          "상태 변경 → VDOM 재생성 → diff → 커밋 단계로 실제 DOM이 갱신되는 선언적 렌더링 흐름을 이해한다"
        ]
      },
      {
        "no": "1.3",
        "title": "단일 루트 노드 개념",
        "summary": "React 컴포넌트는 일관된 렌더 트리 관리를 위해 반드시 하나의 루트 노드를 반환해야 합니다. div, React.Fragment, 축약 문법(<>)의 차이를 이해하고 불필요한 DOM 노드 없이 형제 요소를 그룹화하는 방법을 익힙니다.",
        "points": [
          "여러 형제 요소를 감싸지 않으면 'Adjacent JSX elements must be wrapped' 오류가 발생한다",
          "Fragment는 DOM에 노드를 추가하지 않아 div soup·레이아웃·접근성 문제를 방지한다",
          "div는 스타일·레이아웃 컨테이너가 필요할 때, Fragment(<>)는 단순 그룹화 시 사용한다",
          "map에서 그룹에 key가 필요하면 축약형 대신 React.Fragment key={...}를 사용한다"
        ]
      },
      {
        "no": "1.4",
        "title": "개발환경 구성 및 프로젝트 생성",
        "summary": "Node.js와 패키지 매니저 설치를 확인하고 Vite로 React 19 프로젝트를 빠르게 생성하는 과정을 실습합니다. ESLint·Prettier 등 필수 도구 설정과 프로젝트 구조 분석, 첫 컴포넌트 작성까지 진행해 개발 토대를 완성합니다.",
        "points": [
          "Node LTS와 npm/pnpm/yarn 설치를 확인하고 nvm 등으로 버전을 관리한다",
          "npm create vite@latest 명령으로 React 프로젝트를 생성하면 빠른 HMR과 가벼운 번들링을 얻는다",
          "VS Code, ESLint, Prettier, React DevTools를 설정해 코드 품질과 디버깅 효율을 높인다",
          "src/main.jsx(createRoot 진입점), App.jsx, components 등 구조를 이해하고 npm run dev로 실행한다"
        ]
      }
    ]
  },
  {
    "id": "react-02",
    "track": "react",
    "no": 2,
    "title": "Props와 State 이해",
    "summary": "React의 핵심 데이터 메커니즘인 props와 state를 깊이 이해하고, 부모-자식 컴포넌트 간 단방향 데이터 흐름을 실습으로 익힙니다. props의 읽기 전용 성질과 타입 검증, props drilling 문제부터 컴포넌트 설계 원칙까지 다뤄 재사용 가능하고 유지보수가 쉬운 UI 구조를 구축합니다.",
    "duration": "약 4시간",
    "level": "초급",
    "tags": [
      "Props",
      "State",
      "useState",
      "단방향 데이터 흐름",
      "컴포넌트 설계"
    ],
    "sections": [
      {
        "no": "2.1",
        "title": "Props 개념과 데이터 전달 구조",
        "summary": "Props는 부모가 자식에게 값을 전달하는 읽기 전용 매개체로, 단방향 데이터 흐름을 통해 예측 가능한 UI를 만듭니다. 기본값 설정과 타입 검증으로 안정성을 높이고, props drilling 문제와 그 보완책까지 이해합니다.",
        "points": [
          "Props는 읽기 전용·불변이며 부모에서 자식으로만 흐르는 단방향 데이터 흐름을 보장한다",
          "자식이 값을 바꿔야 할 때는 Lifting State Up으로 부모가 value와 onChange를 함께 전달한다",
          "defaultProps/ES6 기본값으로 기본값을 지정하고 PropTypes나 TypeScript로 타입을 검증한다",
          "여러 계층을 거쳐 전달하는 props drilling은 Context API나 전역 상태 라이브러리로 보완한다"
        ]
      },
      {
        "no": "2.2",
        "title": "상위/하위 컴포넌트 관계 실습",
        "summary": "Vite 프로젝트에서 부모가 props로 데이터를 전달하고 자식이 구조분해 할당으로 수신·렌더링하는 흐름을 실습합니다. 중첩 구조의 props 전달, 이벤트 핸들러 주입, props 기반 UI 재사용까지 직접 구현하며 패턴을 체득합니다.",
        "points": [
          "부모는 JSX 속성으로 문자열·객체·함수 등 모든 값을 전달하고 children으로 JSX 조각도 넘긴다",
          "자식은 구조분해 할당과 기본값으로 props를 수신하고 옵셔널 체이닝으로 안전하게 렌더링한다",
          "이벤트 핸들러를 props로 전달하면 자식이 호출만으로 부모 상태를 변경할 수 있다",
          "객체/함수 전달 시 useMemo·useCallback과 React.memo로 불필요한 재렌더를 방지한다"
        ]
      },
      {
        "no": "2.3",
        "title": "State 개념 및 활용",
        "summary": "State는 컴포넌트 내부에서 관리되는 동적 데이터로, 변경되면 자동으로 재렌더링되어 UI를 최신 상태로 유지합니다. useState로 상태를 선언·변경하고 불변성 패턴, Controlled Component, 조건부 렌더링과 결합해 예측 가능한 상태 관리를 구현합니다.",
        "points": [
          "useState(초기값)는 [상태값, setter]를 반환하며 setter 호출 시 컴포넌트가 재렌더링된다",
          "직접 state를 수정하지 않고 항상 setter와 spread 연산자로 불변성을 유지한다",
          "value + onChange의 Controlled Component 패턴으로 폼 입력을 관리한다",
          "Props는 부모가 관리하는 읽기 전용 데이터, State는 자신이 변경하는 로컬 데이터로 역할이 구분된다"
        ]
      },
      {
        "no": "2.4",
        "title": "컴포넌트 설계 원칙",
        "summary": "단일 책임 원칙과 상태/로직 분리를 기반으로 UI 요소를 분할하고 재사용 가능한 컴포넌트를 설계합니다. props 설계 전략, 폴더 구조와 명명 규칙, 도메인 중심·기능 중심·혼합형 등 실무 설계 사례를 비교해 확장성 있는 구조 전략을 익힙니다.",
        "points": [
          "단일 책임 원칙으로 컴포넌트를 분할하고 Container/Presentational로 상태와 렌더링을 분리한다",
          "value+콜백 패턴, onX 이벤트 네이밍, variant/size/as 등 일관된 props API를 설계한다",
          "PascalCase 파일명과 index.js barrel 재export로 폴더 구조를 체계화한다",
          "도메인 중심·기능 중심·혼합형 설계를 유지보수성·재사용성·협업 효율 기준으로 비교 선택한다"
        ]
      }
    ]
  },
  {
    "id": "react-03",
    "track": "react",
    "no": 3,
    "title": "UI 디자인 및 구현",
    "summary": "Figma 시안을 분석해 spacing·hierarchy·color 시스템을 디자인 토큰으로 코드화하고, 버튼·입력필드·카드 같은 기본 UI 컴포넌트를 제작합니다. styled-components와 CSS 모듈로 스타일을 관리하고, 사용자 입력 처리·폼 검증·접근성을 적용해 완성도 높은 로그인 화면까지 구현합니다.",
    "duration": "약 4시간",
    "level": "중급",
    "tags": [
      "Figma",
      "디자인 토큰",
      "styled-components",
      "CSS Modules",
      "폼 검증"
    ],
    "sections": [
      {
        "no": "3.1",
        "title": "Figma 연계 및 코드 설계",
        "summary": "Figma 시안을 분석해 컴포넌트 구조와 디자인 속성을 추출하고, spacing·hierarchy·color 시스템을 표준화합니다. 디자인 토큰을 JSON으로 정리해 CSS 변수와 theme.js로 변환하는 자동화 흐름을 구축해 디자이너와 개발자의 협업 간극을 줄입니다.",
        "points": [
          "Figma Inspect/Tokens 플러그인으로 색상·폰트·spacing 토큰을 추출해 design-tokens.json으로 정리한다",
          "spacing은 4px 그리드, color는 Primary/Secondary/Neutral/Accent로 표준화하고 다크/라이트 모드를 고려한다",
          "Node 스크립트로 토큰을 :root와 [data-theme=dark]의 CSS 변수로 자동 생성한다",
          "global.css와 theme.js(ThemeProvider)에서 토큰을 참조해 일관된 디자인 시스템을 적용한다"
        ]
      },
      {
        "no": "3.2",
        "title": "버튼, 입력 필드, 카드 컴포넌트 제작",
        "summary": "size·variant·disabled·loading 상태를 갖춘 Button, 검증·접근성을 포함한 TextInput, header/body/footer 구조의 Card를 제작합니다. styled-components와 CSS 모듈의 장단점을 비교하고 useState·useReducer 기반 폼 처리와 A11y·UX 개선까지 적용합니다.",
        "points": [
          "Button·TextInput·Card를 상태별·구조별로 정의하고 공통 props 설계 전략을 적용한다",
          "styled-components는 props 기반 동적 스타일·Theme에, CSS Modules는 정적 레이아웃에 혼합 사용한다",
          "useState(간단)와 useReducer(복잡) 폼으로 입력값·검증·로딩·서버 에러를 관리한다",
          "label htmlFor, aria-invalid/describedby, role=alert, aria-busy로 접근성과 UX를 강화한다"
        ]
      },
      {
        "no": "3.3",
        "title": "로그인 화면 구현",
        "summary": "아이디·비밀번호 입력과 Remember Me, 비밀번호 마스킹 등 보안 요소를 갖춘 로그인 플로우를 설계합니다. member.json 기반 검증, 로딩·오류 처리, React Router를 통한 페이지 전환과 localStorage 인증 상태 관리까지 실무형 인증 화면을 완성합니다.",
        "points": [
          "Header/Main(Login Form)/Footer 레이아웃과 반응형 배치로 로그인 화면을 구조화한다",
          "useState로 입력값을 관리하고 member.json에서 아이디·비밀번호를 검증한다",
          "로딩·오류 UX를 표시하고 성공 시 localStorage 저장 후 useNavigate로 홈으로 이동한다",
          "React Router(BrowserRouter, Routes, Route)로 Login/Home 페이지 전환을 구현한다"
        ]
      }
    ]
  },
  {
    "id": "react-04",
    "track": "react",
    "no": 4,
    "title": "상태관리 및 데이터 연동",
    "summary": "React 애플리케이션의 핵심인 상태 관리와 데이터 연동을 심도 있게 다룹니다. 합성 이벤트 기반의 입력 제어, useState·useEffect 훅을 활용한 동적 상태 갱신과 비동기 처리, Context API를 통한 전역 상태 공유까지 학습해 일관된 데이터 흐름과 효율적인 상태 관리 구조를 구현합니다.",
    "duration": "약 4시간",
    "level": "실전",
    "tags": [
      "Synthetic Event",
      "useState",
      "useEffect",
      "Context API",
      "비동기 처리"
    ],
    "sections": [
      {
        "no": "4.1",
        "title": "이벤트 처리 메커니즘",
        "summary": "React는 브라우저 네이티브 이벤트를 감싼 합성 이벤트(SyntheticEvent)로 onClick·onChange 등을 일관되게 처리합니다. 핸들러 선언과 연결, 인자 전달, 상위→하위 함수 전달 구조를 Todo 앱 실습으로 익히며 단방향 데이터 흐름을 체득합니다.",
        "points": [
          "SyntheticEvent로 e.target, preventDefault, stopPropagation 등 공통 API를 일관되게 사용한다",
          "핸들러는 화살표 함수로 래핑해 인자를 전달하고 onClick={fn(id)}처럼 즉시 호출을 피한다",
          "상위가 상태와 변경 함수를 정의해 props로 전달하는 Lifting State Up으로 데이터 흐름을 제어한다",
          "useCallback과 React.memo로 핸들러 재생성에 따른 불필요한 재렌더를 방지한다"
        ]
      },
      {
        "no": "4.2",
        "title": "useState, useEffect Hook 활용",
        "summary": "React 16.8에 도입된 훅으로 함수형 컴포넌트에서도 상태와 생명주기 로직을 사용합니다. useState로 상태를 초기화·갱신하고 useEffect로 데이터 fetch 같은 부수 효과를 처리하며, 의존성 배열로 실행 시점을 제어하는 원리를 실습합니다.",
        "points": [
          "useState는 [상태, setter]를 반환하며 setter 호출 시 재렌더링되어 UI를 동기화한다",
          "useEffect는 렌더링 이후 실행되며 return의 clean-up 함수로 메모리 누수를 방지한다",
          "의존성 배열로 실행을 제어한다: []는 마운트 시 1회, [value]는 값 변경 시, 생략은 매 렌더",
          "useEffect로 API fetch, 이벤트 구독/해제 등 비동기·외부 의존 로직을 안전하게 처리한다"
        ]
      },
      {
        "no": "4.3",
        "title": "Context API를 통한 상태관리",
        "summary": "Context API는 추가 라이브러리 없이 전역 상태를 공유해 props drilling 문제를 해결하는 내장 기능입니다. createContext와 useContext로 컨텍스트를 정의·사용하고, Provider로 값을 공급하며, 테마 전환과 인증 상태를 전역으로 관리하는 실습을 진행합니다.",
        "points": [
          "createContext로 컨텍스트를 생성하고 useContext로 컴포넌트에서 값을 직접 참조한다",
          "Context.Provider의 value로 하위 트리에 상태를 공급하며 Consumer보다 useContext를 권장한다",
          "Auth·Theme·Language 등 여러 Provider를 중첩 배치해 전역 상태를 계층적으로 관리한다",
          "props drilling 없이 필요한 컴포넌트에서 테마 전환·로그인/로그아웃 상태를 바로 사용한다"
        ]
      }
    ]
  },
  {
    "id": "react-05",
    "track": "react",
    "no": 5,
    "title": "API 연동과 인증 프로세스 구현",
    "summary": "fetch와 axios로 외부 API를 호출하고 로딩·에러·취소 상태를 깔끔하게 다루는 실무 패턴을 익힙니다. Todo 앱으로 상태 관리와 localStorage 영속성을 다지고, 로그인 API 연동부터 JWT 기반 인증 상태 유지·보호 라우트까지 실무형 프론트엔드의 핵심 흐름을 완성합니다.",
    "duration": "약 4시간",
    "level": "중급",
    "tags": [
      "fetch",
      "axios",
      "JWT",
      "useEffect",
      "인증"
    ],
    "sections": [
      {
        "no": "5.1",
        "title": "fetch/axios를 이용한 API 호출",
        "summary": "JavaScript의 비동기 모델과 Promise/async-await 흐름을 이해하고, fetch와 axios의 차이를 비교합니다. 응답·에러·로딩 상태를 관리하는 공통 훅(useApi)을 만들어 외부 데이터를 안정적으로 화면에 렌더링하는 실무 패턴을 학습합니다.",
        "points": [
          "이벤트 루프 기반 비동기 호출과 직렬·병렬 제어, AbortController를 이용한 취소·타임아웃 처리",
          "fetch(내장·경량)와 axios(자동 JSON 파싱·인터셉터·인스턴스 설정)의 장단점 비교 및 선택 기준",
          "{ data, loading, error } 상태 패턴과 컴포넌트 언마운트 시 취소를 처리하는 공통 useApi 훅 설계",
          "스켈레톤 로더·빈 상태·낙관적 업데이트 등 외부 데이터 기반 화면의 UX 구성 요소"
        ]
      },
      {
        "no": "5.2",
        "title": "Todo 애플리케이션 작성",
        "summary": "useState로 할 일 배열을 관리하며 추가·삭제·완료 토글을 불변성 원칙에 맞게 구현합니다. 조건부 렌더링으로 완료 상태를 시각화하고 localStorage로 데이터를 저장해, 상태 관리·이벤트 처리·영속성을 종합적으로 실습합니다.",
        "points": [
          "스프레드 연산자와 filter·map을 활용한 불변성 기반 항목 추가·삭제·수정",
          "삼항 연산자와 조건부 className으로 완료/미완료 항목을 시각적으로 구분하는 조건부 렌더링",
          "useEffect와 localStorage를 결합해 새로고침 후에도 데이터가 유지되는 영속성 구현",
          "TodoInput·TodoList·TodoItem으로 책임을 분리한 컴포넌트 구조화"
        ]
      },
      {
        "no": "5.3",
        "title": "로그인 프로세스 및 API 호출 구현",
        "summary": "아이디·비밀번호 입력으로 로그인 API를 호출하고 JWT 토큰을 localStorage에 저장해 인증 상태를 유지합니다. Context 기반 전역 인증 상태, 보호 라우트, 로그인 후 리다이렉트, 로딩·에러 처리까지 실무형 인증 흐름을 직접 구축합니다.",
        "points": [
          "로그인 API POST 요청과 응답에 따른 성공·실패 분기, 토큰 수신 처리",
          "JWT 토큰의 localStorage 저장·제거와 인증 헤더(Bearer) 첨부를 통한 인증 상태 유지",
          "AuthContext로 전역 인증 상태를 제공하고 ProtectedRoute로 비인증 접근을 차단·리다이렉트",
          "member.json 기반 모의 로그인과 학습용 페이크 JWT 생성·파싱·만료 검증"
        ]
      }
    ]
  },
  {
    "id": "react-06",
    "track": "react",
    "no": 6,
    "title": "리액트 프로젝트 설계",
    "summary": "단순 학습 예제를 넘어 실제 서비스 수준의 프로젝트 구조를 설계하는 방법을 배웁니다. 도메인·기능·화면 중심 폴더 구조를 비교하고 중첩 컴포넌트 전략과 협업 규칙을 익히며, React Router로 SPA 화면 흐름과 라우팅을 구성해 작은 전자상거래 샘플을 완성합니다.",
    "duration": "약 4시간",
    "level": "중급",
    "tags": [
      "폴더구조",
      "컴포넌트설계",
      "React Router",
      "SPA",
      "Context"
    ],
    "sections": [
      {
        "no": "6.1",
        "title": "실무 컴포넌트 구조 설계",
        "summary": "도메인 중심·기능 중심·화면 중심 폴더 구조를 비교하고 응집도와 결합도를 고려한 경계를 설계합니다. Container/Presentational 분리, props 인터페이스, 구성(composition) 패턴과 메모이제이션, 그리고 팀 협업을 위한 네이밍·문서화 규칙까지 학습합니다.",
        "points": [
          "도메인 단위로 components·hooks·api를 모아 응집도를 높이는 폴더 구조와 점진적 마이그레이션 전략",
          "기능 중심 vs 화면 중심 구조의 장단점 비교와 프로젝트 상황에 맞춘 하이브리드 선택 기준",
          "Container/Presentational 분리, children·render props·커스텀 훅을 활용한 구성 패턴",
          "네이밍 규칙·ESLint/Prettier·Storybook·Git 워크플로우 등 팀 협업 표준화"
        ]
      },
      {
        "no": "6.2",
        "title": "화면 흐름 및 라우팅 구성",
        "summary": "SPA의 동작 원리와 브라우저 히스토리 처리, 코드 스플리팅을 이해합니다. React Router를 설치해 경로를 설정하고 Link·NavLink·useNavigate로 화면을 전환하며, 중첩 라우팅과 URL·쿼리 파라미터, 보호 라우트까지 실전 라우팅을 구성합니다.",
        "points": [
          "History API 기반 SPA 라우팅 원리와 React.lazy·Suspense를 이용한 코드 스플리팅",
          "BrowserRouter·Routes·Route 기본 셋업과 와일드카드 404·SPA 서버 폴백 설정",
          "Link·NavLink·useNavigate·useLocation을 활용한 선언적·프로그래밍적 화면 이동",
          "Outlet 중첩 라우팅과 useParams·useSearchParams를 통한 동적·쿼리 파라미터 처리"
        ]
      },
      {
        "no": "6.3",
        "title": "리액트 프로젝트 설계 실습",
        "summary": "도메인 중심 폴더 구조와 중첩 라우팅을 실제 Vite 기반 코드로 구현합니다. 공통 컴포넌트화, 상태 위치 재배치, CartContext·AuthContext 설계를 적용해 장바구니·인증·대시보드를 갖춘 전자상거래 스타일 샘플을 완성합니다.",
        "points": [
          "반복 UI·로직을 공통 컴포넌트와 유틸·훅으로 추출해 재사용성과 테스트 용이성 확보",
          "로컬 vs 전역 상태 판별과 useReducer·Context를 활용한 props drilling 제거",
          "useReducer+localStorage로 장바구니 상태를 관리하는 CartContext 구현",
          "MainLayout·ProtectedRoute·도메인 컴포넌트로 구성한 라우팅 기반 실무 샘플 빌드"
        ]
      }
    ]
  },
  {
    "id": "react-07",
    "track": "react",
    "no": 7,
    "title": "프로젝트 리팩터링과 배포",
    "summary": "중복 제거·공통 컴포넌트 추출·상태 재배치 등 안전한 리팩토링 기법과 ESLint·Prettier·husky·CI로 코드 품질 파이프라인을 구축합니다. 이어 CRA와 Vite 빌드 차이, Netlify·Vercel 배포, 환경변수 보안 처리, Sentry·Web Vitals 모니터링까지 운영 전 과정을 실무 관점으로 익힙니다.",
    "duration": "약 4시간",
    "level": "실전",
    "tags": [
      "리팩토링",
      "ESLint",
      "CI/CD",
      "Vite",
      "Netlify"
    ],
    "sections": [
      {
        "no": "7.1",
        "title": "코드 리팩토링 기법",
        "summary": "반복되는 UI와 로직을 공통 컴포넌트·커스텀 훅·유틸로 추출하고 명확한 인터페이스와 테스트로 보완합니다. 일관된 네이밍·폴더 정리, 상태 위치 이동과 useReducer 도입, ESLint·Prettier·husky·CI로 코드 품질을 자동 검증하는 파이프라인을 구축합니다.",
        "points": [
          "중복 버튼·로직을 variant 기반 공통 컴포넌트와 useLocalStorage 같은 훅으로 추출",
          "PascalCase·use 접두사·index.js re-export 등 네이밍·폴더 표준과 단일 진입점 설계",
          "로컬 vs 전역 상태 판정, 상태 끌어올리기, Context vs react-query·Redux 선택 기준",
          "ESLint+Prettier 설정, husky·lint-staged pre-commit 훅, GitHub Actions CI와 RTL 테스트"
        ]
      },
      {
        "no": "7.2",
        "title": "빌드 및 배포 프로세스",
        "summary": "CRA(webpack)와 Vite(esbuild·Rollup)의 빌드 방식 차이와 번들 최적화·코드 스플리팅을 이해합니다. Netlify·Vercel로 SPA를 배포하고, 빌드타임 vs 런타임 환경변수와 시크릿을 안전하게 다루며, Sentry·Web Vitals로 배포 후 모니터링 흐름을 구성합니다.",
        "points": [
          "CRA와 Vite의 개발 서버·번들러 차이, tree-shaking·번들 분석을 통한 용량 최적화",
          "Netlify(_redirects·netlify.toml)·Vercel(vercel.json) SPA 폴백 배포와 커스텀 도메인·HTTPS",
          "REACT_APP_/VITE_ 접두사 환경변수와 GitHub Secrets·서버리스 함수를 통한 시크릿 보호",
          "Sentry 오류 수집, Web Vitals 성능 지표, 알림·롤백·헬스체크 운영 모니터링 전략"
        ]
      }
    ]
  },
  {
    "id": "react-08",
    "track": "react",
    "no": 8,
    "title": "프로젝트 실무 적용",
    "summary": "금융 서비스 목록·상세 화면을 직접 설계하고 API 연동·조건부 렌더링·예외 처리를 적용해 실무형 화면을 구현합니다. 기획서 작성부터 기능 구현, 발표·시연, 피드백 기반 개선과 문서화까지 팀 단위 미니 프로젝트 전 과정을 경험하며 개발과 협업 역량을 함께 키웁니다.",
    "duration": "약 3시간",
    "level": "실전",
    "tags": [
      "프로젝트",
      "API연동",
      "조건부렌더링",
      "협업",
      "발표"
    ],
    "sections": [
      {
        "no": "8.1",
        "title": "금융 서비스 목록·상세 화면 구현",
        "summary": "목록과 상세 화면을 재사용 가능한 컴포넌트 단위로 설계하고, axios/fetch로 외부 데이터를 바인딩합니다. 로딩·에러·빈 데이터 등 다양한 조건에 따른 조건부 렌더링과 예외 처리를 적용해 안정적이고 사용자 친화적인 금융 화면을 완성합니다.",
        "points": [
          "ServiceList·ServiceItem·ServiceDetail로 목록/상세 UI를 컴포넌트화하고 props로 데이터·이벤트 전달",
          "useState·useEffect와 axios로 데이터를 fetch하며 loading·error 상태 관리",
          "로딩 스피너·빈 데이터·네트워크 오류를 다루는 조건부 렌더링과 예외 처리 UI",
          "목록 선택→상세→뒤로가기로 이어지는 화면 전환 시나리오 통합"
        ]
      },
      {
        "no": "8.2",
        "title": "미니 프로젝트 완성 및 발표",
        "summary": "기능 기획서와 구현 전략 수립부터 화면 설계·기능 구현, 발표 자료 제작과 시연까지 프로젝트 전 과정을 경험합니다. 발표와 팀 피드백을 바탕으로 코드를 개선하고 README·설계 문서를 정리해 실무형 프로젝트 마무리를 학습합니다.",
        "points": [
          "요구사항 정의·화면 흐름 설계·구현 전략 수립으로 개발 전 아키텍처와 로드맵 정리",
          "컴포넌트 설계, useState·useEffect·Context 상태 관리, 이벤트 처리로 동작하는 화면 구현",
          "화면 캡처·기능 설명을 담은 발표 자료 제작과 실무형 시연·질의응답",
          "피드백 기반 중복 제거·불변성 개선·네이밍 정리와 README·API 문서화"
        ]
      },
      {
        "no": "8.3",
        "title": "금융 서비스 프로젝트 애플리케이션",
        "summary": "가상 은행 GTBank API를 연동하는 React+Axios 애플리케이션을 실행 가능한 수준으로 구현합니다. 디렉터리 구조·설치·실행 명령부터 API 모듈, 공통 컴포넌트, 라우팅 기반 홈·상세 페이지까지 전체 소스 코드를 직접 작성하며 실무 흐름을 완성합니다.",
        "points": [
          "axios 인스턴스로 fetchAccounts·fetchAccountDetail API 모듈(bankApi.js) 구성",
          "Loader·Header·AccountList·AccountDetail 등 재사용 공통 컴포넌트 작성",
          "useParams 기반 상세 조회와 로딩·에러 처리를 갖춘 Home·Detail 페이지 구현",
          "BrowserRouter 라우팅으로 홈·상세 페이지를 연결한 SPA 구조 완성"
        ]
      }
    ]
  },
  {
    "id": "ai-01",
    "track": "ai",
    "no": 1,
    "title": "FastAPI와 Hugging Face의 첫걸음",
    "summary": "생성형 AI의 핵심 개념과 Hugging Face 플랫폼의 전반적인 구조를 이해하고, Python 개발 환경을 설정합니다. FastAPI로 첫 웹 서버를 띄우고, Hugging Face 감성 분석 모델을 API로 래핑한 간단한 AI 서비스를 직접 완성하며 이후 프로젝트의 기초를 다집니다.",
    "duration": "약 3시간",
    "level": "입문",
    "tags": [
      "FastAPI",
      "Hugging Face",
      "생성형 AI",
      "pipeline",
      "Python 환경"
    ],
    "sections": [
      {
        "no": "1.1",
        "title": "인공지능, 생성형 AI란 무엇인가?",
        "summary": "분류/예측에 집중하는 전통적 AI와 새로운 콘텐츠를 만들어내는 생성형 AI의 차이를 비교합니다. 텍스트, 이미지, 오디오, 멀티모달로 나뉘는 생성형 AI의 주요 분야와 ChatGPT, DALL·E, Stable Diffusion 등 대표 모델, 그리고 웹과 결합했을 때 가능한 서비스 사례를 살펴봅니다.",
        "points": [
          "전통적 AI(판별)와 생성형 AI(생성)의 목적·출력·학습 방식 차이를 표로 이해",
          "트랜스포머 아키텍처, 대규모 사전 학습, 파인튜닝이 생성형 AI의 3대 핵심 요소",
          "텍스트·이미지·오디오·멀티모달 4대 분야와 GPT, DALL·E, Stable Diffusion, Whisper 등 대표 모델",
          "AI 모델을 FastAPI로 노출하면 챗봇, 이미지 생성, 요약, 번역 등 다양한 웹 서비스로 확장 가능"
        ]
      },
      {
        "no": "1.2",
        "title": "Hugging Face란? (Model Hub, Dataset Hub, Spaces)",
        "summary": "'AI의 GitHub'로 불리는 Hugging Face의 탄생 배경과 민주화 철학을 소개합니다. 30만 개 이상의 모델이 등록된 Model Hub, 8만 개 이상의 공개 데이터셋, 데모 앱을 무료로 배포하는 Spaces, 그리고 단 몇 줄로 모델을 쓰게 해주는 Transformers/pipeline 라이브러리를 다룹니다.",
        "points": [
          "Model Hub는 태스크·라이브러리·언어·라이선스 필터로 모델을 검색",
          "datasets 라이브러리의 load_dataset() 한 줄로 공개 데이터셋 즉시 로드",
          "Spaces는 Gradio/Streamlit 앱을 CPU 무료 티어로 호스팅하고 git push로 자동 배포",
          "pipeline() 함수가 모델 로드·전처리·추론·후처리를 한 번에 처리하는 고수준 인터페이스 제공"
        ]
      },
      {
        "no": "1.3",
        "title": "Hugging Face Hub 살펴보기와 모델 활용",
        "summary": "Model Card 구성 요소를 읽고 Gated 모델 인증 절차를 익힙니다. 웹 UI, huggingface_hub 라이브러리, snapshot_download 세 가지 방법으로 모델을 검색·다운로드하고, transformers·datasets의 기본 구조와 로컬 캐싱 흐름을 실습합니다.",
        "points": [
          "Model Card에서 모델 설명, 사용법, 평가 결과, 한계, 라이선스를 확인",
          "Gated 모델은 huggingface-cli login 또는 HF_TOKEN 환경변수로 인증 필요",
          "AutoTokenizer + AutoModel로 토크나이징·추론·후처리 흐름을 직접 재현",
          "from_pretrained() 호출 시 ~/.cache에 자동 캐싱되며 오프라인 모드로 재사용 가능"
        ]
      },
      {
        "no": "1.4",
        "title": "Python 환경 세팅과 FastAPI 소개",
        "summary": "Python 3.10 이상 권장 이유와 venv/conda 가상 환경 구성, requirements.txt 기반 필수 패키지 설치를 다룹니다. 고성능·비동기·자동 문서화·타입 힌트 검증이라는 FastAPI의 핵심 특징을 이해하고 Flask와 비교합니다.",
        "points": [
          "프로젝트별 독립성을 위해 venv 또는 conda 가상 환경 생성·활성화",
          "fastapi, uvicorn, torch, transformers 등을 requirements.txt로 일괄 관리",
          "FastAPI는 Starlette+Pydantic 기반의 고성능 비동기 프레임워크로 AI 서빙에 적합",
          "Swagger UI(/docs), ReDoc(/redoc), openapi.json이 코드만으로 자동 생성"
        ]
      },
      {
        "no": "1.5",
        "title": "Hello World: FastAPI 웹 서버 띄우기",
        "summary": "FastAPI 앱 디렉터리 구조를 만들고 GET/POST 라우터를 작성합니다. 경로·쿼리 매개변수와 Pydantic 요청/응답 모델을 다루며, uvicorn으로 서버를 실행하고 브라우저·curl·Swagger UI·requests로 API를 테스트합니다.",
        "points": [
          "@app.get/@app.post 데코레이터로 경로·쿼리 매개변수와 Pydantic 모델을 선언",
          "uvicorn main:app --reload 로 개발 서버를 실행하고 코드 변경 시 자동 재시작",
          "브라우저, curl, Swagger UI, requests 등 4가지 방식으로 API 호출 검증",
          "response_model 지정으로 응답 데이터 타입과 자동 문서화를 함께 처리"
        ]
      },
      {
        "no": "1.6",
        "title": "종합 실습: 간단한 AI Hello World API",
        "summary": "Hugging Face 감성 분석 모델을 FastAPI로 래핑한 첫 AI API를 완성합니다. startup 이벤트로 모델을 한 번만 로드하고, /analyze 엔드포인트에서 긍정/부정 결과와 신뢰도를 반환하며 /health로 모델 로딩 상태를 점검합니다.",
        "points": [
          "startup 이벤트에서 pipeline 모델을 전역으로 한 번만 로드해 성능 확보",
          "Pydantic 요청/응답 모델로 입력 검증과 결과 구조화를 처리",
          "모델 미로드 시 HTTPException(503)으로 안전하게 에러 응답",
          "감성 라벨·신뢰도·해석 텍스트를 JSON으로 반환하는 교재 전체 흐름의 축소판"
        ]
      }
    ]
  },
  {
    "id": "ai-02",
    "track": "ai",
    "no": 2,
    "title": "Transformers 실습 기초",
    "summary": "Hugging Face transformers 라이브러리로 생성형 AI 모델을 직접 불러와 실습합니다. pipeline()으로 감정 분석·텍스트 생성을 5분 만에 실행하고, GPT-2부터 KoGPT2·KoBERT·KoAlpaca까지 한국어 모델을 다룹니다. 모델을 로컬에 저장하고 오프라인으로 사용하는 방법까지 단계별로 익힙니다.",
    "duration": "약 3시간",
    "level": "초급",
    "tags": [
      "Transformers",
      "pipeline",
      "텍스트 생성",
      "한국어 모델",
      "KoGPT2"
    ],
    "sections": [
      {
        "no": "2.1",
        "title": "파이프라인(pipeline)으로 모델 불러오기",
        "summary": "pipeline()의 개념과 내부 작동 원리(모델 식별→토크나이저→모델 로드→전처리→추론→후처리)를 이해합니다. 감정 분석 파이프라인을 실행하고, GPU/CPU 선택과 속도 비교, AutoTokenizer/AutoModel로 내부 동작을 직접 재현하는 실습을 진행합니다.",
        "points": [
          "pipeline()은 파사드 패턴으로 추론 전 과정을 단 두 줄로 압축",
          "70개 이상의 NLP·CV·오디오 태스크 지원, 태스크명만으로 기본 모델 자동 선택",
          "device 파라미터(-1 CPU, 0 GPU, 'mps')와 device_map='auto'로 실행 장치 제어",
          "AutoTokenizer+AutoModelForSequenceClassification으로 softmax 후처리까지 직접 구현"
        ]
      },
      {
        "no": "2.2",
        "title": "텍스트 생성 실습 (GPT-2, KoGPT)",
        "summary": "Causal Language Modeling 기반 텍스트 생성의 원리를 이해하고, GPT-2(영어)와 KoGPT2(한국어)로 비교 실습합니다. 프롬프트 설계 실험과 함께 max_new_tokens, temperature, top-k, top-p, repetition_penalty 등 생성 파라미터를 조정하는 방법을 배웁니다.",
        "points": [
          "텍스트 생성은 '다음 단어 예측'을 반복하는 자기회귀적 언어 모델링",
          "KoGPT2는 특수 토크나이저(bos/eos 토큰)를 직접 지정해 로드",
          "Greedy, Beam Search, Top-k, Nucleus(Top-p) 등 디코딩 전략별 특성 비교",
          "실무 권장 조합: temperature 0.7~0.9, top_p 0.9, repetition_penalty 1.2~1.3"
        ]
      },
      {
        "no": "2.3",
        "title": "한국어 모델 다뤄보기 (KoBERT, KoAlpaca)",
        "summary": "교착어인 한국어의 특성과 KoBERT, KoELECTRA, KoGPT2, KoAlpaca, HyperCLOVA X 등 한국어 특화 모델을 비교합니다. 태스크별 추천 아키텍처를 살펴보고, pipeline 없이 직접 한국어 감성 분석과 KoELECTRA 개체명 인식(NER)을 구현하며 사전 학습 모델과 파인튜닝 모델의 차이를 이해합니다.",
        "points": [
          "한국어는 어미 변화·한자어·띄어쓰기 특성 때문에 전용 모델이 필요",
          "분류·감성은 BERT 계열(Encoder), 생성은 GPT 계열(Decoder), 요약/번역은 T5/BART(Seq2Seq)",
          "AutoModelForTokenClassification으로 offset_mapping을 활용한 NER 직접 구현",
          "사전 학습 모델은 임베딩/전이학습 베이스, 파인튜닝 모델은 즉시 추론 가능"
        ]
      },
      {
        "no": "2.4",
        "title": "모델 저장과 불러오기 (로컬 & 오프라인)",
        "summary": "운영 환경 안정성을 위해 모델을 로컬에 다운로드·저장하는 방법을 다룹니다. save_pretrained()/from_pretrained() 활용, 캐시 디렉터리 구조 이해, local_files_only와 TRANSFORMERS_OFFLINE을 이용한 완전 오프라인 로드를 실습합니다.",
        "points": [
          "from_pretrained() 첫 호출 시 ~/.cache/huggingface/hub에 자동 캐싱",
          "save_pretrained()로 config·safetensors·tokenizer 파일을 지정 폴더에 저장",
          "local_files_only=True 또는 TRANSFORMERS_OFFLINE=1로 인터넷 없이 로드",
          "huggingface-cli cache scan/delete로 캐시 용량 관리"
        ]
      },
      {
        "no": "2.5",
        "title": "Streamlit·FastAPI로 저장된 모델 활용하기",
        "summary": "로컬에 저장한 모델을 웹 앱으로 시연하는 방법을 익힙니다. @st.cache_resource로 모델 재로딩을 방지하는 Streamlit 감성 분석 데모를 만들고, 나아가 FastAPI 감정 분석 API로 확장하는 흐름을 학습합니다.",
        "points": [
          "@st.cache_resource로 앱 재실행 시 모델 재로드를 방지",
          "Streamlit은 Python 코드만으로 대화형 모델 데모를 빠르게 구축",
          "사용자 입력→실시간 감성 분석→레이블별 점수 시각화 흐름 구현",
          "동일 모델을 FastAPI로 래핑하면 서비스 가능한 REST API로 전환"
        ]
      }
    ]
  },
  {
    "id": "ai-03",
    "track": "ai",
    "no": 3,
    "title": "자연어 처리 웹 서비스 만들기",
    "summary": "FastAPI와 Hugging Face NLP 모델을 연동하여 실제 동작하는 웹 API 서비스를 구현합니다. 챗봇, 문서 요약기, 다국어 번역기, 문서 유사도 검색기까지 핵심 NLP 서비스를 직접 만들며, 라우터·서비스 레이어 분리와 Swagger UI 기반 검증을 통해 AI 웹 서비스의 전체 흐름을 익힙니다.",
    "duration": "약 4시간",
    "level": "중급",
    "tags": [
      "NLP",
      "챗봇",
      "번역",
      "요약",
      "FAISS"
    ],
    "sections": [
      {
        "no": "3.1",
        "title": "FastAPI 챗봇 만들기",
        "summary": "입력 텍스트→모델 추론→응답 텍스트로 이어지는 챗봇의 기본 원리를 이해합니다. DialoGPT(영어)와 KoGPT2(한국어)를 서비스 레이어에서 로드하고, 대화 이력을 저장하지 않는 무상태(Stateless) 구조로 POST /chat API를 구현합니다.",
        "points": [
          "토크나이징→generate()→디코딩 5단계로 응답을 생성",
          "서비스 클래스(ChatbotService)로 모델 로드와 생성 로직을 캡슐화",
          "무상태 챗봇은 서버 상태 관리가 불필요하고 수평 확장이 용이",
          "Language Enum과 Pydantic Field로 언어·생성 파라미터를 검증"
        ]
      },
      {
        "no": "3.2",
        "title": "요약기 API 만들기 (T5 기반)",
        "summary": "모든 NLP 태스크를 텍스트→텍스트 변환으로 통일하는 T5 아키텍처와 'summarize:' prefix를 이해합니다. 영어는 BART, 한국어는 KETI-AIR/ke-t5-base 모델로 요약 서비스를 구현하고, max_length·min_length·num_beams 조정과 미리보기 기능을 추가합니다.",
        "points": [
          "T5는 태스크 prefix로 요약·번역·QA를 단일 Seq2Seq 구조로 처리",
          "AutoModelForSeq2SeqLM의 generate()에 num_beams·length_penalty 적용",
          "input/output 토큰 수로 압축 비율(compression_ratio)을 계산해 반환",
          "/preview 엔드포인트로 요약 전 원문 길이와 토큰 수를 미리 확인"
        ]
      },
      {
        "no": "3.3",
        "title": "번역 API 만들기 (MarianMT 기반)",
        "summary": "Helsinki-NLP가 공개한 1,000개 이상 언어 쌍의 MarianMT 모델로 다국어 번역 API를 구현합니다. opus-mt-{소스}-{목적} 패턴으로 영↔한, 영→일/중/불/독 번역을 지원하고, 단일 번역과 배치 번역 엔드포인트를 구성합니다.",
        "points": [
          "MarianMT는 OPUS 병렬 코퍼스로 학습된 Transformer Seq2Seq 모델",
          "SUPPORTED_PAIRS 딕셔너리로 언어 쌍별 모델을 관리하고 선택 로드",
          "source_lang/target_lang을 명시적으로 받아 라우팅(자동 감지 미사용)",
          "최대 50개 문장을 한 번에 처리하는 배치 번역 엔드포인트 제공"
        ]
      },
      {
        "no": "3.4",
        "title": "문서 유사도 검색 API (sentence-transformers + FAISS)",
        "summary": "키워드 매칭을 넘어 의미를 벡터로 표현해 유사 문서를 찾는 의미 검색(Semantic Search)을 구현합니다. sentence-transformers로 문장 임베딩을 생성하고, FAISS 인덱스를 구축해 코사인 유사도 기반으로 가장 관련성 높은 문서를 검색합니다.",
        "points": [
          "인덱싱 단계(문서 임베딩→FAISS 추가)와 검색 단계(쿼리 임베딩→Top-K)로 구성",
          "코사인 유사도는 벡터 방향 유사성을 측정해 NLP 임베딩에 가장 적합",
          "한국어는 jhgan/ko-sroberta-multitask, 다국어는 multilingual-MiniLM 활용",
          "FAISS IndexFlatIP(내적)+정규화로 코사인 유사도 검색을 구현"
        ]
      },
      {
        "no": "3.5",
        "title": "Swagger UI로 NLP API 체험하기",
        "summary": "FastAPI 내장 /docs와 /redoc을 통해 프론트엔드 없이 AI API를 체험하고 검증하는 방법을 익힙니다. lifespan 이벤트로 모든 모델을 일괄 로드하고 라우터를 등록하며, 다국어 입력 테스트와 메모리 최적화 팁을 다룹니다.",
        "points": [
          "lifespan(asynccontextmanager)으로 서버 시작 시 전체 모델을 일괄 로드",
          "include_router로 챗봇·요약·번역·유사도 라우터를 모듈별로 등록",
          "Swagger UI에서 한글 인코딩 이슈 발생 시 curl/Postman으로 우회",
          "8비트 양자화·CPU 오프로딩·지연 로드로 GPU OOM 방지"
        ]
      },
      {
        "no": "3.6",
        "title": "프로젝트 requirements.txt 및 실행 가이드",
        "summary": "3장에서 만든 챗봇·요약·번역·유사도 검색 API를 하나의 프로젝트로 묶어 실행하는 방법을 정리합니다. 의존성 목록(requirements.txt)과 폴더 구조, 서버 기동 명령과 점검 절차를 단계별로 안내합니다.",
        "points": [
          "requirements.txt로 transformers·torch·faiss 등 의존성 일괄 설치",
          "라우터별 모듈 구조와 main.py 통합 실행 흐름 이해",
          "uvicorn 기동 후 /docs에서 각 API 동작 점검"
        ]
      }
    ]
  },
  {
    "id": "ai-04",
    "track": "ai",
    "no": 4,
    "title": "이미지 생성 서비스 만들기",
    "summary": "Hugging Face diffusers 라이브러리로 Stable Diffusion 기반 텍스트→이미지 생성 모델을 웹 API로 구현합니다. 프롬프트 한 줄로 고품질 이미지를 만들고, ControlNet과 LoRA로 구조 보존 변환과 스타일 전환을 실습하며, fp16·xFormers 등 GPU 메모리 최적화 기법까지 다룹니다.",
    "duration": "약 4시간",
    "level": "실전",
    "tags": [
      "Stable Diffusion",
      "diffusers",
      "ControlNet",
      "LoRA",
      "GPU 최적화"
    ],
    "sections": [
      {
        "no": "4.1",
        "title": "Stable Diffusion 실습 개요",
        "summary": "CLIP 텍스트 인코더, UNet, VAE, Scheduler가 협력하는 잠재 확산 모델(LDM)의 작동 원리를 이해합니다. diffusers 설치와 Hugging Face 토큰 발급, CPU vs GPU 성능 비교를 거쳐 텍스트로 첫 PNG 이미지를 생성하고 저장하는 실습을 진행합니다.",
        "points": [
          "텍스트 인코딩→초기 노이즈→역확산 루프→VAE 디코딩 단계로 이미지 생성",
          "guidance_scale(CFG)이 높을수록 프롬프트 충실도↑, 낮을수록 다양성↑ (5~8 권장)",
          "use_safetensors=True와 torch.float16(fp16)으로 안전·고속 로드",
          "긍정/부정 프롬프트와 스타일 키워드로 효과적인 프롬프트를 작성"
        ]
      },
      {
        "no": "4.2",
        "title": "프롬프트 입력 → 이미지 생성 API",
        "summary": "Stable Diffusion 파이프라인을 FastAPI REST API로 감싸 프로덕션 수준의 이미지 생성 서버를 구축합니다. 싱글턴 PipelineManager로 모델을 스레드 안전하게 관리하고, base64·파일 URL 두 가지 반환 방식과 Streamlit 연동, fp16/xFormers 최적화를 다룹니다.",
        "points": [
          "PipelineManager 싱글턴+inference_lock으로 모델 재사용과 동시 추론 방지",
          "Pydantic으로 prompt·steps·guidance_scale·seed를 검증하고 OOM은 507로 응답",
          "base64는 단일 요청 완결, StreamingResponse·파일 URL은 대용량에 적합",
          "fp16·xFormers·attention slicing·torch.compile로 속도와 VRAM 최적화"
        ]
      },
      {
        "no": "4.3",
        "title": "ControlNet과 LoRA로 이미지 변환",
        "summary": "원본 UNet을 동결하고 조건 신호를 주입하는 ControlNet으로 구조·포즈·깊이를 정밀 제어합니다. Canny 엣지 추출로 윤곽을 보존하며 새 스타일을 생성하고, 저랭크 행렬만 학습하는 LoRA로 소형 파일 기반 스타일·캐릭터 전환을 실습합니다.",
        "points": [
          "ControlNet은 Canny·Pose·Depth 등 조건 입력으로 구조를 보존하며 생성",
          "cv2.Canny로 엣지 맵을 만들어 StableDiffusionControlNetPipeline에 입력",
          "controlnet_conditioning_scale(0.7~1.0)로 구조 보존 강도를 조절",
          "LoRA는 저랭크 행렬 A·B만 학습해 수십~수백 MB 파일로 스타일 배포"
        ]
      },
      {
        "no": "4.4",
        "title": "서버에서 모델 최적화하기",
        "summary": "이미지 생성 서버의 GPU 메모리 사용량을 줄이고 응답 속도를 높이는 기법을 집중적으로 다룹니다. fp16, xFormers, attention/vae slicing, torch.compile, CPU offload 등을 조합하여 제한된 자원에서도 안정적으로 서비스를 운영하는 방법을 학습합니다.",
        "points": [
          "fp16은 메모리를 절반으로 줄이고 속도를 1.5~2배 향상",
          "xFormers는 VRAM 20~30% 절감, attention slicing은 저사양 GPU용",
          "DDIM 20스텝으로 줄이면 품질 소폭 저하로 약 2.5배 속도 확보",
          "torch.compile은 첫 실행은 느리지만 반복 추론 시 속도를 개선"
        ]
      }
    ]
  },
  {
    "id": "ai-05",
    "track": "ai",
    "no": 5,
    "title": "오디오 인공지능 웹 프로젝트",
    "summary": "Whisper, Bark, SpeechT5 같은 최신 오디오 AI 모델을 FastAPI와 결합해 음성 인식, 음성 합성, 음성 챗봇 서비스를 직접 구현합니다. 음성을 텍스트로, 텍스트를 음성으로 바꾸는 전 과정을 실습하며 UploadFile, BackgroundTasks, StreamingResponse 등 FastAPI의 고급 기능까지 마스터합니다.",
    "duration": "약 3.5시간",
    "level": "실전",
    "tags": [
      "Whisper",
      "TTS",
      "음성챗봇",
      "FastAPI",
      "ASR"
    ],
    "sections": [
      {
        "no": "5.1",
        "title": "Whisper로 음성 인식 API 만들기",
        "summary": "OpenAI Whisper로 다국어 음성을 텍스트로 변환하는 ASR API를 구현합니다. 오디오 파일 업로드, WAV 변환, 추론, SRT 자막 생성까지 음성 인식 서비스의 전 과정을 다룹니다.",
        "points": [
          "Whisper 모델 크기별(tiny~large-v3) 특성과 CPU/GPU 환경에 맞는 선택 전략",
          "Hugging Face Pipeline 방식과 openai-whisper 패키지 방식을 모두 지원하는 ASR 서비스 설계",
          "ffmpeg, pydub, soundfile로 오디오를 16kHz 모노 WAV로 전처리하는 방법",
          "UploadFile + BackgroundTasks로 비동기 파일 처리 및 SRT 자막 자동 생성"
        ]
      },
      {
        "no": "5.2",
        "title": "텍스트를 음성으로 바꾸는 TTS API",
        "summary": "Suno Bark와 Microsoft SpeechT5 두 가지 엔진으로 텍스트를 자연스러운 음성으로 합성하는 API를 만듭니다. 음성 캐릭터, 감정 태그, 출력 형식을 자유롭게 조정합니다.",
        "points": [
          "고품질·감정 표현의 Bark vs 빠르고 안정적인 SpeechT5의 비교와 선택 기준",
          "음성 프리셋, 감정 태그([laughter] 등), temperature로 음성 스타일 제어",
          "StreamingResponse로 WAV/MP3 스트리밍 및 Base64 JSON 응답 동시 지원",
          "io.BytesIO와 pydub을 활용한 메모리 기반 오디오 포맷 변환"
        ]
      },
      {
        "no": "5.3",
        "title": "음성 챗봇 파이프라인 구축",
        "summary": "ASR, 챗봇, TTS 서비스를 하나의 파이프라인으로 연결해 완전한 음성 챗봇을 완성합니다. 사용자 음성을 받아 AI가 응답을 생성하고 다시 음성으로 돌려주는 흐름을 구현합니다.",
        "points": [
          "음성→텍스트→AI 응답→음성으로 이어지는 6단계 처리 흐름 설계",
          "DialoGPT 등 경량 텍스트 모델로 응답을 생성하고 폴백 규칙 기반 응답 구성",
          "ASR·챗봇·TTS 서비스를 통합 라우터로 연결하고 단계별 처리 시간 측정",
          "WAV 스트리밍과 텍스트+Base64 JSON 두 가지 응답 모드 제공"
        ]
      },
      {
        "no": "5.4",
        "title": "오디오 업로드와 FastAPI 고급 기능",
        "summary": "오디오 파일 유효성 검사, 임시 파일 관리, 비동기 I/O 등 안정적인 오디오 서비스 운영에 필요한 FastAPI 고급 기능을 다룹니다.",
        "points": [
          "지원 포맷·파일 크기 검증과 임시 파일 자동 정리 유틸리티 구성",
          "UploadFile 속성과 async/await 기반 파일 읽기 처리",
          "BackgroundTasks로 임시 파일을 백그라운드에서 안전하게 정리",
          "오디오 정보 추출(길이·샘플레이트·채널)과 실시간 처리 비율(realtime factor) 계산"
        ]
      },
      {
        "no": "5.5",
        "title": "통합 main.py 및 전체 서비스 실행",
        "summary": "음성 인식(Whisper)·음성 합성(TTS)·음성 챗봇·오디오 업로드 기능을 하나의 FastAPI 앱으로 통합합니다. lifespan으로 모델을 일괄 로드하고 CORS·예외 처리·라우터 등록을 구성해 전체 음성 AI 서비스를 실행합니다.",
        "points": [
          "lifespan으로 Whisper·TTS·챗봇 모델을 서버 시작 시 일괄 로드",
          "include_router로 ASR·TTS·voice-chat·upload 라우터 통합",
          "CORS 미들웨어·전역 예외 처리·.env 환경설정 구성",
          "uvicorn 기동 후 전체 음성 파이프라인 동작 점검"
        ]
      }
    ]
  },
  {
    "id": "ai-06",
    "track": "ai",
    "no": 6,
    "title": "컴퓨터 비전 웹 서비스",
    "summary": "Hugging Face와 YOLOv8을 활용해 이미지 분류, 객체 탐지, 이미지 캡셔닝 API를 차례로 구현합니다. 이미지 업로드부터 AI 추론, 결과 반환까지 전 과정을 경험하고, Jinja2 템플릿으로 세 서비스를 하나의 웹 UI로 통합해 완성합니다.",
    "duration": "약 3.5시간",
    "level": "실전",
    "tags": [
      "이미지분류",
      "YOLOv8",
      "BLIP",
      "객체탐지",
      "Jinja2"
    ],
    "sections": [
      {
        "no": "6.1",
        "title": "이미지 분류 모델로 웹 앱 만들기",
        "summary": "ResNet, ViT, ConvNeXt 등 이미지 분류 모델을 Hugging Face pipeline으로 래핑해 업로드 기반 분류 API를 구현합니다. 다양한 입력 방식과 모델 전환을 지원합니다.",
        "points": [
          "CNN에서 Vision Transformer까지 이미지 분류 모델 구조와 성능 비교",
          "pipeline('image-classification') 한 줄로 최신 모델을 즉시 활용",
          "파일 업로드·Base64·URL 세 가지 입력 방식과 Top-K 결과 반환 설계",
          "런타임 모델 전환과 추론 시간·신뢰도 점수 포함 응답 구성"
        ]
      },
      {
        "no": "6.2",
        "title": "YOLOv8로 객체 탐지 API 만들기",
        "summary": "ultralytics YOLOv8로 이미지 속 여러 객체의 위치와 종류를 동시에 예측하는 API를 구현합니다. 바운딩 박스가 그려진 시각화 이미지까지 반환합니다.",
        "points": [
          "1-Stage·2-Stage·Transformer 기반 탐지 방식과 YOLOv8 모델별 특성",
          "model.predict()로 바운딩 박스 좌표·클래스·신뢰도 추출",
          "Pillow ImageDraw로 박스와 라벨을 그린 시각화 이미지 생성",
          "JSON 결과 반환과 시각화 이미지 반환(Response/Base64) 두 엔드포인트 제공"
        ]
      },
      {
        "no": "6.3",
        "title": "BLIP으로 이미지 설명 생성기 만들기",
        "summary": "Salesforce BLIP 모델로 이미지 내용을 자연어 문장으로 설명하는 캡셔닝 API를 구현합니다. 이미지 질의응답(VQA) 기능까지 함께 다룹니다.",
        "points": [
          "Vision Encoder와 언어 모델이 결합된 멀티모달 캡셔닝 원리",
          "BlipProcessor와 BlipForConditionalGeneration 사용법",
          "조건부 텍스트와 beam search로 다양한 캡션을 생성하는 방법",
          "BlipForQuestionAnswering으로 이미지에 대한 질문에 답하는 VQA 구현"
        ]
      },
      {
        "no": "6.4",
        "title": "Jinja2로 통합 웹 UI 완성하기",
        "summary": "분류·탐지·캡셔닝 세 서비스를 Jinja2 템플릿과 StaticFiles로 하나의 웹 애플리케이션으로 통합합니다. 사용자가 브라우저에서 이미지를 올리고 결과를 시각적으로 확인합니다.",
        "points": [
          "Jinja2 템플릿 상속과 주요 문법으로 공통 레이아웃 구성",
          "StaticFiles 미들웨어로 CSS·JS 정적 파일 서빙",
          "lifespan으로 앱 시작 시 CV 모델들을 한 번에 로드",
          "fetch와 FormData로 비동기 업로드 및 결과 시각화 프런트엔드 구현"
        ]
      }
    ]
  },
  {
    "id": "ai-07",
    "track": "ai",
    "no": 7,
    "title": "멀티모달 프로젝트 따라하기",
    "summary": "텍스트와 이미지를 동시에 이해하는 멀티모달 AI를 FastAPI로 구현합니다. CLIP으로 이미지-텍스트 공동 임베딩과 시맨틱 검색을 만들고, LLaVA·moondream2로 이미지를 보고 답변하는 챗봇을 구축하며, 파일 업로드부터 자연어 응답까지의 통합 처리 흐름을 마스터합니다.",
    "duration": "약 4시간",
    "level": "실전",
    "tags": [
      "CLIP",
      "LLaVA",
      "멀티모달",
      "이미지검색",
      "VQA"
    ],
    "sections": [
      {
        "no": "7.1",
        "title": "CLIP으로 텍스트-이미지 임베딩과 검색",
        "summary": "CLIP으로 이미지와 텍스트를 같은 벡터 공간에 매핑하고 코사인 유사도로 시맨틱 이미지 검색을 구현합니다. Zero-shot 분류까지 실습합니다.",
        "points": [
          "대조 학습으로 이미지-텍스트를 공통 임베딩 공간에 정렬하는 CLIP 원리",
          "get_image_features·get_text_features로 임베딩 벡터 생성 및 L2 정규화",
          "코사인 유사도 기반 시맨틱 이미지 검색 클래스 구현",
          "텍스트 레이블만으로 분류하는 Zero-shot 전이 학습 활용"
        ]
      },
      {
        "no": "7.2",
        "title": "멀티모달 챗봇 만들기 (LLaVA & MiniGPT-4)",
        "summary": "비전 인코더를 LLM에 연결한 LLaVA, MiniGPT-4 같은 모델로 이미지를 보고 답변하는 챗봇을 구축합니다. 경량 모델과 양자화로 제한된 환경에서도 동작시킵니다.",
        "points": [
          "비전 인코더+MLP Projection+LLM으로 이어지는 LLaVA 처리 흐름",
          "apply_chat_template로 모델별 최적 프롬프트 형식 자동 적용",
          "moondream2 등 경량 모델과 Hugging Face Spaces 무료 GPU 활용",
          "bitsandbytes 4bit 양자화로 7B 모델을 5GB VRAM에서 실행"
        ]
      },
      {
        "no": "7.3",
        "title": "FastAPI 멀티모달 API 구성하기",
        "summary": "이미지와 텍스트를 함께 전송하는 멀티모달 REST API를 설계합니다. multipart, Base64, URL 세 가지 입력 방식을 모두 지원하는 라우터를 구현합니다.",
        "points": [
          "multipart/form-data·JSON+base64·URL 전송 방식별 장단점 비교",
          "UploadFile과 Form을 조합한 파일+폼 데이터 동시 처리와 주의점",
          "세 가지 입력 방식을 지원하는 멀티모달 엔드포인트 구현",
          "Pydantic 스키마로 요청·응답 구조와 입력 검증 정의"
        ]
      },
      {
        "no": "7.4",
        "title": "업로드와 프롬프트 통합 처리",
        "summary": "파일 업로드부터 전처리, 추론, 응답까지 통합 처리 파이프라인을 체계적으로 구성합니다. 메모리 처리와 임시 저장 전략을 비교하고 다양한 도구로 테스트합니다.",
        "points": [
          "입력 검증·이미지 전처리·텍스트 정규화·배치 조립 4단계 전처리 파이프라인",
          "RGBA→RGB 변환, 비율 유지 리사이즈와 패딩 처리",
          "메모리 처리 vs 임시 저장 파일 업로드 전략 비교",
          "Swagger UI·Postman·Streamlit으로 멀티모달 API 테스트"
        ]
      }
    ]
  },
  {
    "id": "ai-08",
    "track": "ai",
    "no": 8,
    "title": "배포와 운영",
    "summary": "개발한 FastAPI AI 서비스를 실제 운영 환경에 배포하고 안정적으로 운영하는 전 과정을 다룹니다. Uvicorn/Gunicorn 멀티 워커 구성부터 Docker 컨테이너화, AWS·Render 배포, Prometheus·Grafana 모니터링과 GitHub Actions 자동 배포까지 프로덕션 수준의 운영을 마스터합니다.",
    "duration": "약 4시간",
    "level": "실전",
    "tags": [
      "Docker",
      "Gunicorn",
      "AWS",
      "Nginx",
      "CI/CD"
    ],
    "sections": [
      {
        "no": "8.1",
        "title": "FastAPI 운영 환경: Uvicorn과 Gunicorn",
        "summary": "개발 환경과 운영 환경의 차이를 이해하고 Gunicorn + UvicornWorker로 멀티 워커 운영 서버를 구성합니다. 환경별 설정 분리와 최적화 전략을 다룹니다.",
        "points": [
          "개발 서버(uvicorn --reload)와 운영 서버의 차이 및 한계",
          "Gunicorn 프리포크 워커로 멀티 프로세스·자동 재시작·무중단 배포 구현",
          "Pydantic Settings와 .env로 개발/스테이징/운영 환경 설정 분리",
          "gunicorn.conf.py 설정 파일과 systemd 서비스 등록"
        ]
      },
      {
        "no": "8.2",
        "title": "Hugging Face Spaces vs 자체 서버",
        "summary": "Hugging Face Spaces 무료 배포와 자체 서버 운영을 비교하고 상황별 선택 기준을 익힙니다. Gradio/Streamlit 앱을 Spaces에 빠르게 올리는 법을 실습합니다.",
        "points": [
          "Spaces 무료/Pro/Enterprise 플랜과 자체 서버의 비용·확장성 비교",
          "huggingface_hub와 git push로 Space 생성 및 배포",
          "app.py·requirements.txt·README.md 메타데이터 헤더 작성법",
          "학습/데모용 Spaces vs 실서비스 자체 서버 선택 체크리스트"
        ]
      },
      {
        "no": "8.3",
        "title": "Docker로 API 감싸기",
        "summary": "Docker로 애플리케이션과 실행 환경을 컨테이너로 패키징해 어디서나 동일하게 실행되는 환경을 구성합니다. 모델 파일 처리 전략과 Docker Compose 통합 배포를 다룹니다.",
        "points": [
          "이미지·컨테이너·Dockerfile·볼륨 등 Docker 핵심 개념과 기본 명령어",
          "CUDA 베이스·비루트 사용자·헬스체크를 갖춘 운영 수준 Dockerfile 작성",
          "모델 포함·HF 다운로드·볼륨 마운트·S3 등 모델 파일 처리 전략 비교와 멀티스테이지 빌드",
          "docker-compose.yml로 FastAPI + Nginx + Prometheus + Grafana 통합 구성"
        ]
      },
      {
        "no": "8.4",
        "title": "AWS, Render 등 배포 실습",
        "summary": "AWS EC2 GPU 인스턴스에 Docker 이미지를 배포하고 Nginx 리버스 프록시로 HTTPS 서비스를 구성합니다. Render·Railway 저비용 대안과 GitHub 자동 배포도 다룹니다.",
        "points": [
          "EC2 GPU 인스턴스 타입·비용 비교와 AWS CLI 인스턴스 생성",
          "SSH 접속·Docker 설치·NVIDIA Container Toolkit 설정",
          "Nginx 리버스 프록시로 HTTPS 종료·Rate Limiting·보안 헤더 구성",
          "Render·Railway 저비용 배포와 토큰/모델 캐싱 이슈 처리"
        ]
      },
      {
        "no": "8.5",
        "title": "API 모니터링과 속도 최적화",
        "summary": "운영 중인 서비스의 요청/응답 로그를 남기고 응답 속도를 측정해 병목을 개선합니다. Prometheus, Grafana, Sentry로 실시간 모니터링 체계를 구축합니다.",
        "points": [
          "LoggingMiddleware로 요청/응답 로그를 구조화 JSON으로 기록",
          "Uvicorn/Gunicorn 로그 설정과 응답 속도 측정",
          "병목 분석 및 응답 속도 개선 전략",
          "Prometheus·Grafana·Sentry로 메트릭 수집과 실시간 대시보드 구성"
        ]
      }
    ]
  },
  {
    "id": "ops-01",
    "track": "ops",
    "no": 1,
    "title": "Git & GitHub 입문",
    "summary": "버전 관리의 개념부터 Git의 동작 원리, 브랜치와 병합, GitHub 협업, 좋은 커밋 습관과 오픈소스 라이선스, 그리고 실수 복구를 위한 고급 기능까지 한 번에 익히는 입문 가이드입니다. 명령어 암기보다 동작 원리 이해에 초점을 맞춰, 초보자가 혼자서도 Git을 실전에 쓸 수 있도록 구성했습니다.",
    "duration": "약 3시간",
    "level": "입문",
    "tags": [
      "Git",
      "GitHub",
      "버전관리",
      "브랜치",
      "Pull Request"
    ],
    "sections": [
      {
        "no": "1.1",
        "title": "버전 관리란?",
        "summary": "버전 관리는 파일의 변경 이력을 시간순으로 기록·추적하는 시스템입니다. 파일을 복사해 이름을 바꿔가며 관리하던 혼란을 끝내고, 이력 추적·협업·안전망이라는 세 가지 가치를 제공합니다.",
        "points": [
          "변경을 스냅샷으로 저장해 언제든 비교·복원 가능",
          "여러 사람이 충돌 없이 동시에 작업하는 협업 기반",
          "마음껏 실험하고 잘못되면 되돌리는 안전망 역할"
        ]
      },
      {
        "no": "1.2",
        "title": "Git vs GitHub",
        "summary": "Git은 내 컴퓨터에서 동작하는 버전 관리 도구이고, GitHub는 Git 저장소를 클라우드에 호스팅하며 협업을 돕는 플랫폼입니다. Git이 먼저이고 GitHub는 협업·공유가 필요할 때 더하는 선택입니다.",
        "points": [
          "Git = 로컬에서 도는 도구(엔진), GitHub = 클라우드 협업 플랫폼",
          "Git만으로도 버전 관리는 완전하게 동작",
          "GitHub는 코드 리뷰·이슈·PR 등 협업 기능 제공"
        ]
      },
      {
        "no": "1.3",
        "title": "Git의 3가지 영역과 첫 커밋",
        "summary": "변경은 작업 디렉터리 → 스테이징 영역 → 저장소 순으로 흐릅니다. git add로 스테이징, git commit으로 저장소에 기록하며, 스테이징 단계 덕분에 변경 일부만 골라 커밋할 수 있습니다.",
        "points": [
          "작업 디렉터리·스테이징 영역·저장소 3단계 흐름 이해",
          "git init → git add . → git commit -m 으로 첫 커밋 만들기",
          "git status로 상태를 자주 확인하고 user.name/email 초기 설정"
        ]
      },
      {
        "no": "1.4",
        "title": "브랜치와 병합",
        "summary": "브랜치는 메인 코드를 건드리지 않고 새 작업을 위한 평행 세계를 만드는 기능입니다. switch -c로 브랜치를 만들어 작업하고, merge로 결과를 메인에 합칩니다.",
        "points": [
          "git switch -c 로 새 브랜치 생성 및 전환",
          "git merge 로 브랜치 변경을 현재 브랜치에 병합",
          "git log --graph 로 브랜치 갈라짐·합쳐짐 시각화"
        ]
      },
      {
        "no": "1.5",
        "title": "병합 충돌 해결",
        "summary": "두 브랜치가 같은 부분을 다르게 고치면 병합 충돌이 발생합니다. 충돌은 오류가 아니라 정상적인 협업 과정이며, Git이 표시한 부분을 정리한 뒤 다시 커밋하면 됩니다.",
        "points": [
          "충돌 표시 <<<<<<< HEAD / ======= / >>>>>>> 의미 이해",
          "원하는 코드만 남기고 표시 줄을 모두 삭제",
          "정리 후 git add . && git commit, 취소는 git merge --abort"
        ]
      },
      {
        "no": "1.6",
        "title": "GitHub & 원격 저장소",
        "summary": "로컬 저장소를 GitHub 원격 저장소와 연결해 코드를 클라우드에 보관하고 공유합니다. 연결 별칭은 origin, 올릴 땐 push, 받을 땐 pull을 사용합니다.",
        "points": [
          "github.com 가입 → New repository(README·.gitignore) 생성",
          "git remote add origin <url> 로 원격 연결",
          "git push -u origin main / git pull / git clone 으로 동기화"
        ]
      },
      {
        "no": "1.7",
        "title": "GitHub 협업: Fork · Pull Request · Issue",
        "summary": "협업의 표준 흐름은 Fork → Branch → Push → Pull Request → Review & Merge 입니다. Fork로 원본을 복사하고, PR로 변경을 제안하며, Issue로 할 일을 기록하고 권한을 단계적으로 부여합니다.",
        "points": [
          "Fork로 남의 저장소를 내 계정에 복사 후 브랜치 작업",
          "Pull Request로 '합쳐 주세요' 제안 + 코드 리뷰 요청",
          "Issue로 버그·요청 기록, 권한은 Read → Write → Admin 단계"
        ]
      },
      {
        "no": "1.8",
        "title": "좋은 커밋 메시지와 오픈소스 라이선스",
        "summary": "커밋 메시지는 제목 50자 이내·명령형으로 '무엇을 왜'를 적고, 커밋 하나엔 논리적 변경 하나만 담습니다. 대표 라이선스 MIT·Apache 2.0·GPL의 차이를 이해하고 코드를 공개합니다.",
        "points": [
          "제목 50자 이내·명령형, 커밋 하나에 논리적 변경 하나",
          "MIT는 가장 자유, Apache 2.0은 특허 보호 조항 추가",
          "GPL은 카피레프트로 파생물도 같은 라이선스 공개 의무"
        ]
      },
      {
        "no": "1.9",
        "title": "고급 기능과 트러블슈팅",
        "summary": "stash·rebase·hooks·blame/bisect 같은 고급 기능으로 실무에 유연하게 대처합니다. 실수로 reset하거나 브랜치를 지워도 reflog가 거의 모든 기록을 갖고 있어 복구할 수 있습니다.",
        "points": [
          "git stash로 작업 임시 보관, git rebase로 이력 직선 정리(공유 브랜치 금지)",
          "git revert로 안전하게 커밋 되돌리기",
          "git reflog + git checkout 으로 잃어버린 커밋 되살리기"
        ]
      },
      {
        "no": "1.10",
        "title": "명령어 치트시트와 다음 단계",
        "summary": "시작·커밋·이력·브랜치·원격·되돌리기로 분류한 핵심 명령어를 한눈에 정리합니다. 매일 커밋하기, good first issue 해결, 공식 문서 활용으로 학습을 이어갑니다.",
        "points": [
          "용도별 치트시트로 자주 쓰는 명령 빠르게 참조",
          "작은 프로젝트를 GitHub에 올려 매일 커밋하는 습관",
          "오픈소스 good first issue 해결, 공식 문서·커뮤니티 활용"
        ]
      }
    ]
  },
  {
    "id": "ops-02",
    "track": "ops",
    "no": 2,
    "title": "AI 챗봇 배포 (FastAPI + Gradio)",
    "summary": "Hugging Face 오픈소스 모델(Qwen2.5)을 4-bit 양자화로 경량화하고, FastAPI 백엔드와 Gradio UI를 단일 포트에 통합한 AI 챗봇을 만듭니다. 로컬에서 구동·검증한 뒤 허깅페이스 스페이스에 Docker 방식으로 무료 배포하는 전 과정을 실습합니다.",
    "duration": "약 3시간",
    "level": "중급",
    "tags": [
      "FastAPI",
      "Gradio",
      "Hugging Face",
      "Spaces",
      "4-bit 양자화"
    ],
    "sections": [
      {
        "no": "1.1",
        "title": "개발 환경 구성",
        "summary": "Python 가상 환경을 만들어 의존성을 격리하고, 웹 서버·UI·AI 구동에 필요한 핵심 패키지를 설치합니다.",
        "points": [
          "python -m venv 로 가상 환경을 생성하고 OS별(Windows / macOS·Linux)로 활성화합니다.",
          "fastapi·uvicorn·gradio 로 웹 서버와 챗봇 UI 환경을 구성합니다.",
          "CUDA 12.1용 torch와 transformers·accelerate·bitsandbytes(4-bit 양자화)를 설치합니다."
        ]
      },
      {
        "no": "1.2",
        "title": "main.py 소스 코드 작성",
        "summary": "FastAPI 위에 Gradio를 마운트하여 단일 포트(8000)에서 API와 챗봇 화면이 함께 구동되는 애플리케이션을 작성합니다.",
        "points": [
          "BitsAndBytesConfig로 load_in_4bit·NF4 양자화를 설정해 일반 PC에서도 모델을 로드합니다.",
          "generate_response 함수에서 apply_chat_template·model.generate로 한국어 응답을 생성합니다.",
          "gr.mount_gradio_app으로 Gradio UI를 루트(/)에 마운트하고 /api/health 헬스체크를 추가합니다."
        ]
      },
      {
        "no": "1.3",
        "title": "로컬 서버 실행 및 접속",
        "summary": "uvicorn으로 FastAPI+Gradio 서버를 실행하고 브라우저 접속으로 챗봇 동작을 확인합니다.",
        "points": [
          "uvicorn main:app --host 0.0.0.0 --port 8000 명령으로 서버를 시작합니다.",
          "최초 실행 시 약 14GB 모델을 다운로드하므로 5~20분이 소요되고 이후엔 캐시에서 즉시 로드됩니다.",
          "localhost:8000에서 챗봇 UI를, /api/health에서 JSON 헬스체크 응답을 확인합니다."
        ]
      },
      {
        "no": "1.4",
        "title": "FastAPI + Gradio 허깅페이스 스페이스 배포",
        "summary": "main.py·requirements.txt·Dockerfile 3종 파일로 허깅페이스 스페이스에 Docker 방식으로 무료 배포합니다.",
        "points": [
          "requirements.txt와 7860 포트를 노출하는 Dockerfile을 작성합니다(레이어 캐시 활용).",
          "New Space 생성 시 SDK는 Gradio가 아닌 Docker, 하드웨어는 무료 CPU basic을 선택합니다.",
          "파일 업로드 후 자동 빌드가 Running이 되면 앱과 /docs(Swagger UI)를 확인합니다."
        ]
      }
    ]
  },
  {
    "id": "ops-03",
    "track": "ops",
    "no": 3,
    "title": "AWS EC2 · Docker · WinSCP 배포",
    "summary": "AWS EC2 인스턴스 생성부터 탄력적 IP 할당, SSH 접속, Docker 엔진 설치, docker-compose 기반 풀스택 서비스 실행까지 모든 AWS 배포의 공통 기반을 실습합니다. 이어 Windows용 GUI 도구 WinSCP로 같은 서버에 SFTP 접속하여 Docker를 설치하고 DockerHub 이미지로 서비스를 배포하는 방법을 다룹니다.",
    "duration": "약 3.5시간",
    "level": "중급",
    "tags": [
      "AWS EC2",
      "Docker",
      "docker-compose",
      "WinSCP",
      "SSH"
    ],
    "sections": [
      {
        "no": "2.1",
        "title": "EC2 인스턴스 생성",
        "summary": "AWS 콘솔에서 서울 리전에 Ubuntu 기반 EC2 인스턴스를 생성하고 키 페어와 보안 그룹을 설정합니다.",
        "points": [
          "AWS Management Console 로그인 후 리전을 '서울(ap-northeast-2)'로 확인하고 EC2 대시보드에서 인스턴스 시작",
          "AMI는 Ubuntu Server 22.04/24.04 LTS, 인스턴스 유형은 t2.micro(프리 티어) 또는 t3.small(AI 서비스) 선택",
          "키 페어는 RSA·.pem 형식으로 새로 생성하여 안전하게 보관(분실 시 재발급 불가)",
          "보안 그룹에서 SSH(22)·HTTP(80)·HTTPS(443) 포트 허용 체크"
        ]
      },
      {
        "no": "2.2",
        "title": "고정 IP(탄력적 IP) 할당",
        "summary": "재시작마다 바뀌는 공인 IP 문제를 해결하기 위해 탄력적 IP(Elastic IP)를 발급하여 인스턴스에 연결합니다.",
        "points": [
          "기본 EC2는 재시작 시 공인 IP가 바뀌므로 안정적 서비스 운영에 탄력적 IP 필요",
          "[네트워크 및 보안] → [탄력적 IP]에서 주소를 할당",
          "[작업] → [탄력적 IP 주소 연결]로 생성한 EC2 인스턴스의 프라이빗 IP에 연결",
          "할당된 탄력적 IP 주소를 메모하여 SSH 접속과 브라우저 접속에 사용"
        ]
      },
      {
        "no": "2.3",
        "title": "SSH를 통한 EC2 서버 접속",
        "summary": "다운로드한 .pem 키 페어로 macOS/Linux 및 Windows에서 EC2 서버에 원격 SSH 접속합니다.",
        "points": [
          "chmod 400으로 .pem 파일을 소유자 읽기 전용으로 제한(없으면 SSH가 접속 거부)",
          "ssh -i \"key.pem\" ubuntu@[탄력적_IP] 형식으로 접속, ubuntu는 Ubuntu AMI 기본 관리자 계정",
          "최초 접속 시 fingerprint 신뢰 여부에 yes 입력",
          "Windows 10 이상은 OpenSSH가 내장되어 동일한 ssh 명령으로 접속 가능"
        ]
      },
      {
        "no": "2.4",
        "title": "Docker 엔진 설치",
        "summary": "Docker 공식 저장소를 등록하고 Docker Engine과 Compose 플러그인을 설치하여 컨테이너 기반 환경을 구성합니다.",
        "points": [
          "apt 업데이트 후 apt-transport-https·ca-certificates·curl 등 필수 도구 설치",
          "Docker 공식 GPG 키 추가 및 아키텍처·코드명 자동 감지로 저장소 등록",
          "docker-ce·docker-ce-cli·containerd.io·docker-compose-plugin 설치",
          "usermod -aG docker $USER로 sudo 없이 docker 사용, 적용 위해 재접속 후 docker --version·docker compose version·docker ps로 확인"
        ]
      },
      {
        "no": "2.5",
        "title": "docker-compose.yml 작성 및 서비스 실행",
        "summary": "DockerHub 이미지를 사용해 db·backend·frontend 3개 서비스를 한 번에 실행하는 docker-compose.yml을 작성하고 배포합니다.",
        "points": [
          "nano로 작성: db(postgres:15, pgdata 볼륨), backend(DATABASE_URL·depends_on db), frontend(80:80 포트)",
          "your_docker_id를 본인 DockerHub 계정 ID로 변경, volumes로 DB 데이터 영속화",
          "docker compose up -d로 백그라운드 실행(이미지 없으면 DockerHub에서 자동 다운로드)",
          "docker compose ps로 모든 컨테이너 Up 확인 후 http://[탄력적_IP]로 서비스 접속"
        ]
      },
      {
        "no": "3.1",
        "title": "WinSCP 설치 및 EC2 접속",
        "summary": "GUI SFTP 클라이언트 WinSCP를 설치하고 .pem 키를 등록하여 EC2 서버에 SFTP로 접속합니다.",
        "points": [
          "winscp.net에서 무료 다운로드 후 설치, 프로토콜 SFTP·포트 22·사용자 ubuntu로 접속 설정",
          "호스트 이름에 AWS 탄력적 IP 입력, 비밀번호는 비우고 키 파일 사용",
          "[고급] → [SSH] → [인증]에서 개인 키 파일에 .pem 등록('모든 파일' 형식으로 선택)",
          ".ppk 변환 안내창에서 확인 후 세션 저장·로그인, 좌측=내 PC·우측=EC2 서버 파일 시스템 표시"
        ]
      },
      {
        "no": "3.2",
        "title": "WinSCP 터미널로 Docker 설치",
        "summary": "WinSCP 내장 터미널 또는 PuTTY를 열어 2.4와 동일한 명령으로 EC2 서버에 Docker를 설치합니다.",
        "points": [
          "상단 툴바 [터미널 열기](Ctrl+T) 또는 [PuTTY에서 열기](Ctrl+P)로 터미널 실행",
          "2.4와 동일한 Docker 설치 명령어 일괄 복사·붙여넣기 실행",
          "설치 후 반드시 WinSCP를 완전히 종료(X) 후 재실행하여 docker 그룹 권한을 새 세션에 적용",
          "재접속 후 docker ps가 오류 없이 빈 테이블을 출력하면 설치 완료"
        ]
      },
      {
        "no": "3.3",
        "title": "docker-compose.yml 파일 전송 및 배포",
        "summary": "로컬 PC에서 작성한 docker-compose.yml을 WinSCP 드래그 앤 드롭으로 EC2에 전송하고 서비스를 실행합니다.",
        "points": [
          "로컬 PC에서 db·backend·frontend 구성의 docker-compose.yml 작성",
          "WinSCP 좌측(내 PC) 파일을 우측 /home/ubuntu 경로로 드래그 앤 드롭하여 업로드",
          "터미널에서 ls -la로 전송 확인 후 docker compose up -d로 백그라운드 실행",
          "docker compose ps로 모든 컨테이너 Up 확인, http://[탄력적_IP]로 브라우저 접속 검증"
        ]
      }
    ]
  },
  {
    "id": "ops-04",
    "track": "ops",
    "no": 4,
    "title": "프레임워크별 AWS 배포 (HTML·Vue·Spring)",
    "summary": "순수 HTML5 정적 사이트, Vue.js SPA, Spring Boot 3 백엔드를 각각 AWS EC2에 직접 배포하는 방법을 다룹니다. Nginx 설치·파일 업로드부터 Vue Router 404 방지 설정, Java 21 설치와 .jar 실행, 리버스 프록시 구성까지 Docker 없는 네이티브 배포 전 과정을 실습합니다.",
    "duration": "약 4시간",
    "level": "실전",
    "tags": [
      "Nginx",
      "Vue.js",
      "Spring Boot",
      "Java 21",
      "리버스 프록시"
    ],
    "sections": [
      {
        "no": "4.1",
        "title": "EC2 서버에 Nginx 설치",
        "summary": "EC2에 접속하여 apt로 Nginx를 설치하고 /var/www/html 폴더의 소유권을 ubuntu 유저에게 부여해 업로드 권한을 확보합니다.",
        "points": [
          "sudo apt update 후 sudo apt install nginx -y로 Nginx 설치",
          "/var/www/html은 Nginx 기본 정적 파일 제공 디렉터리",
          "sudo chown -R ubuntu:ubuntu /var/www/html로 소유권 변경",
          "소유권을 바꾸지 않으면 WinSCP 업로드 시 권한 오류 발생"
        ]
      },
      {
        "no": "4.2",
        "title": "HTML 파일 업로드 (WinSCP)",
        "summary": "WinSCP GUI로 서버의 /var/www/html에 이동해 기본 환영 페이지를 삭제하고 로컬 HTML/CSS/JS 파일을 드래그 앤 드롭으로 업로드합니다.",
        "points": [
          "오른쪽 창에서 /var/www/html 경로로 이동",
          "index.nginx-debian.html 기본 환영 페이지 삭제",
          "index.html, css, js, images 등 모든 웹 파일을 드래그 앤 드롭 업로드",
          "http://[탄력적_IP_주소]로 접속해 배포 확인"
        ]
      },
      {
        "no": "5.1",
        "title": "Vue.js 프로젝트 빌드",
        "summary": "로컬 PC에서 npm run build로 Vue.js SPA를 최적화·압축된 정적 파일로 빌드하면 dist 폴더에 배포용 결과물이 생성됩니다.",
        "points": [
          "cd로 프로젝트 폴더 이동 후 npm run build 실행",
          "Vite/Webpack이 코드를 최적화·압축",
          "결과물은 dist/ 폴더에 index.html과 assets/ 형태로 생성",
          "dist 폴더 내부 파일 전체가 배포 대상"
        ]
      },
      {
        "no": "5.2",
        "title": "EC2 서버에 Nginx 설치 및 파일 업로드",
        "summary": "EC2에 Nginx를 설치하고 폴더 권한을 설정한 뒤, dist 폴더 자체가 아닌 그 내부의 index.html과 assets 폴더를 /var/www/html에 업로드합니다.",
        "points": [
          "apt로 Nginx 설치 및 /var/www/html 소유권 변경",
          "기존 index.nginx-debian.html 삭제",
          "dist 폴더 내부의 index.html과 assets만 선택 업로드",
          "dist 폴더 자체를 올리지 않도록 주의"
        ]
      },
      {
        "no": "5.3",
        "title": "Nginx Vue Router 설정 (404 에러 방지)",
        "summary": "Vue Router history 모드에서 새로고침 404를 막기 위해 default 설정의 try_files를 =404 대신 /index.html을 반환하도록 수정하고 Nginx를 재시작합니다.",
        "points": [
          "sudo nano /etc/nginx/sites-available/default로 설정 열기",
          "try_files $uri $uri/ =404 를 /index.html 로 변경",
          "없는 경로 요청 시 index.html을 반환해 Vue Router에 위임",
          "sudo systemctl restart nginx 후 F5 새로고침으로 검증"
        ]
      },
      {
        "no": "6.1",
        "title": "Spring Boot 프로젝트 빌드",
        "summary": "로컬에서 Gradle(./gradlew clean build -x test)로 Spring Boot 3 프로젝트를 빌드하면 build/libs/에 내장 Tomcat을 포함한 실행 가능한 .jar가 생성됩니다.",
        "points": [
          "./gradlew clean build -x test (Windows는 gradlew)로 빌드",
          "clean은 이전 결과물 삭제, build는 컴파일·패키징",
          "-x test로 단위 테스트를 건너뛰어 빌드 시간 단축",
          "plain이 붙지 않은 .jar가 실행 가능한 배포용 파일"
        ]
      },
      {
        "no": "6.2",
        "title": "EC2에 Java 21(Zulu OpenJDK) 설치",
        "summary": "Azul 공식 GPG 키와 APT 저장소를 등록하고 zulu21-jdk를 설치합니다. Spring Boot 3는 Java 17 이상이 필요하며 여기서는 Zulu OpenJDK 21을 사용합니다.",
        "points": [
          "gnupg, ca-certificates, curl 등 필수 패키지 설치",
          "curl로 Azul GPG 키를 받아 gpg --dearmor로 등록",
          "signed-by 옵션으로 Zulu APT 저장소를 zulu.list에 등록",
          "sudo apt install -y zulu21-jdk 후 java -version으로 확인"
        ]
      },
      {
        "no": "6.3",
        "title": ".jar 파일 업로드 및 실행",
        "summary": "WinSCP로 .jar를 EC2의 /home/ubuntu에 업로드한 뒤 nohup java -jar ... & 로 터미널 종료 후에도 유지되는 백그라운드 무중단 실행을 시작합니다.",
        "points": [
          "WinSCP로 build/libs의 .jar를 /home/ubuntu에 업로드",
          "nohup java -jar [파일명].jar & 로 백그라운드 실행",
          "nohup은 터미널 종료에도 프로세스 유지, &는 백그라운드 실행",
          "tail -f nohup.out으로 시작 로그 확인 (Ctrl+C로 종료)"
        ]
      },
      {
        "no": "6.4",
        "title": "Nginx 리버스 프록시 설정 (80 → 8080)",
        "summary": "Nginx default 설정에 proxy_pass와 proxy_set_header를 추가해 80번 포트 요청을 Spring Boot의 8080번으로 전달하여 포트 번호 없이 접속할 수 있게 합니다.",
        "points": [
          "proxy_pass http://localhost:8080으로 8080 포트로 전달",
          "X-Real-IP, X-Forwarded-For로 실제 클라이언트 IP 전달",
          "Host 헤더로 원본 호스트 정보 전달",
          "sudo systemctl restart nginx 후 포트 없이 접속 확인"
        ]
      }
    ]
  },
  {
    "id": "ops-05",
    "track": "ops",
    "no": 5,
    "title": "풀스택 통합 배포 (Spring·FastAPI·Vue·PostgreSQL)",
    "summary": "하나의 EC2에 PostgreSQL·Spring Boot·Vue+Nginx를 직접 설치하는 네이티브 배포부터, Docker 이미지를 DockerHub에 올려 docker-compose로 배포하는 컨테이너 방식, 그리고 백엔드를 FastAPI로 교체한 컨테이너 배포까지 세 시나리오를 실습한다. 세 방식 모두 Nginx가 80번 포트에서 화면(/)과 API(/api/)를 분기하는 통합 라우팅 구조를 공유한다.",
    "duration": "약 4.5시간",
    "level": "실전",
    "tags": [
      "Spring Boot",
      "FastAPI",
      "Vue.js",
      "PostgreSQL",
      "Docker",
      "Nginx"
    ],
    "sections": [
      {
        "no": "7.1",
        "title": "전체 아키텍처",
        "summary": "Docker 없이 한 대의 EC2에 DB·백엔드·프론트를 직접 설치하는 네이티브 배포의 트래픽 흐름을 설명한다.",
        "points": [
          "Nginx가 80번 포트에서 모든 요청을 받는 단일 진입점",
          "/ 요청은 /var/www/html의 Vue.js 정적 파일로 서빙",
          "/api/ 요청은 localhost:8080의 Spring Boot로 리버스 프록시",
          "모든 구성 요소가 localhost(같은 서버)에서 동작"
        ]
      },
      {
        "no": "7.2",
        "title": "로컬 빌드",
        "summary": "배포 전 로컬에서 Spring Boot와 Vue.js를 각각 빌드하고 DB 주소를 localhost로 설정한다.",
        "points": [
          "application.yml의 datasource url을 jdbc:postgresql://localhost:5432/mydb로 지정",
          "./gradlew clean build -x test 로 테스트 제외 빌드 → build/libs/*-SNAPSHOT.jar 생성",
          "Vue는 npm run build 로 dist/ 정적 산출물 생성",
          "프론트의 API 호출 경로가 /api/... 형태인지 사전 확인"
        ]
      },
      {
        "no": "7.3",
        "title": "EC2 서버 환경 구축",
        "summary": "EC2에 Nginx, PostgreSQL, Zulu Java 21을 한 번에 설치한다.",
        "points": [
          "apt update && upgrade 로 패키지 최신화",
          "nginx, postgresql, postgresql-contrib 설치",
          "Azul 저장소 키 등록 후 zulu21-jdk 설치",
          "gpg --dearmor 와 signed-by 로 저장소 서명 검증"
        ]
      },
      {
        "no": "7.4",
        "title": "PostgreSQL DB 및 사용자 생성",
        "summary": "psql 콘솔에서 Spring Boot가 사용할 데이터베이스와 사용자를 생성한다.",
        "points": [
          "sudo -u postgres psql 로 관리자 콘솔 진입",
          "CREATE DATABASE mydb 로 DB 생성",
          "CREATE USER ... WITH ENCRYPTED PASSWORD 로 사용자 생성",
          "GRANT ALL PRIVILEGES 로 권한 부여, 각 문장 끝 세미콜론 필수"
        ]
      },
      {
        "no": "7.5",
        "title": "파일 업로드 및 서비스 실행",
        "summary": "WinSCP로 빌드 산출물을 업로드하고 nohup으로 Spring Boot를 실행한다.",
        "points": [
          "chown -R ubuntu:ubuntu /var/www/html 로 업로드 권한 확보",
          "Vue dist 파일은 /var/www/html, jar는 /home/ubuntu/spring_app에 업로드",
          "nohup java -jar ...jar & 로 백그라운드 실행",
          "tail -f nohup.out 으로 기동·DB 연결 로그 확인"
        ]
      },
      {
        "no": "7.6",
        "title": "Nginx 통합 라우팅 설정",
        "summary": "Nginx가 Vue 화면과 Spring Boot API를 한 설정 파일에서 분기하도록 구성한다.",
        "points": [
          "location / 에서 root /var/www/html + try_files 로 SPA 새로고침 404 방지",
          "location /api/ 에서 proxy_pass http://localhost:8080 으로 백엔드 전달",
          "X-Real-IP, X-Forwarded-For, Host 헤더 전달 설정",
          "systemctl restart nginx 로 설정 적용"
        ]
      },
      {
        "no": "8.1",
        "title": "Dockerfile 작성 및 DockerHub Push",
        "summary": "Spring Boot와 Vue.js 각각의 Dockerfile을 작성하고 이미지를 DockerHub에 업로드한다.",
        "points": [
          "Spring Boot: azul/zulu-openjdk:21 베이스에 jar 복사 후 java -jar 실행",
          "Vue: Node 18 빌드 단계 + Nginx Alpine 서빙 단계의 멀티 스테이지 빌드",
          "최종 이미지에 Node 환경 미포함으로 용량 절감",
          "docker build -t 후 docker push 로 DockerHub 업로드"
        ]
      },
      {
        "no": "8.2",
        "title": "EC2 배포용 docker-compose.yml",
        "summary": "DockerHub 이미지를 사용하는 db·backend·frontend 3-서비스 compose를 작성·배포한다.",
        "points": [
          "postgres:15 + pgdata 볼륨으로 데이터 영구 보존",
          "backend는 SPRING_DATASOURCE_URL 환경변수로 db:5432 접속",
          "frontend는 80:80 포트 매핑으로 외부 진입점 제공",
          "컨테이너 간 통신은 서비스명(db, backend)을 호스트명처럼 사용"
        ]
      },
      {
        "no": "9.1",
        "title": "FastAPI 배포 준비 및 Dockerfile",
        "summary": "FastAPI 의존성을 requirements.txt로 추출하고 Python 3.12 슬림 Dockerfile을 작성한다.",
        "points": [
          "pip freeze > requirements.txt 로 의존성 고정",
          "python:3.12-slim 베이스, requirements 먼저 복사로 레이어 캐시 최적화",
          "pip install --no-cache-dir 로 이미지 용량 절감",
          "uvicorn main:app --host 0.0.0.0 --port 8000 으로 구동"
        ]
      },
      {
        "no": "9.2",
        "title": "Vue.js Dockerfile (FastAPI 연동)",
        "summary": "로컬 dist를 복사하고 /api/를 FastAPI(8000)로 프록시하는 Nginx Dockerfile을 작성한다.",
        "points": [
          "nginx:alpine에 미리 빌드한 dist 폴더 COPY",
          "proxy_pass 대상이 backend:8000 (Spring 8080과 다름)",
          "try_files 로 SPA 라우팅 404 방지",
          "npm run build 산출물(dist)이 사전 존재해야 함"
        ]
      },
      {
        "no": "9.3",
        "title": "EC2 배포용 docker-compose.yml",
        "summary": "FastAPI 백엔드 기반 풀스택을 EC2에서 실행하는 compose를 작성하고 8장과 비교한다.",
        "points": [
          "backend 이미지는 fastapi-backend:v1, 포트 8000",
          "DB 접속은 단일 DATABASE_URL 환경변수(postgresql://...@db:5432/mydb)",
          "db·frontend 구성은 8장과 동일, depends_on으로 기동 순서 보장",
          "docker compose up -d / ps 로 실행 및 상태 확인"
        ]
      }
    ]
  },
  {
    "id": "ops-06",
    "track": "ops",
    "no": 6,
    "title": "도커 기반 MSA 통합 배포",
    "summary": "FastAPI+Vue+PostgreSQL 풀스택을 EC2 네이티브로 배포하는 기초부터 모노레포 Docker Compose·DockerHub 파이프라인까지 다룹니다. 마지막으로 Spring Boot(비즈니스)와 FastAPI(AI 추론)를 분리한 4중 컨테이너 MSA를 Nginx 경로 라우팅과 함께 네이티브/Docker 두 방식으로 완성합니다.",
    "duration": "약 4시간",
    "level": "실전",
    "tags": [
      "MSA",
      "Docker",
      "docker-compose",
      "DockerHub",
      "Nginx",
      "FastAPI"
    ],
    "sections": [
      {
        "no": "10.1",
        "title": "로컬 준비",
        "summary": "배포 전 로컬에서 FastAPI와 Vue.js를 준비합니다.",
        "points": [
          "pip freeze로 requirements.txt를 추출해 서버에서 환경 재현",
          "DB 접속 주소를 코드에 박지 않고 os.getenv로 환경 변수에서 읽기",
          "npm run build로 Vue.js를 dist 정적 파일로 빌드"
        ]
      },
      {
        "no": "10.2",
        "title": "EC2 환경 구축",
        "summary": "EC2에 Nginx, PostgreSQL, Python 가상 환경을 설치하고 DB를 생성합니다.",
        "points": [
          "apt로 nginx, postgresql, python3-pip/venv 설치",
          "sudo -u postgres psql로 콘솔 접속",
          "CREATE DATABASE/USER, GRANT로 전용 DB와 계정 생성"
        ]
      },
      {
        "no": "10.3",
        "title": "파일 업로드 및 FastAPI 실행",
        "summary": "WinSCP로 파일을 올리고 가상 환경에서 FastAPI를 무중단 실행합니다.",
        "points": [
          "chown으로 웹 루트 소유권 변경, FastAPI 전용 폴더 생성",
          "Vue dist는 /var/www/html, FastAPI 소스는 fastapi_app으로 업로드(venv 제외)",
          "venv 활성화 후 nohup uvicorn --host 127.0.0.1 --port 8000으로 백그라운드 실행"
        ]
      },
      {
        "no": "10.4",
        "title": "Nginx 통합 라우팅 설정",
        "summary": "Nginx가 80포트 요청을 화면(/)과 API(/api/)로 분기합니다.",
        "points": [
          "location /은 try_files로 SPA 새로고침 404 방지",
          "location /api/는 127.0.0.1:8000 FastAPI로 proxy_pass",
          "X-Real-IP, X-Forwarded-For, Host 헤더 전달 후 nginx 재시작"
        ]
      },
      {
        "no": "11.1",
        "title": "프로젝트 구조",
        "summary": "FastAPI/Vue를 하나의 모노레포로 구성합니다.",
        "points": [
          "backend(FastAPI)와 frontend(Vue) 폴더 분리",
          "각 폴더에 Dockerfile 배치",
          "최상위 docker-compose.yml이 전체 서비스를 오케스트레이션"
        ]
      },
      {
        "no": "11.2",
        "title": "백엔드 예시 코드",
        "summary": "PostgreSQL과 연동하는 FastAPI 상태 점검 엔드포인트를 작성합니다.",
        "points": [
          "requirements.txt: fastapi, uvicorn, sqlalchemy, psycopg2-binary",
          "DATABASE_URL을 환경 변수로 받아 create_engine 생성",
          "/api/status에서 SELECT 1로 DB 연결 정상 여부 확인"
        ]
      },
      {
        "no": "11.3",
        "title": "프론트엔드 예시 코드",
        "summary": "백엔드를 상대 경로로 호출하는 Vue 컴포넌트를 작성합니다.",
        "points": [
          "fetch('/api/status')처럼 백엔드 주소 대신 상대 경로 사용",
          "Nginx가 /api/ 경로를 백엔드 컨테이너로 전달",
          "백엔드 주소 변경 시 프론트 코드 수정 불필요로 유지보수 용이"
        ]
      },
      {
        "no": "11.4",
        "title": "로컬 테스트 및 DockerHub 배포",
        "summary": "docker compose로 전체를 테스트하고 이미지를 DockerHub에 Push합니다.",
        "points": [
          "db/backend/frontend 3서비스와 pgdata 볼륨 정의",
          "컨테이너 간 통신은 서비스명(db)을 호스트로 사용",
          "docker build/push로 백엔드·프론트엔드 이미지를 DockerHub 업로드"
        ]
      },
      {
        "no": "12.1",
        "title": "전체 MSA 아키텍처",
        "summary": "Spring Boot와 FastAPI 이중 백엔드의 트래픽 흐름을 설명합니다.",
        "points": [
          "/ → Vue 화면, /api/ → Spring Boot(8080), /ai/ → FastAPI(8000)",
          "Spring Boot가 일반 비즈니스, FastAPI가 AI 추론 담당",
          "두 백엔드 모두 PostgreSQL(5432)과 통신"
        ]
      },
      {
        "no": "12.2",
        "title": "네이티브 배포 (Docker 미사용)",
        "summary": "EC2에 모든 서비스를 직접 설치·실행하고 Nginx로 분기합니다.",
        "points": [
          "Spring Boot(gradlew), FastAPI(pip freeze), Vue(npm build) 로컬 준비",
          "Azul Zulu 저장소로 Java 21 설치, PostgreSQL DB 생성",
          "nohup java -jar(8080) + nohup uvicorn(8000) 실행 후 /api/·/ai/ Nginx 라우팅"
        ]
      },
      {
        "no": "12.3",
        "title": "Docker 기반 MSA 배포 (DockerHub 활용)",
        "summary": "4개 컨테이너로 구성된 MSA를 DockerHub와 Compose로 배포합니다.",
        "points": [
          "Spring Boot/FastAPI/Vue 각각 Dockerfile 작성 후 build·push",
          "Vue Dockerfile에 /api/→spring-backend, /ai/→fastapi-backend 이중 프록시",
          "docker compose up -d로 db·spring·fastapi·frontend 4컨테이너 동시 기동"
        ]
      }
    ]
  }
];

export const TRACKS = {
  react: { id:"react", label:"React 프론트엔드", en:"Frontend", color:"#1A45D8", desc:"JSX부터 상태관리·인증·배포까지, 실무형 React 19 풀코스" },
  ai: { id:"ai", label:"AI 웹 서비스", en:"AI Web Service", color:"#F15A0C", desc:"FastAPI와 Hugging Face로 생성형 AI를 웹 서비스로 구현" }
,
  ops: { id:"ops", label:"실전 배포·협업", en:"Deploy & Collab", color:"#0E9F6E", desc:"Git·GitHub 협업부터 FastAPI·Spring·Vue를 AWS·Docker로 배포하기까지" }
};

export const getChapter = (id) => CHAPTERS.find(c => c.id === id);
export const byTrack = (t) => CHAPTERS.filter(c => c.track === t);

// 합계(표기 일관성용)
export const TOTAL_CHAPTERS = CHAPTERS.length;
export const TOTAL_LESSONS = CHAPTERS.reduce((n, c) => n + c.sections.length, 0);
