// 자동 생성: 챕터 본문에서 추출한 핵심 용어 + 퀴즈 (react·ai·ops 22개 챕터)
export const QUIZZES = {
  "react-01": [
    {
      "q": "JSX에서 HTML의 class와 for 속성은 각각 무엇으로 작성해야 하는가?",
      "options": [
        "className, htmlFor",
        "class, htmlFor",
        "className, for",
        "cssClass, labelFor"
      ],
      "answer": 0,
      "explain": "class와 for는 JavaScript 예약어와 충돌하므로 JSX에서는 className과 htmlFor로 작성한다."
    },
    {
      "q": "Babel의 클래식 변환에서 JSX <h1 className=\"title\">Hello</h1>는 어떤 형태로 변환되는가?",
      "options": [
        "document.createElement(\"h1\")",
        "React.createElement(\"h1\", { className: \"title\" }, \"Hello\")",
        "new Element(\"h1\")",
        "jsx(\"h1\")만 호출하며 props는 없음"
      ],
      "answer": 1,
      "explain": "클래식 변환은 React.createElement(태그명, props객체, 자식들) 형태의 함수 호출로 JSX를 바꾼다."
    },
    {
      "q": "React 18 이후 권장되는 루트 렌더링 방식은 무엇인가?",
      "options": [
        "ReactDOM.render(<App/>, node)",
        "ReactDOM.hydrate()",
        "createRoot(node).render(<App/>)",
        "React.mount(<App/>)"
      ],
      "answer": 2,
      "explain": "React 18부터 createRoot로 루트를 만들고 root.render()를 호출하는 방식이 표준이며, 레거시 ReactDOM.render는 React 19에서 제거된다."
    },
    {
      "q": "여러 형제 요소를 DOM에 추가 노드 없이 감싸면서 key를 부여해야 할 때 사용하는 것은?",
      "options": [
        "<div key={...}>",
        "<> ... </> 축약형",
        "<React.Fragment key={...}>",
        "<span key={...}>"
      ],
      "answer": 2,
      "explain": "축약형 <>...</>는 key를 받을 수 없으므로, key가 필요하면 정식 <React.Fragment key={...}>를 사용해야 한다."
    },
    {
      "q": "React의 Diffing 알고리즘에서 비교 중 요소의 타입(type)이 서로 다를 경우 어떻게 처리되는가?",
      "options": [
        "속성만 갱신하여 노드를 재사용한다",
        "기존 서브트리를 언마운트하고 새로 마운트한다",
        "변경을 무시하고 건너뛴다",
        "key를 자동 생성해 병합한다"
      ],
      "answer": 1,
      "explain": "타입이 같으면 속성만 갱신해 재사용하지만, 타입이 다르면 해당 서브트리를 완전히 제거하고 새로 생성하므로 상태가 손실될 수 있다."
    }
  ],
  "react-02": [
    {
      "q": "Props에 대한 설명으로 옳은 것은?",
      "options": [
        "자식 컴포넌트에서 직접 수정할 수 있다",
        "부모가 자식에게 전달하는 읽기 전용 데이터이다",
        "오직 문자열만 전달할 수 있다",
        "양방향으로 자유롭게 흐른다"
      ],
      "answer": 1,
      "explain": "Props는 부모가 자식에게 전달하는 읽기 전용 데이터이며 단방향(상위→하위)으로 흐른다."
    },
    {
      "q": "자식 컴포넌트가 부모의 값을 변경해야 할 때 권장되는 패턴은?",
      "options": [
        "자식이 props를 직접 수정한다",
        "부모가 상태를 소유하고 value와 onChange를 props로 내려준다(상태 끌어올리기)",
        "자식이 별도 전역 변수를 만든다",
        "props를 const에서 let으로 바꾼다"
      ],
      "answer": 1,
      "explain": "Lifting State Up 패턴에서 부모가 상태를 소유하고 value와 변경 콜백(onChange)을 props로 전달해 자식이 변경을 요청하게 한다."
    },
    {
      "q": "함수형 컴포넌트에서 useState(0)이 반환하는 것은?",
      "options": [
        "상태값 하나만 반환한다",
        "[상태값, 상태변경함수] 형태의 배열을 반환한다",
        "setter 함수만 반환한다",
        "this.state 객체를 반환한다"
      ],
      "answer": 1,
      "explain": "useState(초기값)은 [state값, setState함수] 배열을 반환하며, setter를 호출하면 컴포넌트가 재렌더링된다."
    },
    {
      "q": "배열 state에 새 항목을 추가할 때 불변성을 지키는 올바른 방법은?",
      "options": [
        "items.push(newItem)으로 직접 추가",
        "setItems(prev => [...prev, newItem])",
        "items[items.length] = newItem",
        "items = items.concat(newItem)"
      ],
      "answer": 1,
      "explain": "기존 배열을 직접 수정하지 않고 스프레드(...)로 복사한 새 배열을 setter에 전달해야 불변성이 유지된다."
    },
    {
      "q": "Props와 State를 비교한 설명으로 옳은 것은?",
      "options": [
        "Props는 자기 자신이 관리하고 State는 부모가 관리한다",
        "둘 다 읽기 전용이다",
        "Props는 부모가 관리하는 읽기 전용, State는 컴포넌트 내부에서 변경 가능하다",
        "State는 데이터 전달용, Props는 UI 동적 변화용이다"
      ],
      "answer": 2,
      "explain": "Props는 부모가 관리하는 읽기 전용 데이터이고, State는 컴포넌트 자신이 내부에서 변경 가능한 데이터이다."
    }
  ],
  "react-03": [
    {
      "q": "디자인 토큰(design-tokens.json)을 사용하는 주된 목적은 무엇인가?",
      "options": [
        "색상·폰트·spacing 값을 변수화해 디자인과 코드 간 싱크를 유지하기 위해",
        "JavaScript 번들 크기를 줄이기 위해",
        "브라우저 호환성 문제를 해결하기 위해",
        "서버 렌더링 속도를 높이기 위해"
      ],
      "answer": 0,
      "explain": "디자인 토큰은 색상·폰트·spacing 등을 변수화해 디자인과 코드의 일관성과 싱크를 유지하는 단일 출처 역할을 한다."
    },
    {
      "q": "styled-components와 CSS Modules의 혼합 전략에 대한 본문의 권장으로 옳은 것은?",
      "options": [
        "동적 스타일은 styled-components, 대형 정적 레이아웃·리스트는 CSS Modules로 사용한다",
        "모든 스타일을 styled-components로만 작성한다",
        "동적 스타일에 CSS Modules, 정적 스타일에 styled-components를 쓴다",
        "두 방식은 함께 쓸 수 없으므로 하나만 선택한다"
      ],
      "answer": 0,
      "explain": "본문은 props 기반 동적 스타일은 styled-components, 런타임 비용이 적은 정적 레이아웃·대형 리스트는 CSS Modules로 혼합 사용할 것을 권장한다."
    },
    {
      "q": "TextInput 예제에서 오류 메시지를 검증하기 전에 touched 상태를 사용하는 이유는?",
      "options": [
        "사용자가 입력란을 건드리기 전에는 오류를 표시하지 않기 위해",
        "입력값을 서버로 전송하기 위해",
        "포커스 링을 그리기 위해",
        "다크모드 색상을 적용하기 위해"
      ],
      "answer": 0,
      "explain": "touched가 false면 검증을 건너뛰어, 빈 화면에서 사용자가 아직 건드리지 않은 입력란에 오류가 뜨지 않게 한다."
    },
    {
      "q": "버튼 컴포넌트에서 loading 상태일 때 aria-busy 속성을 부여하는 이유로 가장 적절한 것은?",
      "options": [
        "스크린리더가 진행(로딩) 상태를 인지할 수 있게 하기 위해",
        "버튼의 배경색을 바꾸기 위해",
        "클릭 이벤트를 중복 등록하기 위해",
        "CSS 모듈 클래스를 생성하기 위해"
      ],
      "answer": 0,
      "explain": "aria-busy=true는 로딩 진행 상태를 보조기술에 노출해 스크린리더 사용자가 처리 중임을 알 수 있게 한다."
    },
    {
      "q": "CSS Module을 import한 styles 객체의 특징으로 옳은 것은?",
      "options": [
        "클래스명이 고유 해시로 변환되어 전역 클래스 충돌을 방지한다",
        "런타임에 매번 새 클래스를 생성해 성능 비용이 크다",
        "props에 따라 자동으로 스타일이 바뀐다",
        "ThemeProvider 없이는 동작하지 않는다"
      ],
      "answer": 0,
      "explain": "CSS Modules는 클래스명을 고유 이름(해시)으로 변환해 컴포넌트 단위로 캡슐화하므로 클래스 충돌을 막는다."
    }
  ],
  "react-04": [
    {
      "q": "React에서 input의 onChange가 호출되는 시점에 대한 설명으로 옳은 것은?",
      "options": [
        "사용자가 값을 입력할 때마다(input 이벤트처럼) 호출된다",
        "입력 후 포커스를 잃을 때만 호출된다",
        "폼이 제출될 때만 호출된다",
        "브라우저 change 이벤트와 정확히 일대일로 대응한다"
      ],
      "answer": 0,
      "explain": "React의 onChange는 브라우저 change와 일대일이 아니라 값이 입력될 때마다 호출되는 React 고유의 의미를 가진다."
    },
    {
      "q": "useEffect의 의존성 배열을 빈 배열 []로 지정하면 effect는 언제 실행되는가?",
      "options": [
        "컴포넌트 마운트 시 1회만 실행된다",
        "매 렌더링마다 실행된다",
        "특정 상태가 바뀔 때마다 실행된다",
        "언마운트 시에만 실행된다"
      ],
      "answer": 0,
      "explain": "빈 배열[]은 클래스의 componentDidMount처럼 마운트 시 1회만 effect를 실행한다."
    },
    {
      "q": "JSX에서 onClick={handleDelete(id)}처럼 작성하면 발생하는 문제는?",
      "options": [
        "렌더링 시 함수가 즉시 실행되어 버린다",
        "id가 핸들러에 전달되지 않는다",
        "이벤트 객체에 접근할 수 없다",
        "클릭해야만 함수가 한 번 실행된다"
      ],
      "answer": 0,
      "explain": "handleDelete(id)는 참조가 아니라 호출이므로 렌더링 시점에 즉시 실행된다. 클릭 시 실행하려면 () => handleDelete(id)로 감싸야 한다."
    },
    {
      "q": "ThemeContext 예제에서 useContext(ThemeContext)가 반환하는 값은 무엇인가?",
      "options": [
        "가장 가까운 Provider가 value로 전달한 객체",
        "createContext에 넘긴 컴포넌트 이름",
        "항상 기본값 \"light\" 문자열",
        "Provider 컴포넌트 자체"
      ],
      "answer": 0,
      "explain": "useContext는 트리에서 가장 가까운 Provider가 value로 공급한 값을 읽어 온다."
    },
    {
      "q": "디바운스를 구현한 useEffect에서 return () => clearTimeout(id)의 역할은?",
      "options": [
        "값이 바뀌어 effect가 다시 실행되기 전 이전 타이머를 취소해 마지막 입력만 처리한다",
        "타이머를 두 배로 늘려 지연 시간을 연장한다",
        "컴포넌트를 강제로 재렌더링한다",
        "API 요청을 즉시 실행한다"
      ],
      "answer": 0,
      "explain": "정리 함수가 이전 타이머를 취소하므로 입력이 계속되는 동안 예약된 작업이 누적되지 않고 마지막 입력에 대해서만 실행된다."
    }
  ],
  "react-05": [
    {
      "q": "fetch로 API를 호출할 때, HTTP 상태 코드가 404나 500인 응답을 에러로 처리하려면 어떻게 해야 하는가?",
      "options": [
        "fetch는 자동으로 reject되므로 별도 처리가 필요 없다",
        "response.ok를 직접 검사해 false면 에러를 던진다",
        "response.data를 확인한다",
        "catch 블록만 작성하면 자동으로 잡힌다"
      ],
      "answer": 1,
      "explain": "fetch는 HTTP 에러 상태에도 reject하지 않으므로 response.ok를 직접 확인해 에러를 던져야 한다."
    },
    {
      "q": "axios가 fetch와 비교해 제공하는 특징으로 옳은 것은?",
      "options": [
        "응답을 자동으로 response.data에 파싱해 준다",
        "브라우저 내장이라 설치가 필요 없다",
        "response.ok 검사를 반드시 해야 한다",
        "취소 기능을 전혀 제공하지 않는다"
      ],
      "answer": 0,
      "explain": "axios는 파싱된 JSON을 response.data로 자동 반환하며, 인터셉터·baseURL·timeout 등 고급 기능을 제공한다."
    },
    {
      "q": "useApi 훅에서 cancelled(또는 cancel) 플래그를 두고 클린업에서 true로 바꾸는 이유는?",
      "options": [
        "API 응답 속도를 빠르게 하기 위해",
        "컴포넌트 언마운트 후 setState 호출을 방지하기 위해",
        "에러 메시지를 한국어로 바꾸기 위해",
        "localStorage에 자동 저장하기 위해"
      ],
      "answer": 1,
      "explain": "언마운트된 컴포넌트에서 then/catch가 setState를 호출하면 메모리 누수·경고가 생기므로 플래그로 막는다."
    },
    {
      "q": "Todo 앱에서 특정 항목의 완료 여부를 토글할 때 불변성을 지키는 올바른 방법은?",
      "options": [
        "todos[index].completed = !todos[index].completed로 직접 수정",
        "todos.map으로 새 배열을 만들고 해당 항목만 {...todo, completed: !todo.completed}로 교체",
        "todos.push로 새 항목을 추가",
        "delete todos[index]로 항목 제거"
      ],
      "answer": 1,
      "explain": "React는 배열을 직접 수정하지 않고 map으로 새 배열을 만들어 해당 항목만 새 객체로 교체해 불변성을 지킨다."
    },
    {
      "q": "ex03 실습에서 로그인 성공 후 인증 상태를 유지하고 새로고침해도 로그인이 풀리지 않게 하는 핵심 동작은?",
      "options": [
        "토큰을 컴포넌트의 일반 변수에 저장한다",
        "발급된 토큰을 localStorage에 저장하고 AuthContext가 이를 읽어 상태를 복원한다",
        "매 렌더링마다 로그인 API를 다시 호출한다",
        "토큰을 URL 쿼리스트링에만 보관한다"
      ],
      "answer": 1,
      "explain": "토큰을 localStorage에 저장하고 AuthProvider가 지연 초기화로 이를 읽어 사용자 상태를 복원하므로 새로고침 후에도 로그인이 유지된다."
    }
  ],
  "react-06": [
    {
      "q": "도메인 중심 폴더 설계의 핵심 아이디어로 옳은 것은?",
      "options": [
        "components·hooks·styles 같은 관심사(레이어)별로 모든 파일을 모은다",
        "user·product·order 같은 비즈니스 도메인 단위로 파일과 폴더를 그룹화한다",
        "모든 코드를 단일 파일에 작성한다",
        "페이지(화면) 단위로만 코드를 나눈다"
      ],
      "answer": 1,
      "explain": "도메인 중심 구조는 관심사가 아닌 비즈니스 도메인 단위로 그룹화해 관련 코드의 응집도를 높인다."
    },
    {
      "q": "Container vs Presentational 패턴에서 Presentational 컴포넌트의 역할은?",
      "options": [
        "API 호출과 상태 관리를 담당한다",
        "전달받은 props만으로 UI를 그리는 순수 표시를 담당한다",
        "라우팅과 인증 검사를 담당한다",
        "localStorage 저장을 담당한다"
      ],
      "answer": 1,
      "explain": "Presentational 컴포넌트는 로직 없이 전달받은 props만으로 UI를 그리고, 데이터·로직은 Container가 담당한다."
    },
    {
      "q": "React.lazy와 Suspense를 함께 사용하는 주된 목적은?",
      "options": [
        "전역 상태를 관리하기 위해",
        "페이지 단위 코드 분할로 초기 번들 크기를 줄이기 위해",
        "HTTP 요청을 취소하기 위해",
        "CSS를 동적으로 적용하기 위해"
      ],
      "answer": 1,
      "explain": "lazy + 동적 import는 방문하는 경로의 코드만 로드해 초기 번들을 줄이고, Suspense가 로딩 중 fallback UI를 보여준다."
    },
    {
      "q": "동적 라우트 /products/:id 에서 URL의 id 값을 읽으려면 어떤 훅을 사용하는가?",
      "options": [
        "useSearchParams",
        "useNavigate",
        "useParams",
        "useLocation"
      ],
      "answer": 2,
      "explain": "useParams는 동적 경로의 :id 같은 파라미터를 객체로 읽어 예를 들어 /products/3에서 id='3'을 얻는다."
    },
    {
      "q": "중첩 라우팅에서 부모 라우트의 공통 레이아웃 안에 매칭된 자식 라우트를 렌더링할 자리를 표시하는 컴포넌트는?",
      "options": [
        "<Navigate/>",
        "<Outlet/>",
        "<Link/>",
        "<Suspense/>"
      ],
      "answer": 1,
      "explain": "Outlet은 부모 라우트 내부에서 현재 매칭된 자식 라우트가 렌더될 자리를 나타낸다."
    }
  ],
  "react-07": [
    {
      "q": "공통 Button 컴포넌트에서 variant의 기본값이 'primary'로 지정되어 있다. <Button onClick={onSave}>저장</Button>처럼 variant를 생략하면 어떤 클래스가 적용되는가?",
      "options": [
        "btn primary",
        "btn",
        "btn danger",
        "primary"
      ],
      "answer": 0,
      "explain": "variant 기본값 'primary'와 빈 className이 'btn primary'로 조합된 뒤 trim()으로 공백이 정리된다."
    },
    {
      "q": "useReducer 장바구니 예제에서 reducer 함수가 'ADD' 액션을 처리할 때 사용하는 올바른 방식은?",
      "options": [
        "state.push(action.payload)로 기존 배열에 직접 추가",
        "[...state, action.payload]로 복사 후 새 배열 반환",
        "state = action.payload로 재할당",
        "dispatch를 직접 호출"
      ],
      "answer": 1,
      "explain": "reducer는 순수 함수로 불변성을 지켜야 하므로 기존 배열을 복사하고 payload를 붙인 새 배열을 반환한다."
    },
    {
      "q": "대형 프로젝트에서 도메인 폴더에 index.js(배럴 파일)를 두어 re-export하는 주된 이점은?",
      "options": [
        "번들 크기가 자동으로 줄어든다",
        "런타임 성능이 향상된다",
        "내부 파일 이동 시 외부 import 변경 범위를 줄인다",
        "타입 검사가 자동화된다"
      ],
      "answer": 2,
      "explain": "단일 진입점을 통해 내부 파일이 이동해도 외부의 import 구문이 그대로 유지되어 리팩토링 영향 범위가 줄어든다."
    },
    {
      "q": "본문에 따르면 CRA와 Vite의 빌드 방식에 대한 설명으로 옳은 것은?",
      "options": [
        "Vite는 개발에 esbuild, 프로덕션 빌드에 Rollup을 사용한다",
        "Vite는 개발과 빌드 모두 webpack을 사용한다",
        "CRA는 프로덕션 빌드를 esbuild로 수행한다",
        "CRA는 개발 서버를 Rollup으로 구동한다"
      ],
      "answer": 0,
      "explain": "Vite는 개발 중 네이티브 ESM과 esbuild로 빠르게 처리하고 프로덕션 빌드는 Rollup으로 수행한다."
    },
    {
      "q": "클라이언트에 절대 노출하면 안 되는 서드파티 비밀키를 안전하게 다루는 방법으로 본문이 권장하는 것은?",
      "options": [
        "VITE_ 접두사 환경변수로 번들에 포함",
        "서버리스 함수 내에서만 사용하고 클라이언트는 그 함수에 요청",
        "JavaScript 변수에 직접 하드코딩",
        ".env 파일을 깃에 커밋해 팀과 공유"
      ],
      "answer": 1,
      "explain": "비밀키는 서버리스 함수(예: Netlify Functions) 안에서만 사용하고 클라이언트는 해당 함수에 요청해 간접적으로 기능을 수행해야 안전하다."
    }
  ],
  "react-08": [
    {
      "q": "App.js에서 useEffect의 의존성 배열이 빈 배열([])일 때 데이터 fetch는 언제 실행되는가?",
      "options": [
        "렌더링될 때마다 매번",
        "컴포넌트가 처음 마운트될 때 한 번만",
        "상태가 바뀔 때마다",
        "컴포넌트가 언마운트될 때"
      ],
      "answer": 1,
      "explain": "빈 의존성 배열은 마운트 시점에 단 한 번만 부수효과를 실행하게 한다."
    },
    {
      "q": "App 예제에서 selectedService 값에 따라 목록 또는 상세 화면을 전환할 때 사용한 기법은?",
      "options": [
        "switch 문",
        "&& 단축 평가",
        "삼항 연산자",
        "for 반복문"
      ],
      "answer": 2,
      "explain": "!selectedService ? <ServiceList .../> : <ServiceDetail .../> 형태의 삼항 연산자로 둘 중 하나를 렌더링한다."
    },
    {
      "q": "본문에서 설명한 axios와 fetch의 차이로 옳은 것은?",
      "options": [
        "fetch는 응답을 res.json()으로 수동 파싱해야 한다",
        "axios는 브라우저 내장이라 설치가 필요 없다",
        "fetch는 요청/응답 인터셉터를 기본 제공한다",
        "axios는 Promise를 반환하지 않는다"
      ],
      "answer": 0,
      "explain": "fetch는 응답 본문을 res.json()으로 직접 파싱해야 하지만 axios는 JSON 자동 변환을 제공한다."
    },
    {
      "q": "코드 개선 예제에서 setItems(prev => [...prev, item]) 같은 함수형 업데이트를 권장하는 이유는?",
      "options": [
        "코드가 더 짧아지기 때문",
        "항상 최신 상태를 기준으로 안전하게 추가하기 때문",
        "axios 호출이 빨라지기 때문",
        "key prop이 자동 생성되기 때문"
      ],
      "answer": 1,
      "explain": "prev를 인자로 받는 함수형 업데이트는 직전 상태가 아닌 최신 상태를 기준으로 갱신해 불변성을 안전하게 유지한다."
    },
    {
      "q": "Detail.js에서 URL 경로 /detail/:id의 id 값을 읽어오기 위해 사용한 react-router-dom 훅은?",
      "options": [
        "useNavigate",
        "useParams",
        "useLocation",
        "useRoutes"
      ],
      "answer": 1,
      "explain": "useParams 훅으로 URL 경로의 동적 파라미터(:id)를 추출해 해당 계좌 상세를 조회한다."
    }
  ],
  "ai-01": [
    {
      "q": "전통적 AI(판별 모델)와 생성형 AI(생성 모델)의 차이로 옳은 것은?",
      "options": [
        "판별 모델은 새로운 콘텐츠를 생성하고, 생성 모델은 입력을 분류한다",
        "판별 모델은 입력을 분류·예측하고, 생성 모델은 새로운 콘텐츠를 생성한다",
        "두 모델 모두 클래스 레이블만 출력한다",
        "생성 모델은 지도학습만, 판별 모델은 비지도학습만 사용한다"
      ],
      "answer": 1,
      "explain": "판별 모델은 입력을 미리 정의된 범주로 분류·예측하고, 생성 모델은 학습한 분포를 바탕으로 새로운 콘텐츠를 생성한다."
    },
    {
      "q": "FastAPI에서 코드를 작성하면 자동으로 생성되는 API 문서 도구는?",
      "options": [
        "Swagger UI와 ReDoc",
        "Jupyter Notebook",
        "TensorBoard",
        "Gradio와 Streamlit"
      ],
      "answer": 0,
      "explain": "FastAPI는 코드 작성만으로 /docs의 Swagger UI와 /redoc의 ReDoc 문서를 자동 생성한다."
    },
    {
      "q": "다음 코드의 실행 결과로 가장 적절한 것은?\nclassifier = pipeline('sentiment-analysis')\nresult = classifier('I love using Hugging Face!')",
      "options": [
        "생성된 텍스트 문자열만 반환된다",
        "[{'label': 'POSITIVE', 'score': 0.9998}]처럼 라벨과 점수가 담긴 리스트를 반환한다",
        "번역된 한국어 문장을 반환한다",
        "오류가 발생해 아무 값도 반환하지 않는다"
      ],
      "answer": 1,
      "explain": "sentiment-analysis 파이프라인은 라벨(POSITIVE/NEGATIVE)과 신뢰도 점수가 담긴 딕셔너리 리스트를 반환한다."
    },
    {
      "q": "Hugging Face의 'Gated 모델'(예: Meta LLaMA)을 사용하기 위해 필요한 절차는?",
      "options": [
        "별도 인증 없이 누구나 즉시 다운로드 가능하다",
        "유료 결제만 하면 바로 사용 가능하다",
        "HF 계정 로그인 후 Access Request 승인을 받고 토큰으로 인증해야 한다",
        "모델을 직접 처음부터 학습시켜야 한다"
      ],
      "answer": 2,
      "explain": "Gated 모델은 HF 계정 로그인과 Access Request 승인이 필요하며, huggingface-cli login 또는 HF_TOKEN 환경변수로 인증한다."
    },
    {
      "q": "다음 FastAPI 라우터에서 /greet 경로의 name과 lang은 어떤 종류의 매개변수인가?\n@app.get('/greet')\ndef greet(name: str = 'World', lang: Optional[str] = 'en'): ...",
      "options": [
        "경로(path) 매개변수",
        "요청 본문(body) 매개변수",
        "쿼리(query) 매개변수",
        "헤더(header) 매개변수"
      ],
      "answer": 2,
      "explain": "함수 인자에 기본값을 주면 URL의 쿼리 매개변수(?name=...&lang=...)로 처리된다."
    }
  ],
  "ai-02": [
    {
      "q": "transformers의 pipeline()이 내부적으로 수행하는 작업 순서로 옳은 것은?",
      "options": [
        "후처리 → 추론 → 전처리 → 모델 로드",
        "모델 로드/토크나이저 로드 → 전처리 → 추론 → 후처리",
        "전처리 → 후처리 → 모델 로드 → 추론",
        "추론 → 모델 로드 → 전처리 → 토크나이저 로드"
      ],
      "answer": 1,
      "explain": "pipeline()은 모델·토크나이저 로드 후 입력 전처리, 모델 추론(forward), 결과 후처리 순으로 동작한다."
    },
    {
      "q": "GPT-2 텍스트 생성에서 do_sample 파라미터를 False로 두면 어떤 디코딩 방식이 적용되는가?",
      "options": [
        "항상 가장 확률 높은 토큰을 선택하는 greedy decoding이 적용된다",
        "매번 무작위로 다른 토큰을 샘플링한다",
        "temperature 값이 강하게 반영된 창의적 생성이 일어난다",
        "모델이 아무 토큰도 생성하지 않는다"
      ],
      "answer": 0,
      "explain": "do_sample=False이면 확률 샘플링이 꺼져 항상 가장 높은 확률의 토큰을 선택하는 greedy decoding으로 결정론적 결과를 낸다."
    },
    {
      "q": "한국어 처리를 위해 영어 모델(GPT-2) 대신 KoGPT2 같은 한국어 모델을 써야 하는 주된 이유는?",
      "options": [
        "한국어 모델이 항상 더 작고 빠르기 때문에",
        "영어 모델은 한국어 텍스트를 아예 입력받지 못하기 때문에",
        "한국어는 교착어 특성과 복잡한 어미 변화 때문에 영어 모델을 직접 적용하면 성능이 크게 떨어지기 때문에",
        "한국어 모델만 pipeline()을 지원하기 때문에"
      ],
      "answer": 2,
      "explain": "한국어는 교착어로 어미 변화가 복잡하고 한자어·고유어가 혼재해, 영어 모델을 직접 적용하면 성능이 크게 떨어진다."
    },
    {
      "q": "pipeline()의 device 파라미터 값과 의미가 잘못 짝지어진 것은?",
      "options": [
        "-1 → CPU에서 실행",
        "0 → 첫 번째 GPU(cuda:0)에서 실행",
        "'mps' → Apple Silicon GPU 사용",
        "-1 → 두 번째 GPU(cuda:1)에서 실행"
      ],
      "answer": 3,
      "explain": "-1은 CPU를 의미하며, 두 번째 GPU는 1로 지정한다."
    },
    {
      "q": "사전 학습 모델과 파인튜닝 모델의 차이로 옳은 것은?",
      "options": [
        "사전 학습 모델은 분류 헤드가 있어 즉시 추론 가능하다",
        "파인튜닝 모델은 특정 태스크용으로 추가 학습되어 즉시 추론(pipeline 적용)이 가능하다",
        "두 모델 모두 일반 언어 능력만 학습하고 태스크는 수행하지 못한다",
        "파인튜닝 모델은 사전 학습 모델보다 항상 학습 데이터가 더 많다"
      ],
      "answer": 1,
      "explain": "사전 학습 모델은 분류 헤드가 없어 직접 추론이 어렵지만, 파인튜닝 모델은 특정 태스크용으로 학습되어 즉시 추론에 사용할 수 있다."
    }
  ],
  "ai-03": [
    {
      "q": "T5 모델에서 한국어 텍스트를 요약시키려면 입력 앞에 무엇을 붙여야 하는가?",
      "options": [
        "'summarize: ' prefix",
        "'<usr>' 토큰",
        "'translate: ' prefix",
        "EOS 토큰"
      ],
      "answer": 0,
      "explain": "T5 계열은 태스크를 prefix로 지정하며, ke-t5 요약 코드에서 'summarize: ' 접두사를 붙여 요약 의도를 전달한다."
    },
    {
      "q": "MarianMT 번역 모델의 Hugging Face 모델 ID 패턴으로 옳은 것은?",
      "options": [
        "microsoft/DialoGPT-{lang}",
        "Helsinki-NLP/opus-mt-{소스}-{목적}",
        "KETI-AIR/ke-t5-{lang}",
        "facebook/bart-{소스}-{목적}"
      ],
      "answer": 1,
      "explain": "MarianMT 모델은 'Helsinki-NLP/opus-mt-{소스언어}-{목적언어}' 패턴을 따르며 언어 쌍마다 별도 모델이 존재한다."
    },
    {
      "q": "main.py의 lifespan(startup) 단계에서 NLP 모델들을 미리 로드하는 주된 이유는?",
      "options": [
        "GPU 메모리를 늘리기 위해",
        "Swagger 문서를 자동 생성하기 위해",
        "첫 요청 시 발생하는 로딩 지연을 막기 위해",
        "대화 이력을 저장하기 위해"
      ],
      "answer": 2,
      "explain": "무거운 모델을 서버 시작 시 미리 메모리에 올려두어 첫 요청에서 발생할 로딩 지연을 제거한다."
    },
    {
      "q": "이 장에서 구현한 챗봇이 '무상태(Stateless)' 구조라는 것의 의미는?",
      "options": [
        "GPU 없이 CPU로만 동작한다",
        "각 요청이 이전 대화 이력을 기억하지 않고 독립 처리된다",
        "응답을 base64로 인코딩한다",
        "Redis에 대화를 항상 저장한다"
      ],
      "answer": 1,
      "explain": "무상태 챗봇은 각 요청을 독립적으로 처리해 서버 상태 관리가 불필요하고 수평 확장이 용이하다."
    },
    {
      "q": "요약 generate 호출에서 num_beams 값을 높이면 일반적으로 나타나는 효과는?",
      "options": [
        "품질은 올라가지만 생성 속도는 느려진다",
        "품질과 속도가 모두 향상된다",
        "출력이 항상 짧아진다",
        "패딩 토큰이 제거된다"
      ],
      "answer": 0,
      "explain": "num_beams는 Beam Search 후보 수로, 클수록 요약 품질이 높아지는 대신 연산이 늘어 속도가 느려진다."
    }
  ],
  "ai-04": [
    {
      "q": "Stable Diffusion이 픽셀 공간이 아닌 잠재 공간(latent space)에서 확산을 수행하는 주된 이유는?",
      "options": [
        "이미지 해상도를 높이기 위해",
        "계산 효율이 훨씬 뛰어나기 때문",
        "GPU 없이도 동작시키기 위해",
        "텍스트 인코딩을 생략하기 위해"
      ],
      "answer": 1,
      "explain": "압축된 잠재 공간에서 확산을 수행하므로 픽셀 공간 직접 확산보다 계산 효율이 크게 향상된다."
    },
    {
      "q": "Stable Diffusion 구성 요소 중 잠재 벡터를 실제 512×512 픽셀 이미지로 복원하는 역할을 하는 것은?",
      "options": [
        "CLIP Text Encoder",
        "UNet",
        "VAE Decoder",
        "Scheduler"
      ],
      "answer": 2,
      "explain": "VAE Decoder가 최종 정제된 잠재 벡터를 512×512 RGB 픽셀 이미지로 변환한다."
    },
    {
      "q": "guidance_scale(CFG 스케일) 값을 매우 높게 설정하면 나타나는 특성은?",
      "options": [
        "프롬프트 충실도는 높아지지만 다양성이 줄어든다",
        "결과가 더 다양하고 창의적이 된다",
        "생성 속도가 크게 빨라진다",
        "VRAM 사용량이 절반으로 준다"
      ],
      "answer": 0,
      "explain": "CFG 스케일이 높을수록 프롬프트에 가까워지지만 다양성이 줄고 과도하면 색상 왜곡이 발생할 수 있다."
    },
    {
      "q": "ControlNet이 원본 모델의 이미지 품질을 유지하면서 구조 정보를 반영하는 방식은?",
      "options": [
        "원본 UNet을 처음부터 재학습한다",
        "VAE를 두 개로 늘린다",
        "원본 UNet 가중치를 동결하고 학습 가능한 복사본으로 조건을 주입한다",
        "텍스트 프롬프트를 자동 생성한다"
      ],
      "answer": 2,
      "explain": "ControlNet은 원본 UNet을 동결하고 별도의 학습 가능한 복사본을 통해 조건 신호를 주입한다."
    },
    {
      "q": "코드에서 모델을 torch_dtype=torch.float16(fp16)으로 로드하면 얻는 효과는?",
      "options": [
        "VRAM 사용량이 약 절반으로 줄고 속도가 향상된다",
        "CPU에서만 동작하게 된다",
        "이미지 해상도가 1024로 고정된다",
        "안전 필터가 자동 활성화된다"
      ],
      "answer": 0,
      "explain": "fp16은 fp32 대비 메모리를 절반으로 줄이고 추론 속도를 높이는 GPU 최적화 기법이다."
    }
  ],
  "ai-05": [
    {
      "q": "Whisper가 입력 오디오를 인코더에 넣기 전에 변환하는 형식은 무엇인가?",
      "options": [
        "80채널 Log-Mel Spectrogram",
        "MP3 압축 비트스트림",
        "Base64 인코딩 문자열",
        "RGB 이미지 텐서"
      ],
      "answer": 0,
      "explain": "Whisper는 16kHz 모노 오디오를 80채널, 30초 단위의 Log-Mel Spectrogram으로 변환한 뒤 Transformer 인코더에 입력한다."
    },
    {
      "q": "ASRService.transcribe에서 language 인자를 None으로 두면 어떻게 동작하는가?",
      "options": [
        "에러가 발생한다",
        "언어를 자동으로 감지한다",
        "항상 영어로 처리한다",
        "한국어로 강제 지정된다"
      ],
      "answer": 1,
      "explain": "language를 비워두면 Whisper가 입력 오디오 첫 30초를 분석해 99개 언어 중 자동으로 언어를 감지한다."
    },
    {
      "q": "Bark와 SpeechT5를 비교할 때 SpeechT5의 특징으로 옳은 것은?",
      "options": [
        "웃음·노래 등 비언어 사운드 생성이 가능하다",
        "모델 크기가 약 1.7GB로 더 크다",
        "Bark보다 처리 속도가 빠르고 모델 크기가 작다",
        "100개 이상의 음성 프리셋을 제공한다"
      ],
      "answer": 2,
      "explain": "SpeechT5는 약 400MB로 Bark(~1.7GB)보다 작고 처리 속도가 빠르며 안정적이지만, 비언어 사운드 생성은 불가능하다."
    },
    {
      "q": "FastAPI에서 UploadFile의 내용을 읽는 올바른 방법은?",
      "options": [
        "file.content를 직접 참조한다",
        "await file.read()로 비동기로 읽는다",
        "open(file)으로 동기 읽기한다",
        "file.text()를 호출한다"
      ],
      "answer": 1,
      "explain": "UploadFile은 비동기 클래스이므로 await file.read()를 통해 파일 전체 내용을 bytes로 읽어야 한다."
    },
    {
      "q": "TTS API에서 output_format을 'base64'로 지정하면 응답은 어떤 형태로 반환되는가?",
      "options": [
        "audio/wav MIME의 바이너리 스트림",
        "MP3 파일 다운로드 응답",
        "audio_base64 필드를 포함한 JSON",
        "SRT 자막 텍스트"
      ],
      "answer": 2,
      "explain": "base64 형식은 WAV를 base64 문자열로 인코딩하여 audio_base64 등의 필드를 담은 JSON으로 반환한다."
    }
  ],
  "ai-06": [
    {
      "q": "Hugging Face pipeline으로 이미지 분류를 구현할 때 지정하는 task 값은?",
      "options": [
        "'object-detection'",
        "'image-classification'",
        "'image-to-text'",
        "'feature-extraction'"
      ],
      "answer": 1,
      "explain": "이미지 분류는 task='image-classification' pipeline을 사용하며, 크기 조정·정규화·추론·Softmax를 자동으로 처리한다."
    },
    {
      "q": "YOLOv8과 같은 1-Stage Detector의 특징으로 옳은 것은?",
      "options": [
        "후보 영역 추출 후 분류해 정확하지만 느리다",
        "단일 네트워크로 박스와 클래스를 동시 예측해 빠르다",
        "앵커 박스 없이 키포인트만 사용한다",
        "NMS가 전혀 필요 없는 End-to-End 구조다"
      ],
      "answer": 1,
      "explain": "YOLO 같은 1-Stage Detector는 단일 네트워크로 박스와 클래스를 동시에 예측해 빠르며 실시간 처리에 적합하다."
    },
    {
      "q": "YOLODetectionService.detect에서 confidence 파라미터의 역할은?",
      "options": [
        "이미지 해상도를 조정한다",
        "이 값보다 낮은 신뢰도의 탐지는 버린다",
        "탐지 박스의 색상을 결정한다",
        "최대 탐지 개수를 제한한다"
      ],
      "answer": 1,
      "explain": "confidence는 신뢰도 임계값으로, 이 값보다 낮은 신뢰도의 탐지는 버려지며 낮출수록 더 많은 객체가 탐지된다."
    },
    {
      "q": "BLIP의 generate_caption에서 conditional_text를 지정하면 어떻게 동작하는가?",
      "options": [
        "이미지를 무시하고 텍스트만 생성한다",
        "주어진 시작 텍스트 뒤를 이어 캡션을 생성한다",
        "VQA 모드로 전환된다",
        "캡션 생성을 건너뛴다"
      ],
      "answer": 1,
      "explain": "conditional_text를 주면 이미지와 함께 시작 문구를 입력해 그 뒤를 이어가는 조건부 캡션을 생성한다."
    },
    {
      "q": "main.py의 lifespan에서 모든 CV 모델을 미리 로드하는 이유는?",
      "options": [
        "첫 요청 시의 모델 로딩 지연을 방지하기 위해",
        "정적 파일을 서빙하기 위해",
        "CORS 오류를 막기 위해",
        "메모리 사용량을 줄이기 위해"
      ],
      "answer": 0,
      "explain": "서버 시작 시점(lifespan)에 모델을 미리 로드하면 첫 요청에서 발생하는 모델 로딩 지연을 방지할 수 있다."
    }
  ],
  "ai-07": [
    {
      "q": "CLIP 모델이 이미지와 텍스트를 비교할 수 있는 핵심 원리는 무엇인가?",
      "options": [
        "이미지와 텍스트를 동일한 벡터 공간에 매핑하는 대조 학습",
        "이미지를 텍스트로 번역한 뒤 문자열을 비교",
        "텍스트만 학습하고 이미지는 OCR로 변환",
        "두 인코더를 완전히 분리해 서로 다른 공간에 투영"
      ],
      "answer": 0,
      "explain": "CLIP은 이미지·텍스트 인코더를 함께 학습해 같은 임베딩 공간에 매핑하고, 대조 학습으로 일치 쌍을 가깝게 배치한다."
    },
    {
      "q": "L2 정규화된 두 임베딩 벡터의 코사인 유사도는 어떻게 계산되는가?",
      "options": [
        "유클리드 거리의 역수",
        "단순 내적(dot product)",
        "두 벡터의 차의 절댓값 합",
        "softmax 적용 후 평균"
      ],
      "answer": 1,
      "explain": "L2 정규화로 벡터 길이가 1이 되면 코사인 유사도는 단순 내적으로 계산할 수 있다."
    },
    {
      "q": "CLIP의 Zero-shot 이미지 분류에 대한 설명으로 옳은 것은?",
      "options": [
        "각 클래스마다 수천 장의 학습 이미지를 새로 준비해야 한다",
        "분류 전에 반드시 모델을 파인튜닝해야 한다",
        "레이블 텍스트만 작성하면 학습 없이 분류할 수 있다",
        "이미지 인코더만 사용하고 텍스트 인코더는 쓰지 않는다"
      ],
      "answer": 2,
      "explain": "CLIP은 'a photo of [class]' 같은 레이블 텍스트 벡터와 이미지 벡터를 비교해 파인튜닝 없이 분류한다."
    },
    {
      "q": "LLaVA-1.5에서 비전 인코더의 이미지 패치 임베딩을 LLM이 이해하는 토큰 공간으로 변환하는 구성 요소는?",
      "options": [
        "Q-Former",
        "MLP Projection",
        "Text Encoder",
        "Tokenizer"
      ],
      "answer": 1,
      "explain": "LLaVA-1.5는 2-layer MLP Projection으로 이미지 패치 임베딩을 LLM의 토큰 임베딩 차원과 동일하게 투영한다."
    },
    {
      "q": "FastAPI에서 이미지 파일과 텍스트 질문을 multipart/form-data로 함께 받을 때 사용하는 파라미터 조합은?",
      "options": [
        "두 값 모두 Pydantic BaseModel 한 개로 받는다",
        "UploadFile(File)과 Form을 함께 선언한다",
        "이미지는 Query, 질문은 Path로 받는다",
        "둘 다 Header로 받는다"
      ],
      "answer": 1,
      "explain": "파일은 UploadFile=File(...), 텍스트는 Form(...)으로 받으며, 이 경우 JSON body 파라미터와는 혼용할 수 없다."
    }
  ],
  "ai-08": [
    {
      "q": "운영 환경에서 FastAPI를 실행할 때 권장되는 명령은?",
      "options": [
        "uvicorn main:app --reload",
        "gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker",
        "python main.py --debug",
        "flask run --host 0.0.0.0"
      ],
      "answer": 1,
      "explain": "운영에서는 Gunicorn이 여러 UvicornWorker를 멀티 프로세스로 띄워 병렬 처리하므로 -k uvicorn.workers.UvicornWorker 조합을 사용한다."
    },
    {
      "q": "일반 API 기준 Gunicorn의 권장 워커 수 계산식은?",
      "options": [
        "CPU 코어 수 ÷ 2",
        "CPU 코어 수 × 2 + 1",
        "항상 고정 1개",
        "RAM(GB) × 2"
      ],
      "answer": 1,
      "explain": "경험칙상 'CPU 코어 수 × 2 + 1'을 권장하되, AI 서비스는 모델 VRAM을 고려해 더 보수적으로 줄인다."
    },
    {
      "q": "Uvicorn을 단독으로 운영에 사용할 때의 한계로 옳지 않은 것은?",
      "options": [
        "단일 프로세스로 GIL 때문에 CPU 바운드 작업이 다른 요청을 블로킹한다",
        "워커가 비정상 종료되면 서비스 전체가 중단된다",
        "멀티코어 서버에서도 1코어만 활용한다",
        "여러 워커를 자동으로 재시작하고 무중단 배포를 기본 지원한다"
      ],
      "answer": 3,
      "explain": "워커 자동 재시작과 무중단 재시작은 Gunicorn이 제공하는 장점이며, Uvicorn 단독은 이를 지원하지 않는다."
    },
    {
      "q": "AI 서비스 Docker 이미지에서 거대한 모델 파일을 외부 볼륨으로 마운트하는 전략(전략 C)의 장점은?",
      "options": [
        "이미지에 모델을 번들해 오프라인에서도 즉시 동작한다",
        "이미지 크기를 작게 유지하면서 로컬 파일로 빠르게 시작한다",
        "매 컨테이너 시작마다 수 GB를 다시 다운로드한다",
        "모델을 매번 S3에서 새로 받아야 한다"
      ],
      "answer": 1,
      "explain": "볼륨 마운트(전략 C)는 모델을 이미지에 넣지 않아 이미지가 작고, 로컬 파일을 읽으므로 컨테이너 시작이 빠르다."
    },
    {
      "q": "Hugging Face Spaces 무료 플랜에 대한 설명으로 옳은 것은?",
      "options": [
        "비공개 저장소를 자유롭게 만들 수 있다",
        "커스텀 도메인을 기본 지원한다",
        "48시간 미사용 시 슬립되고 공개 저장소만 가능하다",
        "24/7 지속 실행이 보장된다"
      ],
      "answer": 2,
      "explain": "무료 플랜은 공개 저장소만 가능하며 48시간 미사용 시 슬립되고, 커스텀 도메인·비공개·지속 실행은 상위 플랜이 필요하다."
    }
  ],
  "ops-01": [
    {
      "q": "Git과 GitHub의 관계를 가장 정확하게 설명한 것은?",
      "options": [
        "Git은 클라우드 서비스이고 GitHub는 로컬 도구다",
        "Git은 로컬에서 동작하는 버전 관리 도구이고, GitHub는 Git 저장소를 호스팅하는 플랫폼이다",
        "둘은 같은 회사가 만든 동일한 프로그램의 다른 이름이다",
        "GitHub가 있어야만 Git을 사용할 수 있다"
      ],
      "answer": 1,
      "explain": "Git은 내 컴퓨터(로컬)에서 동작하는 도구이고 GitHub는 그 저장소를 클라우드에 호스팅하는 플랫폼으로, Git이 먼저이고 GitHub는 선택이다."
    },
    {
      "q": "`git add .`를 실행하면 변경 사항은 어디로 이동하는가?",
      "options": [
        "작업 디렉터리에서 스테이징 영역으로",
        "스테이징 영역에서 저장소로",
        "저장소에서 원격으로",
        "원격에서 로컬로"
      ],
      "answer": 0,
      "explain": "git add는 작업 디렉터리의 변경을 스테이징 영역으로 올리는 명령이며, 스테이징된 내용을 저장소에 기록하는 것은 git commit이다."
    },
    {
      "q": "병합 충돌이 발생했을 때 올바른 대응은?",
      "options": [
        "충돌은 심각한 에러이므로 저장소를 새로 만든다",
        "충돌 표시 줄(<<<<<<<, =======, >>>>>>>)을 남겨 둔 채 커밋한다",
        "원하는 코드를 정리하고 충돌 표시 줄을 모두 삭제한 뒤 다시 스테이징하고 커밋한다",
        "Git이 자동으로 한쪽을 골라 주므로 그냥 기다린다"
      ],
      "answer": 2,
      "explain": "충돌은 정상적인 협업 과정이며, 원하는 코드를 남기고 충돌 표시 줄을 반드시 모두 삭제한 뒤 다시 add·commit 해야 한다."
    },
    {
      "q": "이미 push해 공유 중인 커밋을 안전하게 되돌리려 할 때 권장되는 명령은?",
      "options": [
        "git reset",
        "git revert",
        "git stash",
        "git rebase"
      ],
      "answer": 1,
      "explain": "git revert는 변경을 취소하는 새 커밋을 만들어 이력을 지우지 않으므로 공유 브랜치에서도 안전하다."
    },
    {
      "q": "오픈소스 라이선스 중 \"이 코드를 쓴 결과물도 같은 라이선스로 공개\"하도록 강제하는 카피레프트 라이선스는?",
      "options": [
        "MIT",
        "Apache 2.0",
        "GPL",
        "BSD"
      ],
      "answer": 2,
      "explain": "GPL은 파생 결과물도 같은 조건으로 공개하도록 강제하는 카피레프트 라이선스이며, MIT·Apache는 그런 의무가 없다."
    }
  ],
  "ops-02": [
    {
      "q": "이 프로젝트에서 FastAPI와 Uvicorn의 역할 구분으로 옳은 것은?",
      "options": [
        "FastAPI는 ASGI 서버이고 Uvicorn은 웹 프레임워크다",
        "FastAPI는 웹 프레임워크이고 Uvicorn은 그것을 실행하는 ASGI 서버다",
        "둘 다 UI를 만드는 라이브러리다",
        "FastAPI는 모델 로딩, Uvicorn은 양자화를 담당한다"
      ],
      "answer": 1,
      "explain": "FastAPI는 고성능 Python 웹 프레임워크이고, Uvicorn은 FastAPI를 실행하는 ASGI 서버다."
    },
    {
      "q": "BitsAndBytesConfig에서 4-bit 양자화를 켜는 핵심 옵션은 무엇인가?",
      "options": [
        "device_map=\"auto\"",
        "bnb_4bit_compute_dtype=torch.bfloat16",
        "load_in_4bit=True",
        "do_sample=True"
      ],
      "answer": 2,
      "explain": "load_in_4bit=True가 모델 가중치를 4-bit로 로드해 메모리를 대폭 절감하는 핵심 옵션이다."
    },
    {
      "q": "`gr.mount_gradio_app(app, demo, path=\"/\")` 코드의 역할은?",
      "options": [
        "Gradio UI를 FastAPI의 루트 경로(/)에 마운트하여 한 포트에서 함께 구동한다",
        "모델을 GPU에 자동 분배한다",
        "허깅페이스에 파일을 업로드한다",
        "토큰을 텍스트로 디코딩한다"
      ],
      "answer": 0,
      "explain": "gr.mount_gradio_app은 Gradio UI를 FastAPI의 루트 경로(/)에 마운트해 하나의 포트에서 API와 챗봇 화면이 동시에 구동되게 한다."
    },
    {
      "q": "추론 함수에서 `temperature=0.7` 설정이 의미하는 것은?",
      "options": [
        "최대 생성 토큰 수를 0.7배로 줄인다",
        "GPU 온도를 제한한다",
        "답변의 다양성을 제어한다(0에 가까울수록 결정적, 1에 가까울수록 창의적)",
        "응답을 0.7초 안에 끝낸다"
      ],
      "answer": 2,
      "explain": "temperature는 답변의 다양성을 제어하는 값으로, 0에 가까울수록 결정적이고 1에 가까울수록 창의적인 응답이 나온다."
    },
    {
      "q": "허깅페이스 스페이스에 이 앱을 배포할 때 옳은 설정은?",
      "options": [
        "Space SDK로 Gradio를 선택하고 5000 포트를 사용한다",
        "Space SDK로 Docker를 선택하고 7860 포트를 사용한다",
        "Space SDK로 Static을 선택하고 8000 포트를 사용한다",
        "Space SDK로 Docker를 선택하고 80 포트를 사용한다"
      ],
      "answer": 1,
      "explain": "FastAPI+Gradio 배포에서는 Space SDK로 Docker를 선택하며, 허깅페이스는 기본적으로 7860 포트를 외부에 노출하므로 uvicorn을 --port 7860으로 실행한다."
    }
  ],
  "ops-03": [
    {
      "q": "기본 EC2 대신 탄력적 IP(Elastic IP)를 할당하는 주된 이유는?",
      "options": [
        "기본 EC2는 재시작할 때마다 공인 IP가 바뀌어 안정적 운영이 어렵기 때문",
        "탄력적 IP가 일반 IP보다 전송 속도가 빠르기 때문",
        "탄력적 IP가 있어야 Docker를 설치할 수 있기 때문",
        "보안 그룹 설정이 자동으로 적용되기 때문"
      ],
      "answer": 0,
      "explain": "기본 EC2는 재시작 시마다 공인 IP가 바뀌므로 고정 IP인 탄력적 IP를 할당해 안정적으로 운영합니다."
    },
    {
      "q": "SSH 접속 전에 `chmod 400 my-app-key.pem` 명령을 실행하는 이유는?",
      "options": [
        "키 파일을 압축하여 전송 속도를 높이기 위해",
        "소유자만 읽을 수 있도록 권한을 제한해야 SSH가 접속을 허용하기 때문",
        "키 파일을 PuTTY 형식으로 변환하기 위해",
        "모든 사용자에게 실행 권한을 부여하기 위해"
      ],
      "answer": 1,
      "explain": "chmod 400은 소유자에게만 읽기 권한을 부여하며, 이 설정이 없으면 SSH가 보안상 접속을 거부합니다."
    },
    {
      "q": "EC2의 Docker 설치 과정에서 `sudo usermod -aG docker $USER`를 실행하는 목적은?",
      "options": [
        "Docker를 자동 시작 서비스로 등록하기 위해",
        "ubuntu 계정을 docker 그룹에 추가해 sudo 없이 docker 명령을 쓰기 위해",
        "Docker 공식 GPG 키를 등록하기 위해",
        "containerd를 별도로 설치하기 위해"
      ],
      "answer": 1,
      "explain": "이 명령은 현재 계정을 docker 그룹에 추가해 sudo 없이 docker를 쓰게 하며, 적용하려면 재접속이 필요합니다."
    },
    {
      "q": "docker-compose.yml에서 db 서비스의 `volumes`로 명명 볼륨 pgdata를 마운트하는 이유는?",
      "options": [
        "컨테이너를 재시작·삭제해도 데이터가 유지되도록 하기 위해",
        "DB 컨테이너의 메모리 사용량을 줄이기 위해",
        "외부에 80번 포트를 노출하기 위해",
        "backend보다 먼저 기동되도록 순서를 지정하기 위해"
      ],
      "answer": 0,
      "explain": "명명 볼륨 pgdata를 DB 데이터 경로에 마운트하면 컨테이너를 재시작하거나 삭제해도 데이터가 영속됩니다."
    },
    {
      "q": "`docker compose up -d` 명령에서 `-d` 옵션의 의미는?",
      "options": [
        "정의된 모든 이미지를 삭제(delete)한다",
        "디버그(debug) 로그를 출력한다",
        "백그라운드(detached mode)로 컨테이너를 실행한다",
        "DockerHub에서 다운로드만 수행한다"
      ],
      "answer": 2,
      "explain": "-d는 detached mode로, 모든 컨테이너를 백그라운드에서 실행하며 로컬에 없는 이미지는 DockerHub에서 자동으로 내려받습니다."
    }
  ],
  "ops-04": [
    {
      "q": "Nginx 설치 후 `sudo chown -R ubuntu:ubuntu /var/www/html`을 실행하는 이유는?",
      "options": [
        "Nginx를 자동으로 재시작하기 위해",
        "WinSCP로 파일 업로드 시 권한 오류가 발생하지 않도록 ubuntu 계정에 소유권을 주기 위해",
        "기본 환영 페이지를 삭제하기 위해",
        "80번 포트를 외부에 개방하기 위해"
      ],
      "answer": 1,
      "explain": "이 명령은 /var/www/html의 소유권을 ubuntu로 바꿔, WinSCP 업로드 시 발생하는 권한 오류를 방지합니다."
    },
    {
      "q": "Vue.js SPA 배포 시 Nginx 설정을 `try_files $uri $uri/ /index.html`로 바꾸는 이유는?",
      "options": [
        "정적 자산을 압축해 전송 속도를 높이기 위해",
        "존재하지 않는 경로에서 404 대신 index.html을 반환해 새로고침 404를 막기 위해",
        "8080 포트로 요청을 전달하기 위해",
        "dist 폴더를 자동으로 생성하기 위해"
      ],
      "answer": 1,
      "explain": "파일이 없을 때 index.html을 반환하면 경로 처리를 Vue Router에 위임해 새로고침 시 404 에러를 방지합니다."
    },
    {
      "q": "Spring Boot Gradle 빌드 `./gradlew clean build -x test`에서 `-x test` 옵션의 역할은?",
      "options": [
        "단위 테스트 실행을 건너뛰어 빌드 시간을 줄인다",
        "이전 빌드 결과물을 삭제한다",
        "plain jar만 생성한다",
        "테스트만 단독으로 실행한다"
      ],
      "answer": 0,
      "explain": "-x test는 단위 테스트 실행을 제외(skip)하여 빌드 시간을 단축합니다."
    },
    {
      "q": "`build/libs/` 폴더에서 EC2에 업로드해 실행하는 배포용 jar 파일은?",
      "options": [
        "-plain이 붙은 jar (라이브러리용)",
        "plain이 붙지 않은 jar (내장 Tomcat 포함, 실행 가능)",
        "두 파일을 모두 함께 실행해야 함",
        "확장자가 .war인 파일"
      ],
      "answer": 1,
      "explain": "plain이 붙지 않은 jar가 내장 Tomcat을 포함한 실행 가능한 배포용 파일이고, -plain jar는 라이브러리용으로 실행할 수 없습니다."
    },
    {
      "q": "Spring Boot 배포에서 Nginx `proxy_pass http://localhost:8080` 리버스 프록시를 설정하는 목적은?",
      "options": [
        "정적 HTML 파일을 직접 서빙하기 위해",
        "80번 포트 요청을 내부 8080(Spring Boot)으로 전달해 포트 번호 없이 접속하게 하기 위해",
        "Java 21을 자동으로 설치하기 위해",
        "nohup으로 jar를 백그라운드 실행하기 위해"
      ],
      "answer": 1,
      "explain": "proxy_pass는 80번으로 들어온 요청을 내부 8080번(Spring Boot)으로 전달해 사용자가 포트 번호 없이 표준 주소로 접속하게 합니다."
    }
  ],
  "ops-05": [
    {
      "q": "7장 네이티브 배포에서 Nginx가 /api/ 경로 요청을 전달하는 대상은?",
      "options": [
        "localhost:8080의 Spring Boot",
        "localhost:5432의 PostgreSQL",
        "/var/www/html 정적 파일",
        "DockerHub 레지스트리"
      ],
      "answer": 0,
      "explain": "Nginx는 /api/ 요청을 proxy_pass로 같은 서버의 Spring Boot(8080)에 전달한다."
    },
    {
      "q": "Nginx 설정의 try_files $uri $uri/ /index.html의 목적은?",
      "options": [
        "API 요청을 백엔드로 프록시",
        "Vue Router 경로에서 새로고침 시 404 방지",
        "PostgreSQL 자동 백업",
        "도커 이미지 캐시 최적화"
      ],
      "answer": 1,
      "explain": "요청 경로의 파일이 없으면 index.html로 폴백시켜 SPA 새로고침 404를 막는다."
    },
    {
      "q": "8장 Vue.js Dockerfile이 멀티 스테이지 빌드를 쓰는 주된 이점은?",
      "options": [
        "DB 접속 속도 향상",
        "API 포트를 자동 변경",
        "최종 이미지에 Node.js를 빼 크기를 줄임",
        "DockerHub 로그인 생략"
      ],
      "answer": 2,
      "explain": "빌드 결과물만 경량 Nginx 이미지에 복사하므로 Node.js가 빠져 이미지 크기가 작아진다."
    },
    {
      "q": "docker-compose 환경에서 backend 컨테이너가 PostgreSQL에 접속할 때 호스트명으로 무엇을 쓰는가?",
      "options": [
        "localhost",
        "127.0.0.1",
        "서비스명 db",
        "탄력적 IP"
      ],
      "answer": 2,
      "explain": "Compose 내부 네트워크에서는 서비스 이름(db)을 호스트명처럼 사용하므로 7장의 localhost가 db로 바뀐다."
    },
    {
      "q": "8장 Spring Boot와 9장 FastAPI 배포의 차이로 옳은 것은?",
      "options": [
        "Spring은 8000, FastAPI는 8080 포트를 쓴다",
        "Spring은 jar 빌드 후 패키징, FastAPI는 소스 코드 그대로 패키징한다",
        "FastAPI만 Nginx 통합 라우팅을 쓴다",
        "Spring만 docker-compose를 사용한다"
      ],
      "answer": 1,
      "explain": "Java는 jar로 빌드해 패키징하지만 Python FastAPI는 컴파일 없이 소스와 requirements.txt를 그대로 이미지에 담는다."
    }
  ],
  "ops-06": [
    {
      "q": "12장 MSA에서 Nginx가 /ai/ 경로 요청을 전달하는 대상은?",
      "options": [
        "Spring Boot(8080)",
        "FastAPI(8000)",
        "PostgreSQL(5432)",
        "Vue.js 정적 파일"
      ],
      "answer": 1,
      "explain": "/ai/는 AI 추론을 담당하는 FastAPI(8000)로, /api/는 Spring Boot(8080)로 분기된다."
    },
    {
      "q": "FastAPI 코드에서 os.getenv(\"DATABASE_URL\", ...)를 쓰는 이유로 가장 적절한 것은?",
      "options": [
        "DB 비밀번호를 자동 암호화하려고",
        "환경마다 코드 수정 없이 접속 정보만 주입해 바꾸려고",
        "SELECT 1 쿼리를 생략하려고",
        "Nginx 설정을 자동 생성하려고"
      ],
      "answer": 1,
      "explain": "접속 주소를 환경 변수로 읽으면 로컬·서버·도커 환경마다 코드를 고치지 않고 값만 주입해 바꿀 수 있다."
    },
    {
      "q": "11장 Vue.js가 백엔드를 호출할 때 /api/status 상대 경로를 쓰는 효과는?",
      "options": [
        "백엔드 주소가 바뀌어도 프론트 코드를 안 고쳐도 됨",
        "DB 연결이 빨라짐",
        "도커 이미지가 작아짐",
        "PostgreSQL 권한이 자동 부여됨"
      ],
      "answer": 0,
      "explain": "Nginx가 /api/ 경로를 백엔드로 라우팅하므로 백엔드 주소를 바꿔도 프론트 코드를 수정할 필요가 없다."
    },
    {
      "q": "12.3 Docker MSA에서 Vue.js Dockerfile의 Nginx 설정이 /api/ proxy_pass 대상으로 쓰는 값은?",
      "options": [
        "http://127.0.0.1:8080",
        "http://localhost:8000",
        "http://spring-backend:8080",
        "http://db:5432"
      ],
      "answer": 2,
      "explain": "컨테이너 간 통신이므로 IP 대신 서비스명 spring-backend(8080)을 proxy_pass 대상으로 사용한다."
    },
    {
      "q": "FastAPI의 /api/status 엔드포인트가 DB 연결 정상 여부를 판단하는 방법은?",
      "options": [
        "docker compose ps 결과 확인",
        "engine.connect() 후 SELECT 1 쿼리 성공 여부",
        "Nginx 로그 분석",
        "pip freeze 출력 비교"
      ],
      "answer": 1,
      "explain": "DB 커넥션을 열고 가장 가벼운 SELECT 1 쿼리가 성공하면 연결이 정상이라고 판단한다."
    }
  ]
};

export const GLOSSARY = [
  {
    "term": "JSX",
    "def": "JavaScript XML의 약자로, JavaScript 코드 안에서 HTML과 유사한 문법으로 UI를 선언적으로 표현하는 JavaScript 확장 문법이다. 빌드 시 일반 JavaScript로 변환된다.",
    "chapter": "react-01",
    "track": "react"
  },
  {
    "term": "Virtual DOM",
    "def": "실제 DOM을 메모리상에서 가볍게 표현한 자바스크립트 트리로, 상태 변경 시 이전 트리와 비교해 바뀐 부분만 실제 DOM에 반영해 성능을 높인다.",
    "chapter": "react-01",
    "track": "react"
  },
  {
    "term": "Reconciliation(재조정)",
    "def": "새 Virtual DOM과 이전 Virtual DOM을 비교(diffing)하여 변경된 최소한의 부분만 실제 DOM에 적용하는 과정이다.",
    "chapter": "react-01",
    "track": "react"
  },
  {
    "term": "createRoot()",
    "def": "React 18부터 도입된 react-dom/client의 루트 생성 API로, 동시성·자동 배칭 등 현대적 렌더링 기능을 제공한다. React 19에서 레거시 ReactDOM.render를 대체한다.",
    "chapter": "react-01",
    "track": "react"
  },
  {
    "term": "단일 루트 노드",
    "def": "컴포넌트는 반드시 하나의 루트 엘리먼트를 반환해야 한다는 규칙으로, 여러 형제 요소는 div나 Fragment로 감싸야 한다.",
    "chapter": "react-01",
    "track": "react"
  },
  {
    "term": "Fragment",
    "def": "실제 DOM에 추가 노드를 만들지 않고 여러 자식 요소를 그룹화하는 React 기능이다. <React.Fragment> 또는 축약형 <>...</>로 사용하며, 축약형은 key를 받을 수 없다.",
    "chapter": "react-01",
    "track": "react"
  },
  {
    "term": "key",
    "def": "리스트(map) 렌더링 시 각 항목의 정체성을 식별하기 위해 부여하는 고유 prop으로, 재정렬·삽입·삭제 시 올바른 재사용을 보장한다.",
    "chapter": "react-01",
    "track": "react"
  },
  {
    "term": "Vite",
    "def": "빠른 HMR과 가벼운 번들링을 제공하는 최신 빌드 도구로, 'npm create vite@latest'로 React 프로젝트를 손쉽게 생성할 수 있어 현재 권장되는 선택지이다.",
    "chapter": "react-01",
    "track": "react"
  },
  {
    "term": "Props",
    "def": "부모 컴포넌트가 자식 컴포넌트로 전달하는 읽기 전용 데이터로, 문자열·숫자·객체·함수 등 모든 자바스크립트 값을 담을 수 있으며 단방향 데이터 흐름을 보장한다.",
    "chapter": "react-02",
    "track": "react"
  },
  {
    "term": "State",
    "def": "컴포넌트 내부에서 관리되는 동적 데이터로, 변경되면 컴포넌트가 자동으로 재렌더링된다. 함수형에서는 useState, 클래스형에서는 this.state/this.setState로 다룬다.",
    "chapter": "react-02",
    "track": "react"
  },
  {
    "term": "props.children",
    "def": "컴포넌트의 여는 태그와 닫는 태그 사이에 작성한 JSX 콘텐츠가 자식 컴포넌트로 전달되는 특수 prop이다.",
    "chapter": "react-02",
    "track": "react"
  },
  {
    "term": "단방향 데이터 흐름",
    "def": "데이터가 상위에서 하위로만 전달되는 원칙으로, 자식은 props를 직접 수정할 수 없어 데이터 흐름이 예측 가능해진다.",
    "chapter": "react-02",
    "track": "react"
  },
  {
    "term": "Lifting State Up(상태 끌어올리기)",
    "def": "자식이 값을 바꿔야 할 때 부모가 상태를 소유하고 value와 onChange를 props로 내려주는 패턴으로, 단일 출처(Single Source of Truth)를 유지한다.",
    "chapter": "react-02",
    "track": "react"
  },
  {
    "term": "Props drilling",
    "def": "중간 컴포넌트가 실제로 사용하지 않는데도 깊은 트리로 props를 단계마다 전달해야 하는 문제로, Context API나 전역 상태 관리로 보완한다.",
    "chapter": "react-02",
    "track": "react"
  },
  {
    "term": "Controlled Component",
    "def": "input의 value를 state와 묶고 onChange로 갱신하여, 화면 입력값이 항상 state와 동기화되도록 제어하는 컴포넌트이다.",
    "chapter": "react-02",
    "track": "react"
  },
  {
    "term": "React.memo",
    "def": "props가 바뀌지 않으면 자식 컴포넌트의 재렌더를 건너뛰어 성능을 최적화하는 고차 컴포넌트로, 필요 시 맞춤 비교함수를 적용할 수 있다.",
    "chapter": "react-02",
    "track": "react"
  },
  {
    "term": "디자인 토큰(Design Token)",
    "def": "색상, 폰트, spacing 등의 값을 변수화해 디자인과 코드 간의 싱크를 유지하는 단일 출처 데이터다. design-tokens.json으로 정리한 뒤 CSS 변수나 theme 객체로 변환해 사용한다.",
    "chapter": "react-03",
    "track": "react"
  },
  {
    "term": "styled-components",
    "def": "CSS-in-JS 라이브러리로, props 값을 활용한 동적 스타일링과 ThemeProvider 기반 전역 디자인 시스템 관리를 지원한다. 컴포넌트 단위 캡슐화가 쉽지만 런타임 오버헤드가 있다.",
    "chapter": "react-03",
    "track": "react"
  },
  {
    "term": "CSS Modules",
    "def": "컴포넌트 단위로 클래스명을 고유 해시로 변환해 클래스 충돌을 방지하는 스타일 방식이다. 빌드 타임에 클래스가 생성되어 런타임 비용이 적어 정적 레이아웃·대형 리스트에 적합하다.",
    "chapter": "react-03",
    "track": "react"
  },
  {
    "term": "ThemeProvider",
    "def": "styled-components가 제공하는 컴포넌트로, 하위 트리 전체에 theme 객체(색상·spacing·radius 등)를 주입한다. 내부의 모든 styled 컴포넌트가 props.theme로 디자인 토큰에 접근할 수 있다.",
    "chapter": "react-03",
    "track": "react"
  },
  {
    "term": "Controlled Input(제어 컴포넌트)",
    "def": "입력값(value)을 React 상태로 보관하고 onChange에서 상태를 갱신해 UI가 상태를 반영하도록 만든 입력 방식이다. 검증, 포맷 변환, 폼 초기화가 쉽다.",
    "chapter": "react-03",
    "track": "react"
  },
  {
    "term": "ARIA 접근성 속성",
    "def": "aria-invalid, aria-describedby, aria-busy, role=\"alert\" 등으로 보조기술(스크린리더)에 오류·로딩·상태 정보를 전달하는 속성이다. label htmlFor 연결과 함께 접근성을 강화한다.",
    "chapter": "react-03",
    "track": "react"
  },
  {
    "term": "forwardRef",
    "def": "부모 컴포넌트가 자식 내부의 실제 DOM 요소(예: input)에 ref로 직접 접근할 수 있게 ref를 전달해 주는 React API다. 포커스 관리 등에 활용된다.",
    "chapter": "react-03",
    "track": "react"
  },
  {
    "term": "useReducer 폼 관리",
    "def": "복잡한 폼의 입력값·오류·터치 여부·로딩·서버 오류 상태를 하나의 객체로 묶어 action.type에 따라 불변하게 갱신하는 패턴이다. 여러 필드를 일관되게 다룰 때 유용하다.",
    "chapter": "react-03",
    "track": "react"
  },
  {
    "term": "합성 이벤트(SyntheticEvent)",
    "def": "React가 브라우저의 네이티브 이벤트를 감싸 제공하는 통일된 이벤트 객체다. e.target, e.currentTarget, e.preventDefault(), e.stopPropagation() 등 브라우저 간 일관된 공통 API를 제공한다.",
    "chapter": "react-04",
    "track": "react"
  },
  {
    "term": "useState",
    "def": "함수형 컴포넌트에서 상태 변수와 setter 함수를 반환하는 훅이다. setter를 호출하면 상태가 갱신되고 컴포넌트가 재렌더링되어 UI가 최신 상태로 동기화된다.",
    "chapter": "react-04",
    "track": "react"
  },
  {
    "term": "useEffect",
    "def": "렌더링 이후 실행되는 부수 효과(데이터 fetch, 이벤트 구독, DOM 조작)를 정의하는 훅이다. 정리(clean-up) 함수를 반환해 구독 해제로 메모리 누수를 방지할 수 있다.",
    "chapter": "react-04",
    "track": "react"
  },
  {
    "term": "의존성 배열(Dependency Array)",
    "def": "useEffect의 두 번째 인자로 effect 실행 시점을 제어한다. 빈 배열[]은 마운트 시 1회, [value]는 값 변경 시, 생략은 매 렌더링마다 실행된다.",
    "chapter": "react-04",
    "track": "react"
  },
  {
    "term": "Context API",
    "def": "props drilling 없이 전역 상태를 공유하는 React 내장 기능이다. createContext로 컨텍스트를 만들고 Provider의 value로 값을 공급하며 useContext로 구독한다.",
    "chapter": "react-04",
    "track": "react"
  },
  {
    "term": "Lifting State Up(상태 끌어올리기)",
    "def": "여러 자식이 같은 상태를 필요로 할 때 그 상태를 공통 부모로 올리고, 부모가 상태 변경 함수를 props로 자식에게 전달하는 패턴이다.",
    "chapter": "react-04",
    "track": "react"
  },
  {
    "term": "useCallback",
    "def": "함수를 메모이제이션해 렌더링마다 같은 함수 참조를 재사용하게 하는 훅이다. React.memo로 감싼 자식의 불필요한 재렌더링을 막을 때 사용한다.",
    "chapter": "react-04",
    "track": "react"
  },
  {
    "term": "디바운스(Debounce)",
    "def": "입력이 멈춘 뒤 일정 시간(예: 300ms)이 지나야 작업을 실행하는 기법이다. useEffect와 setTimeout/clearTimeout으로 구현해 매 타이핑마다 API를 호출하지 않게 한다.",
    "chapter": "react-04",
    "track": "react"
  },
  {
    "term": "fetch",
    "def": "브라우저 내장 비동기 HTTP API로, 추가 의존성 없이 요청을 보낸다. HTTP 에러(404, 500 등)도 reject하지 않으므로 response.ok를 직접 확인하고 response.json()으로 본문을 파싱해야 한다.",
    "chapter": "react-05",
    "track": "react"
  },
  {
    "term": "axios",
    "def": "추가 기능이 풍부한 HTTP 클라이언트 라이브러리로, 응답을 자동으로 response.data에 파싱해 준다. 인터셉터, baseURL·timeout 설정, axios.create() 인스턴스 등 고급 기능을 제공한다.",
    "chapter": "react-05",
    "track": "react"
  },
  {
    "term": "AbortController",
    "def": "진행 중인 fetch 요청을 도중에 중단(취소)할 수 있게 해주는 브라우저 내장 객체다. signal을 fetch에 넘기고 abort()를 호출하면 요청이 취소되며, 타임아웃 자동 취소에도 사용된다.",
    "chapter": "react-05",
    "track": "react"
  },
  {
    "term": "useApi 커스텀 훅",
    "def": "data·loading·error 세 가지 상태를 묶어 관리하는 공통 API 호출 훅이다. useEffect 안에서 비동기 함수를 호출하고 cancelled 플래그로 언마운트 후 setState를 방지한다.",
    "chapter": "react-05",
    "track": "react"
  },
  {
    "term": "localStorage 영속성",
    "def": "브라우저에 데이터를 문자열로 저장해 새로고침 후에도 유지하는 저장소다. 객체·배열은 JSON.stringify로 저장하고 JSON.parse로 복원하며, useState 지연 초기화나 useEffect로 자동 저장을 구현한다.",
    "chapter": "react-05",
    "track": "react"
  },
  {
    "term": "JWT 토큰",
    "def": "로그인 성공 시 서버가 발급하는 인증 토큰으로, header.payload.signature 형태를 갖는다. localStorage 등에 저장한 뒤 이후 요청의 Authorization 헤더에 Bearer로 실어 인증 상태를 유지한다.",
    "chapter": "react-05",
    "track": "react"
  },
  {
    "term": "AuthContext / AuthProvider",
    "def": "Context API로 토큰·사용자 정보·isAuth·login·logout을 앱 전역에 공급하는 인증 상태 관리 구조다. useAuth 커스텀 훅으로 어디서든 인증 정보를 가져올 수 있다.",
    "chapter": "react-05",
    "track": "react"
  },
  {
    "term": "ProtectedRoute",
    "def": "인증 여부(isAuth)를 확인해 인증된 경우 Outlet으로 자식 라우트를 렌더링하고, 아니면 Navigate로 /login으로 리다이렉트하는 보호 라우트 컴포넌트다.",
    "chapter": "react-05",
    "track": "react"
  },
  {
    "term": "도메인 중심 폴더 설계",
    "def": "관심사(UI 레이어)가 아닌 user·product·order 같은 비즈니스 도메인 단위로 파일과 컴포넌트를 그룹화하는 구조다. 관련 코드의 응집도를 높여 변경에 강하고 대규모 프로젝트의 유지보수성을 향상시킨다.",
    "chapter": "react-06",
    "track": "react"
  },
  {
    "term": "Container vs Presentational 패턴",
    "def": "Container는 상태·데이터 로직을 담당하고 Presentational은 전달받은 props만으로 UI를 그리는 순수 표시 컴포넌트다. 책임을 분리해 테스트와 재사용성을 높인다.",
    "chapter": "react-06",
    "track": "react"
  },
  {
    "term": "SPA(단일 페이지 애플리케이션)",
    "def": "최초 1회만 앱을 로드한 뒤 서버에서 전체 페이지가 아니라 필요한 데이터만 받아 클라이언트에서 DOM을 갱신하는 방식이다. 빠른 전환을 주지만 초기 번들 크기·SEO·히스토리 처리를 고려해야 한다.",
    "chapter": "react-06",
    "track": "react"
  },
  {
    "term": "React.lazy + Suspense",
    "def": "동적 import로 페이지 단위 코드 분할(코드 스플리팅)을 하는 기능이다. 해당 경로에 들어갈 때 비로소 코드를 불러와 초기 번들을 줄이며, Suspense는 로딩 중 fallback UI를 보여준다.",
    "chapter": "react-06",
    "track": "react"
  },
  {
    "term": "Link / NavLink",
    "def": "<a> 대신 쓰는 SPA 네비게이션 컴포넌트로 새로고침 없이 URL만 바꿔 라우트를 렌더링한다. NavLink는 isActive를 제공해 현재 경로 메뉴를 자동으로 하이라이트할 수 있다.",
    "chapter": "react-06",
    "track": "react"
  },
  {
    "term": "useNavigate / useLocation",
    "def": "useNavigate는 이벤트·로직에서 프로그래밍적으로 경로 이동을 수행하는 훅으로 replace·state 옵션을 받는다. useLocation은 현재 URL 정보와 navigate로 전달된 state를 읽는다.",
    "chapter": "react-06",
    "track": "react"
  },
  {
    "term": "Outlet과 중첩 라우팅",
    "def": "부모 라우트가 공통 레이아웃(헤더·탭 등)을 제공하고 Outlet 자리에 매칭된 자식 라우트가 렌더링되는 구조다. index 라우트는 부모 경로와 정확히 일치할 때 보여줄 기본 자식을 지정한다.",
    "chapter": "react-06",
    "track": "react"
  },
  {
    "term": "useParams / useSearchParams",
    "def": "useParams는 /products/:id 같은 동적 경로의 파라미터 값을 객체로 읽는 훅이다. useSearchParams는 ?q=react&page=2 같은 쿼리스트링을 읽고 써서 상태를 URL에 보관한다.",
    "chapter": "react-06",
    "track": "react"
  },
  {
    "term": "공통 컴포넌트화",
    "def": "여러 파일에 반복되는 비슷한 UI나 로직을 하나의 재사용 가능한 컴포넌트(또는 훅)로 추출하는 리팩토링 기법이다. 재사용성과 테스트성을 높이고 한 곳에서 공통 동작을 관리할 수 있다.",
    "chapter": "react-07",
    "track": "react"
  },
  {
    "term": "커스텀 훅",
    "def": "네트워크 호출, 포맷 변환, 로컬스토리지 동기화 같은 반복 로직을 use 접두사 함수로 분리한 것이다. 컴포넌트는 비즈니스 로직과 렌더링을 분리해 선언적으로 사용할 수 있다.",
    "chapter": "react-07",
    "track": "react"
  },
  {
    "term": "상태 끌어올리기(Lift state up)",
    "def": "여러 하위 컴포넌트가 같은 데이터를 필요로 할 때 공통 조상으로 상태를 올리고 변경 함수를 props로 내려주는 패턴이다. 전달 단계가 길어지면 Context나 전역 상태 도구로 대체한다.",
    "chapter": "react-07",
    "track": "react"
  },
  {
    "term": "useReducer",
    "def": "(상태, 액션)을 받아 새 상태를 반환하는 순수 함수 reducer와 dispatch를 사용해 복잡한 상태 로직을 액션 패턴으로 관리하는 훅이다. 상태 변경이 예측 가능하고 테스트하기 쉬워진다.",
    "chapter": "react-07",
    "track": "react"
  },
  {
    "term": "배럴 파일(index.js re-export)",
    "def": "도메인 폴더에 index.js를 두어 내부 파일들을 한곳에서 다시 내보내는 단일 진입점이다. 내부 파일이 이동해도 외부 import 구문이 유지되어 리팩토링 영향 범위를 줄인다.",
    "chapter": "react-07",
    "track": "react"
  },
  {
    "term": "코드 스플리팅(React.lazy + Suspense)",
    "def": "React.lazy와 동적 import()로 컴포넌트를 별도 청크로 분리하고 Suspense의 fallback으로 로딩 중 화면을 보여주는 기법이다. 초기 번들 크기를 줄여 첫 로드 성능을 개선한다.",
    "chapter": "react-07",
    "track": "react"
  },
  {
    "term": "빌드타임 vs 런타임 환경변수",
    "def": "빌드타임 변수는 번들에 하드코딩되고(CRA는 REACT_APP_, Vite는 VITE_ 접두사) 런타임 변수는 서버나 edge에서 읽힌다. 민감한 시크릿은 번들에 넣지 말고 서버리스 함수로 프록시해야 안전하다.",
    "chapter": "react-07",
    "track": "react"
  },
  {
    "term": "husky + lint-staged",
    "def": "husky는 깃 훅을 관리하고 lint-staged는 커밋 직전 변경된 파일만 대상으로 ESLint·Prettier를 실행한다. 개발 흐름을 방해하지 않으면서 코드 스타일을 강제할 수 있다.",
    "chapter": "react-07",
    "track": "react"
  },
  {
    "term": "목록/상세 컴포넌트 분리",
    "def": "목록 화면은 각 항목을 카드나 리스트로 표시하는 List 컴포넌트로, 상세 화면은 선택된 항목 데이터를 props로 받는 Detail 컴포넌트로 분리하는 설계다. 재사용성을 높이고 화면 전환 흐름을 직관적으로 구성한다.",
    "chapter": "react-08",
    "track": "react"
  },
  {
    "term": "조건부 렌더링",
    "def": "loading, error, 데이터 유무 같은 조건에 따라 화면을 다르게 그리는 기법이다. && 단축 평가로 특정 조건일 때만 렌더링하거나 삼항 연산자로 목록/상세 중 하나만 렌더링한다.",
    "chapter": "react-08",
    "track": "react"
  },
  {
    "term": "loading/error 상태 처리",
    "def": "비동기 요청 시 useState로 loading과 error 상태를 두고, 요청 시작 시 로딩을 켜고 finally에서 끄며 실패 시 사용자 친화적 에러 메시지를 저장하는 패턴이다. 안정적인 데이터 동기화를 보장한다.",
    "chapter": "react-08",
    "track": "react"
  },
  {
    "term": "axios vs fetch",
    "def": "fetch는 브라우저 내장으로 가볍고 설치가 필요 없으나 응답을 res.json()으로 수동 파싱한다. axios는 JSON 자동 변환, 요청/응답 인터셉터, 타임아웃 설정을 제공해 실무에서 선호된다.",
    "chapter": "react-08",
    "track": "react"
  },
  {
    "term": "함수형 업데이트",
    "def": "setItems(prev => [...prev, item])처럼 직전 상태(prev)를 인자로 받아 새 상태를 계산하는 setState 방식이다. 항상 최신 상태를 기준으로 안전하게 갱신해 stale 상태 참조 문제를 방지한다.",
    "chapter": "react-08",
    "track": "react"
  },
  {
    "term": "useParams",
    "def": "react-router-dom의 훅으로 /detail/:id 같은 URL 경로의 동적 파라미터 값을 읽어온다. 추출한 id로 해당 항목의 상세 데이터를 조회하는 데 사용한다.",
    "chapter": "react-08",
    "track": "react"
  },
  {
    "term": "key prop",
    "def": "배열을 map으로 렌더링할 때 React가 각 목록 항목을 구분하기 위해 부여하는 고유값이다. 보통 service.id나 acc.id 같은 고유 식별자를 사용한다.",
    "chapter": "react-08",
    "track": "react"
  },
  {
    "term": "빈 데이터 방어 코드",
    "def": "데이터가 null/undefined이거나 길이가 0이면 안내 문구를 조기 반환해 빈 화면이나 오류를 방지하는 예외 처리다. 목록과 상세 컴포넌트 시작부에서 검사한다.",
    "chapter": "react-08",
    "track": "react"
  },
  {
    "term": "FastAPI",
    "def": "Python 기반의 현대적 웹 API 프레임워크로, 비동기(async/await) 처리, 타입 힌트 기반 자동 검증, Swagger/ReDoc 자동 문서 생성을 지원한다. AI 모델을 감싸는 마이크로서비스를 빠르게 구축하는 데 최적화되어 있다.",
    "chapter": "ai-01",
    "track": "ai"
  },
  {
    "term": "생성형 AI(Generative AI)",
    "def": "텍스트, 이미지, 오디오 등 기존에 없던 새로운 콘텐츠를 생성하는 AI다. 데이터의 내재적 분포를 학습해 새로운 샘플을 만들어내며, 입력을 분류·예측하는 전통적 판별 모델과 구분된다.",
    "chapter": "ai-01",
    "track": "ai"
  },
  {
    "term": "Hugging Face",
    "def": "'AI의 GitHub'라 불리는 AI 플랫폼으로, Model Hub, Dataset Hub, Spaces를 제공한다. 2018년 Transformers 라이브러리를 오픈소스로 공개하며 AI 기술의 민주화를 핵심 철학으로 삼는다.",
    "chapter": "ai-01",
    "track": "ai"
  },
  {
    "term": "Transformers 라이브러리",
    "def": "Hugging Face의 핵심 Python 라이브러리로, 수백 가지 사전 학습 모델을 단일 API로 사용할 수 있게 해준다. pipeline() 함수로 모델 로드·전처리·추론·후처리를 한 번에 처리한다.",
    "chapter": "ai-01",
    "track": "ai"
  },
  {
    "term": "pipeline()",
    "def": "transformers의 고수준 함수로, 태스크명만 주면 해당 태스크의 기본 모델을 자동으로 내려받아 전처리·추론·후처리를 한 줄로 묶어 실행한다. 결과는 보통 딕셔너리 리스트 형태로 반환된다.",
    "chapter": "ai-01",
    "track": "ai"
  },
  {
    "term": "Hugging Face Spaces",
    "def": "Gradio, Streamlit, Docker 등으로 만든 AI 데모 웹 앱을 무료로 호스팅하는 서비스다. Git push 시 자동 빌드·배포되며, 무료 CPU 티어와 유료 GPU 티어를 제공한다.",
    "chapter": "ai-01",
    "track": "ai"
  },
  {
    "term": "uvicorn",
    "def": "FastAPI 앱을 구동하는 ASGI 서버다. 'uvicorn main:app --reload' 형태로 실행하며, --reload는 코드 변경 시 자동 재시작을 제공해 개발에 사용된다.",
    "chapter": "ai-01",
    "track": "ai"
  },
  {
    "term": "Pydantic / BaseModel",
    "def": "FastAPI의 핵심 의존성으로, BaseModel을 상속해 요청·응답 데이터 구조를 정의하면 자동으로 검증·직렬화·문서화가 처리된다.",
    "chapter": "ai-01",
    "track": "ai"
  },
  {
    "term": "pipeline()",
    "def": "transformers의 고수준 API로, 파사드 패턴을 추론 흐름에 적용해 모델 식별·토크나이저 로드·모델 로드·전처리·추론·후처리를 한 번에 처리한다. 태스크명만으로 적합한 기본 모델을 자동 선택한다.",
    "chapter": "ai-02",
    "track": "ai"
  },
  {
    "term": "AutoTokenizer",
    "def": "모델에 맞는 토크나이저를 자동으로 선택·로드하는 클래스다. 텍스트를 input_ids와 attention_mask 등 모델이 이해하는 숫자 토큰 시퀀스로 변환한다.",
    "chapter": "ai-02",
    "track": "ai"
  },
  {
    "term": "AutoModelForCausalLM",
    "def": "다음 토큰을 예측하는 자기회귀(생성형) 모델용 클래스로, GPT 계열 텍스트 생성에 사용된다. KoGPT2 같은 한국어 생성 모델 로드에도 쓰인다.",
    "chapter": "ai-02",
    "track": "ai"
  },
  {
    "term": "text-generation",
    "def": "주어진 프롬프트 뒤에 이어지는 텍스트를 자동 생성하는 태스크다. GPT 계열 모델이 특화되어 있으며, 반환값의 'generated_text' 키에 프롬프트와 생성문 전체가 담긴다.",
    "chapter": "ai-02",
    "track": "ai"
  },
  {
    "term": "KoGPT2",
    "def": "SKT가 공개한 한국어 GPT-2 모델(skt/kogpt2-base-v2, 125M)로, 한국어 위키 및 웹 문서로 학습되었다. 특수 토큰을 명시적으로 지정해 직접 로드하는 것이 권장된다.",
    "chapter": "ai-02",
    "track": "ai"
  },
  {
    "term": "temperature / top-k / top-p",
    "def": "텍스트 생성의 다양성을 조절하는 디코딩 하이퍼파라미터다. temperature는 무작위성을, top-k는 상위 k개 토큰을, top-p(nucleus)는 누적 확률 p 이내 토큰만 샘플링 대상으로 제한한다.",
    "chapter": "ai-02",
    "track": "ai"
  },
  {
    "term": "save_pretrained() / from_pretrained()",
    "def": "from_pretrained()는 모델·토크나이저를 Hub나 로컬에서 로드하고, save_pretrained()는 현재 로드된 모델·토크나이저를 지정 디렉터리에 저장한다. 오프라인 사용이나 버전 고정에 활용된다.",
    "chapter": "ai-02",
    "track": "ai"
  },
  {
    "term": "device 파라미터",
    "def": "pipeline()의 실행 장치를 지정하는 옵션으로, -1은 CPU, 0은 첫 번째 GPU(cuda:0), 'mps'는 Apple Silicon GPU를 의미한다. GPU 사용 시 추론 속도가 크게 향상된다.",
    "chapter": "ai-02",
    "track": "ai"
  },
  {
    "term": "T5 (Text-to-Text Transfer Transformer)",
    "def": "모든 NLP 태스크를 텍스트→텍스트 변환 문제로 통일한 Google의 Seq2Seq 모델이다. 입력 앞에 'summarize:', 'translate:' 같은 태스크 prefix를 붙여 수행할 작업을 모델에 전달한다.",
    "chapter": "ai-03",
    "track": "ai"
  },
  {
    "term": "MarianMT",
    "def": "Helsinki-NLP가 OPUS 병렬 코퍼스로 학습해 공개한 Transformer 기반 신경망 기계 번역 모델이다. 'Helsinki-NLP/opus-mt-{소스}-{목적}' 패턴으로 언어 쌍마다 별도 모델을 제공하며 MarianTokenizer(SentencePiece)를 사용한다.",
    "chapter": "ai-03",
    "track": "ai"
  },
  {
    "term": "FAISS",
    "def": "문서 임베딩 벡터를 색인하고 유사도가 높은 벡터를 빠르게 검색하는 라이브러리다. sentence-transformers로 만든 문장 임베딩과 결합해 문서 유사도 검색 API를 구현하는 데 사용된다.",
    "chapter": "ai-03",
    "track": "ai"
  },
  {
    "term": "생성 전략 (Decoding Strategy)",
    "def": "언어 모델이 다음 토큰을 고르는 방식으로, 생성 텍스트의 품질과 다양성을 좌우한다. Greedy/Beam Search는 결정론적·고품질에, Top-k/Top-p 샘플링과 Temperature는 다양성·창의성 조절에 쓰인다.",
    "chapter": "ai-03",
    "track": "ai"
  },
  {
    "term": "FastAPI 라우터(APIRouter)와 Pydantic 스키마",
    "def": "APIRouter는 prefix와 tags로 엔드포인트를 그룹화하고, Pydantic BaseModel은 요청/응답 JSON을 자동 검증·직렬화하며 Swagger 문서를 생성한다. Field 제약(min_length, ge/le 등)으로 입력 유효성을 강제한다.",
    "chapter": "ai-03",
    "track": "ai"
  },
  {
    "term": "lifespan / startup 이벤트",
    "def": "FastAPI에서 서버가 뜰 때 한 번 실행되는 비동기 컨텍스트 매니저로, 무거운 NLP 모델을 미리 메모리에 로드하고 FAISS 인덱스를 구축해 첫 요청 지연을 없앤다. yield 이후 코드는 서버 종료 시 실행된다.",
    "chapter": "ai-03",
    "track": "ai"
  },
  {
    "term": "무상태(Stateless) 챗봇",
    "def": "각 API 요청을 이전 대화 이력 없이 독립적으로 처리하는 구조다. 서버 상태 관리가 불필요해 구현이 단순하고 수평 확장이 용이하지만 문맥 연속성은 지원하지 않는다.",
    "chapter": "ai-03",
    "track": "ai"
  },
  {
    "term": "num_beams (Beam Search)",
    "def": "여러 후보 시퀀스를 동시에 탐색하는 빔 수를 지정하는 생성 파라미터다. 값이 클수록 번역·요약 품질이 높아지지만 연산 속도는 느려지며, 요약에서는 보통 4~6이 균형점으로 권장된다.",
    "chapter": "ai-03",
    "track": "ai"
  },
  {
    "term": "Stable Diffusion (잠재 확산 모델, LDM)",
    "def": "텍스트 프롬프트로 이미지를 생성하는 잠재 확산 모델이다. 픽셀 공간이 아닌 압축된 잠재 공간에서 확산을 수행해 계산 효율이 높으며, CLIP·UNet·VAE 세 신경망이 협력한다.",
    "chapter": "ai-04",
    "track": "ai"
  },
  {
    "term": "UNet (Denoising Network)",
    "def": "잠재 벡터에 추가된 가우시안 노이즈를 단계적으로 예측·제거하는 신경망이다. 텍스트 임베딩과 Cross-Attention으로 결합되어 프롬프트 조건에 맞는 이미지를 생성한다.",
    "chapter": "ai-04",
    "track": "ai"
  },
  {
    "term": "VAE (Variational AutoEncoder)",
    "def": "잠재 공간과 픽셀 공간을 변환하는 모듈이다. Encoder는 실제 이미지를 4×64×64 잠재 벡터로 압축하고, Decoder는 최종 잠재 벡터를 512×512 RGB 픽셀 이미지로 복원한다.",
    "chapter": "ai-04",
    "track": "ai"
  },
  {
    "term": "CLIP Text Encoder",
    "def": "입력 프롬프트를 토큰화해 768/1024차원 의미 벡터로 변환하는 인코더다. 이 텍스트 임베딩이 UNet의 Cross-Attention을 통해 이미지 생성을 유도한다.",
    "chapter": "ai-04",
    "track": "ai"
  },
  {
    "term": "Classifier-Free Guidance (guidance_scale)",
    "def": "이미지 품질과 프롬프트 충실도를 조절하는 CFG 스케일 파라미터다. 값이 높으면 프롬프트에 가깝지만 다양성이 줄고, 낮으면 자유롭지만 프롬프트에서 벗어날 수 있어 보통 7~8을 쓴다.",
    "chapter": "ai-04",
    "track": "ai"
  },
  {
    "term": "diffusers / StableDiffusionPipeline",
    "def": "Hugging Face의 확산 모델 전용 라이브러리와 그 기본 txt2img 파이프라인이다. from_pretrained()로 텍스트 인코더·UNet·VAE·스케줄러를 한 번에 구성해 프롬프트로 이미지를 생성한다.",
    "chapter": "ai-04",
    "track": "ai"
  },
  {
    "term": "ControlNet",
    "def": "원본 UNet 가중치를 동결하고 학습 가능한 복사본으로 조건 신호를 주입해 생성 이미지의 구조·포즈·깊이를 정밀 제어하는 기법이다. Canny·OpenPose·Depth 등 조건 맵별 모델을 사용한다.",
    "chapter": "ai-04",
    "track": "ai"
  },
  {
    "term": "fp16 / xFormers 메모리 최적화",
    "def": "GPU VRAM과 속도를 개선하는 기법들이다. fp16(torch.float16)은 메모리를 절반으로 줄이고 속도를 높이며, xFormers는 메모리 효율적 Attention 커널로 VRAM 20~30%를 추가 절감한다.",
    "chapter": "ai-04",
    "track": "ai"
  },
  {
    "term": "Whisper",
    "def": "OpenAI가 2022년 공개한 다국어 음성 인식(ASR) 모델로, 68만 시간의 오디오로 학습된 Transformer 기반 Encoder-Decoder 구조이며 99개 언어를 지원한다.",
    "chapter": "ai-05",
    "track": "ai"
  },
  {
    "term": "ASR (자동 음성 인식)",
    "def": "Automatic Speech Recognition의 약자로, 음성(오디오)을 텍스트로 변환하는 기술이다. Whisper가 대표적인 모델이다.",
    "chapter": "ai-05",
    "track": "ai"
  },
  {
    "term": "TTS (음성 합성)",
    "def": "Text-To-Speech의 약자로, 텍스트를 자연스러운 음성 오디오로 변환하는 기술이다. 이 장에서는 Bark와 SpeechT5로 구현한다.",
    "chapter": "ai-05",
    "track": "ai"
  },
  {
    "term": "Suno Bark",
    "def": "Suno AI가 2023년 공개한 오픈소스 TTS 모델로, 다양한 음성 캐릭터와 [laughter], [sighs] 같은 특수 태그를 통한 감정·비언어 사운드 표현이 가능하지만 속도가 느리다.",
    "chapter": "ai-05",
    "track": "ai"
  },
  {
    "term": "SpeechT5",
    "def": "Microsoft의 T5 기반 음성 합성 모델로, Bark보다 모델 크기가 작고 처리 속도가 빠르며, HiFi-GAN 보코더와 화자 임베딩을 사용해 음성을 생성한다.",
    "chapter": "ai-05",
    "track": "ai"
  },
  {
    "term": "Log-Mel Spectrogram",
    "def": "Whisper가 오디오를 인코더에 입력하기 전 변환하는 형식으로, 16kHz 모노 오디오를 80채널, 30초 단위의 스펙트로그램으로 표현한 것이다.",
    "chapter": "ai-05",
    "track": "ai"
  },
  {
    "term": "UploadFile",
    "def": "FastAPI에서 업로드된 파일을 비동기로 처리하는 클래스로, filename·content_type 등 메타데이터에 접근하고 await file.read()로 내용을 bytes로 읽을 수 있다.",
    "chapter": "ai-05",
    "track": "ai"
  },
  {
    "term": "StreamingResponse",
    "def": "FastAPI에서 오디오 등의 데이터를 디스크에 저장하지 않고 메모리 버퍼에서 바로 스트리밍 응답으로 반환할 때 사용하는 응답 클래스이다.",
    "chapter": "ai-05",
    "track": "ai"
  },
  {
    "term": "이미지 분류 (Image Classification)",
    "def": "입력된 이미지가 어떤 카테고리(클래스)에 속하는지 판별하는 가장 기본적인 컴퓨터 비전 태스크로, ResNet·ViT·ConvNeXt 등의 모델이 사용된다.",
    "chapter": "ai-06",
    "track": "ai"
  },
  {
    "term": "ViT (Vision Transformer)",
    "def": "NLP에서 성공한 Transformer 구조를 이미지에 적용한 모델로, 이미지를 패치로 나눠 자기 어텐션으로 처리하며 대규모 데이터에서 CNN을 능가한다.",
    "chapter": "ai-06",
    "track": "ai"
  },
  {
    "term": "YOLOv8",
    "def": "Ultralytics가 2023년 발표한 1-Stage 객체 탐지 모델로, 단일 네트워크로 바운딩 박스와 클래스를 동시에 예측하며 객체 탐지·세그멘테이션·포즈 추정 등을 지원한다.",
    "chapter": "ai-06",
    "track": "ai"
  },
  {
    "term": "객체 탐지 (Object Detection)",
    "def": "이미지 내 여러 객체의 위치(바운딩 박스)와 클래스를 동시에 예측하는 태스크로, IoU와 NMS가 핵심 알고리즘이다.",
    "chapter": "ai-06",
    "track": "ai"
  },
  {
    "term": "NMS (Non-Maximum Suppression)",
    "def": "객체 탐지에서 같은 객체에 대해 겹치는 중복 박스를 IoU 기준으로 제거해 가장 신뢰도 높은 박스만 남기는 후처리 알고리즘이다.",
    "chapter": "ai-06",
    "track": "ai"
  },
  {
    "term": "BLIP",
    "def": "Salesforce가 2022년 발표한 멀티모달 모델로, ViT 비전 인코더와 BERT 계열 언어 모델을 결합해 이미지 캡셔닝과 시각 질의응답(VQA)을 수행한다.",
    "chapter": "ai-06",
    "track": "ai"
  },
  {
    "term": "이미지 캡셔닝 (Image Captioning)",
    "def": "이미지를 입력받아 그 내용을 설명하는 자연어 문장을 생성하는 멀티모달 태스크로, 대체 텍스트 생성이나 이미지 검색 메타데이터 생성에 활용된다.",
    "chapter": "ai-06",
    "track": "ai"
  },
  {
    "term": "Jinja2",
    "def": "Python 생태계에서 가장 널리 쓰이는 HTML 템플릿 엔진으로, FastAPI는 Jinja2Templates 클래스를 통해 템플릿 렌더링을 지원한다.",
    "chapter": "ai-06",
    "track": "ai"
  },
  {
    "term": "CLIP",
    "def": "OpenAI가 발표한 멀티모달 모델로, 이미지 인코더와 텍스트 인코더를 함께 학습해 이미지와 텍스트를 동일한 벡터 공간에 매핑한다. 대조 학습으로 의미가 일치하는 이미지-텍스트 쌍은 가깝게, 무관한 쌍은 멀게 배치한다.",
    "chapter": "ai-07",
    "track": "ai"
  },
  {
    "term": "대조 학습 (Contrastive Learning)",
    "def": "배치 내 N개의 이미지-텍스트 쌍에서 대각선에 위치한 일치 쌍의 코사인 유사도는 최대화하고 불일치 쌍은 최소화하도록 학습하는 방식이다. CLIP의 핵심 학습 원리다.",
    "chapter": "ai-07",
    "track": "ai"
  },
  {
    "term": "Zero-shot 전이 학습",
    "def": "별도의 파인튜닝 없이 텍스트 레이블만 작성하면 새로운 분류 태스크를 즉시 수행하는 능력이다. CLIP은 이미지 벡터와 'a photo of [class]' 텍스트 벡터를 비교해 분류한다.",
    "chapter": "ai-07",
    "track": "ai"
  },
  {
    "term": "코사인 유사도",
    "def": "두 벡터 간 의미적 유사성을 -1~1 사이 값으로 나타내며 1에 가까울수록 유사하다. L2 정규화된 벡터에서는 단순 내적(dot product)으로 계산된다.",
    "chapter": "ai-07",
    "track": "ai"
  },
  {
    "term": "LLaVA",
    "def": "CLIP ViT-L/14 비전 인코더를 MLP Projection으로 LLM(Vicuna 등)에 연결한 멀티모달 대화 모델이다. 이미지를 보고 설명하거나 질문에 답하는 VQA를 수행한다.",
    "chapter": "ai-07",
    "track": "ai"
  },
  {
    "term": "MLP Projection",
    "def": "LLaVA에서 비전 인코더의 이미지 패치 임베딩을 LLM의 토큰 임베딩과 동일한 차원(예: 4096)으로 투영하는 2-layer 신경망이다. 이미지와 텍스트를 같은 공간에서 처리하게 한다.",
    "chapter": "ai-07",
    "track": "ai"
  },
  {
    "term": "moondream2",
    "def": "약 1.8B 파라미터의 초경량 멀티모달 모델로 VRAM 약 3GB에서, 심지어 CPU에서도 동작한다. encode_image와 answer_question으로 이미지 질의응답을 처리한다.",
    "chapter": "ai-07",
    "track": "ai"
  },
  {
    "term": "UploadFile + Form",
    "def": "FastAPI에서 multipart/form-data로 이미지 파일(UploadFile)과 텍스트 질문(Form)을 함께 받는 조합이다. 단 이 경우 JSON body(Pydantic 모델) 파라미터와는 혼용할 수 없다.",
    "chapter": "ai-07",
    "track": "ai"
  },
  {
    "term": "Uvicorn",
    "def": "ASGI 서버로 단일 이벤트 루프에서 비동기 요청을 처리한다. 비동기 I/O에는 효율적이지만 단일 프로세스라 CPU 집약적인 AI 추론에서는 병목이 되어 운영 단독 사용에는 부적합하다.",
    "chapter": "ai-08",
    "track": "ai"
  },
  {
    "term": "Gunicorn",
    "def": "여러 워커를 독립 프로세스로 띄우는 프리포크(pre-fork) 워커 매니저다. UvicornWorker와 결합해 멀티 프로세스 병렬 처리, 워커 자동 재시작, 무중단 재시작을 제공한다.",
    "chapter": "ai-08",
    "track": "ai"
  },
  {
    "term": "워커 수 권장식",
    "def": "일반 API의 권장 워커 수는 'CPU 코어 수 × 2 + 1'이다. 단, 워커마다 모델이 메모리에 올라가는 AI 서비스에서는 워커 수 × 모델 VRAM이 전체 VRAM을 넘지 않도록 보수적으로 설정한다.",
    "chapter": "ai-08",
    "track": "ai"
  },
  {
    "term": "Pydantic Settings",
    "def": "BaseSettings를 상속해 클래스 필드를 환경변수나 .env 파일에서 자동으로 채우는 설정 관리 방식이다. .env 파일만 교체해 개발/스테이징/운영 환경을 분리한다.",
    "chapter": "ai-08",
    "track": "ai"
  },
  {
    "term": "Hugging Face Spaces",
    "def": "Gradio나 Streamlit 앱을 git push만으로 자동 빌드·배포하는 무료/저비용 호스팅 플랫폼이다. 무료 플랜은 공개 저장소만 가능하고 48시간 미사용 시 슬립된다. app.py, requirements.txt, README.md가 핵심 파일이다.",
    "chapter": "ai-08",
    "track": "ai"
  },
  {
    "term": "Docker 이미지/컨테이너",
    "def": "이미지는 컨테이너의 읽기 전용 설계도/스냅샷이고, 컨테이너는 이미지를 실행한 격리된 인스턴스다. 복잡한 AI 의존성(패키지·CUDA 버전)을 어디서나 동일하게 실행되게 한다.",
    "chapter": "ai-08",
    "track": "ai"
  },
  {
    "term": "멀티 스테이지 빌드",
    "def": "빌드용 스테이지에서 패키지를 설치하고 실행용 slim 스테이지로 필요한 결과물만 복사하는 Dockerfile 기법이다. 빌드 도구를 최종 이미지에서 제외해 크기를 40~60% 줄인다.",
    "chapter": "ai-08",
    "track": "ai"
  },
  {
    "term": "Docker Compose",
    "def": "여러 컨테이너를 하나의 YAML 파일로 정의해 함께 실행하는 도구다. FastAPI 앱 + Nginx 리버스 프록시 + Prometheus + Grafana를 한 번에 구성·기동할 수 있다.",
    "chapter": "ai-08",
    "track": "ai"
  },
  {
    "term": "버전 관리(Version Control)",
    "def": "파일의 변경 이력을 시간순으로 기록하고 추적하는 시스템. 이력 추적, 협업, 안전망이라는 세 가지 핵심 가치를 제공한다.",
    "chapter": "ops-01",
    "track": "ops"
  },
  {
    "term": "스냅샷(snapshot)",
    "def": "Git이 변경을 저장할 때 바뀐 줄만이 아니라 그 시점의 프로젝트 전체 상태를 사진처럼 찍어 기록하는 방식. 누가·언제·무엇을·왜 바꿨는지가 함께 남아 특정 시점으로 정확히 되돌아갈 수 있다.",
    "chapter": "ops-01",
    "track": "ops"
  },
  {
    "term": "스테이징 영역(Staging Area)",
    "def": "다음 커밋에 포함할 변경을 모아 두는 중간 대기실. 이 단계 덕분에 변경 중 일부만 골라서 커밋할 수 있다.",
    "chapter": "ops-01",
    "track": "ops"
  },
  {
    "term": "브랜치(Branch)",
    "def": "메인 코드를 건드리지 않고 새로운 작업을 위한 평행 세계를 만드는 기능. 작업을 독립 공간에 격리했다가 끝나면 병합(merge)으로 합친다.",
    "chapter": "ops-01",
    "track": "ops"
  },
  {
    "term": "병합 충돌(merge conflict)",
    "def": "두 브랜치가 같은 파일의 같은 부분을 다르게 고쳐 Git이 스스로 판단할 수 없을 때 발생한다. 에러가 아니라 사람이 결정해 달라는 정상적인 협업 과정이다.",
    "chapter": "ops-01",
    "track": "ops"
  },
  {
    "term": "원격 저장소(remote)와 origin",
    "def": "인터넷의 GitHub 등에 있는 저장소가 원격이며, 로컬과 연결한 기본 별칭을 관례적으로 origin이라 부른다. 코드를 올릴 땐 push, 받을 땐 pull을 사용한다.",
    "chapter": "ops-01",
    "track": "ops"
  },
  {
    "term": "Pull Request(PR)",
    "def": "\"내 변경을 합쳐 주세요\"라고 보내는 제안이자 코드 리뷰 요청. Fork→Branch→Push→PR→Review&Merge로 이어지는 표준 협업 흐름의 핵심 단계다.",
    "chapter": "ops-01",
    "track": "ops"
  },
  {
    "term": "git revert",
    "def": "특정 커밋의 변경을 취소하는 새 커밋을 만들어 안전하게 되돌리는 명령. 이력을 지우지 않으므로 이미 공개(push)한 공유 브랜치에서도 안전하다.",
    "chapter": "ops-01",
    "track": "ops"
  },
  {
    "term": "FastAPI",
    "def": "고성능 Python 웹 프레임워크로, 이 챗봇에서 백엔드 API 서버 역할을 한다.",
    "chapter": "ops-02",
    "track": "ops"
  },
  {
    "term": "Uvicorn",
    "def": "FastAPI 애플리케이션을 실행하는 ASGI 서버. `uvicorn main:app` 형태로 main 모듈의 app 객체를 구동한다.",
    "chapter": "ops-02",
    "track": "ops"
  },
  {
    "term": "Gradio",
    "def": "머신러닝 모델의 웹 UI를 빠르게 만들 수 있는 라이브러리. `gr.ChatInterface`로 채팅형 화면을 자동 생성한다.",
    "chapter": "ops-02",
    "track": "ops"
  },
  {
    "term": "transformers",
    "def": "Hugging Face의 사전 학습된 AI 모델을 불러오고 사용하는 핵심 라이브러리. AutoTokenizer와 AutoModelForCausalLM 등을 제공한다.",
    "chapter": "ops-02",
    "track": "ops"
  },
  {
    "term": "4-bit 양자화 / bitsandbytes",
    "def": "모델 가중치를 4-bit로 로드해 메모리 사용량을 크게 줄이는 경량화 기술로, bitsandbytes 라이브러리와 BitsAndBytesConfig로 설정한다. load_in_4bit=True가 핵심 옵션이다.",
    "chapter": "ops-02",
    "track": "ops"
  },
  {
    "term": "NF4(Normal Float 4)",
    "def": "BitsAndBytesConfig의 bnb_4bit_quant_type=\"nf4\"로 지정하는 4-bit 양자화 방식으로, 4-bit 중 성능이 가장 우수하다.",
    "chapter": "ops-02",
    "track": "ops"
  },
  {
    "term": "gr.mount_gradio_app",
    "def": "Gradio UI를 FastAPI 애플리케이션의 특정 경로(여기서는 루트 \"/\")에 마운트하여 하나의 포트에서 API와 챗봇 화면을 동시에 구동하게 하는 함수다.",
    "chapter": "ops-02",
    "track": "ops"
  },
  {
    "term": "허깅페이스 스페이스(Hugging Face Spaces)",
    "def": "무료로 AI 애플리케이션을 배포·공유할 수 있는 플랫폼. Docker SDK로 배포하며 기본적으로 7860 포트를 외부에 노출한다.",
    "chapter": "ops-02",
    "track": "ops"
  },
  {
    "term": "EC2",
    "def": "AWS에서 제공하는 가상 서버 인스턴스로, 이 장에서는 Ubuntu 기반 인스턴스를 생성하여 웹 서비스를 배포하는 기반으로 사용합니다.",
    "chapter": "ops-03",
    "track": "ops"
  },
  {
    "term": "탄력적 IP(Elastic IP)",
    "def": "EC2에 부여하는 고정 공인 IP 주소입니다. 기본 EC2는 재시작 시마다 공인 IP가 바뀌므로 안정적인 웹 서비스 운영을 위해 탄력적 IP를 할당합니다.",
    "chapter": "ops-03",
    "track": "ops"
  },
  {
    "term": "키 페어(.pem)",
    "def": "EC2 SSH 접속에 필요한 RSA 개인 키 파일입니다. 분실 시 재발급이 불가능하므로 안전한 곳에 보관해야 하며, 접속 전 chmod 400으로 권한을 제한해야 합니다.",
    "chapter": "ops-03",
    "track": "ops"
  },
  {
    "term": "보안 그룹",
    "def": "EC2 인스턴스의 방화벽 역할을 하는 설정으로, 원격 접속과 웹 서비스 노출을 위해 SSH(22), HTTP(80), HTTPS(443) 포트를 열어야 합니다.",
    "chapter": "ops-03",
    "track": "ops"
  },
  {
    "term": "Docker",
    "def": "컨테이너 기반 가상화 도구로, Java·Python·Nginx 등을 서버에 직접 설치하지 않고도 컨테이너로 모든 실행 환경을 구성할 수 있게 해줍니다.",
    "chapter": "ops-03",
    "track": "ops"
  },
  {
    "term": "docker-compose.yml",
    "def": "여러 컨테이너(서비스)를 한 파일에 정의하여 한 번에 실행하는 Docker Compose 설정 파일로, db·backend·frontend 같은 서비스를 services 아래에 선언합니다.",
    "chapter": "ops-03",
    "track": "ops"
  },
  {
    "term": "DockerHub",
    "def": "Docker 이미지를 저장·공유하는 온라인 레지스트리로, docker compose up 실행 시 로컬에 없는 이미지를 자동으로 내려받는 출처가 됩니다.",
    "chapter": "ops-03",
    "track": "ops"
  },
  {
    "term": "WinSCP",
    "def": "Windows용 GUI 기반 SFTP 클라이언트로, 마우스 드래그 앤 드롭으로 EC2 서버에 파일을 전송하고 내장 터미널로 명령어를 실행할 수 있습니다.",
    "chapter": "ops-03",
    "track": "ops"
  },
  {
    "term": "Nginx",
    "def": "정적 파일 서빙과 리버스 프록시에 사용하는 웹 서버로, 기본 정적 파일 제공 디렉터리는 /var/www/html입니다.",
    "chapter": "ops-04",
    "track": "ops"
  },
  {
    "term": "/var/www/html",
    "def": "Nginx가 기본적으로 정적 파일을 제공하는 디렉터리입니다. WinSCP 업로드 권한 오류를 막기 위해 chown으로 ubuntu 계정에 소유권을 부여합니다.",
    "chapter": "ops-04",
    "track": "ops"
  },
  {
    "term": "npm run build",
    "def": "Vite 또는 Webpack으로 Vue.js 개발 코드를 최적화·압축하는 프로덕션 빌드 명령으로, 결과물은 dist 폴더에 생성됩니다.",
    "chapter": "ops-04",
    "track": "ops"
  },
  {
    "term": "try_files (Vue Router 설정)",
    "def": "Nginx의 요청 처리 지시어로, `try_files $uri $uri/ /index.html`로 설정하면 존재하지 않는 경로에서 404 대신 index.html을 반환해 SPA 새로고침 404를 방지합니다.",
    "chapter": "ops-04",
    "track": "ops"
  },
  {
    "term": "Spring Boot 실행 .jar",
    "def": "Gradle 빌드로 build/libs/에 생성되는 파일로, plain이 붙지 않은 jar가 내장 Tomcat을 포함한 실행 가능한 배포용 파일입니다.",
    "chapter": "ops-04",
    "track": "ops"
  },
  {
    "term": "Zulu OpenJDK 21",
    "def": "Azul Systems가 배포하는 Java 21 OpenJDK로, Java 17 이상을 요구하는 Spring Boot 3 실행을 위해 EC2에 설치합니다.",
    "chapter": "ops-04",
    "track": "ops"
  },
  {
    "term": "nohup ... &",
    "def": "터미널 연결이 끊겨도(nohup) 프로세스를 계속, 백그라운드(&)에서 실행하는 명령으로 .jar를 무중단 실행하며 로그는 nohup.out에 저장됩니다.",
    "chapter": "ops-04",
    "track": "ops"
  },
  {
    "term": "리버스 프록시(proxy_pass)",
    "def": "80번 포트로 들어온 요청을 서버 내부 8080번(Spring Boot)으로 전달하는 Nginx 설정으로, 사용자가 포트 번호 없이 표준 주소로 접속할 수 있게 합니다.",
    "chapter": "ops-04",
    "track": "ops"
  },
  {
    "term": "Nginx 통합 라우팅",
    "def": "Nginx가 80번 포트에서 모든 요청을 받아 화면 요청(/)은 Vue.js 정적 파일로, API 요청(/api/)은 백엔드 포트로 분기하는 단일 진입점 구조다. 세 가지 배포 시나리오가 공통으로 사용한다.",
    "chapter": "ops-05",
    "track": "ops"
  },
  {
    "term": "try_files",
    "def": "Nginx에서 요청 경로의 파일이 없을 때 index.html로 폴백시키는 설정이다. Vue Router 같은 SPA 경로에서 새로고침해도 404가 발생하지 않게 막아 준다.",
    "chapter": "ops-05",
    "track": "ops"
  },
  {
    "term": "proxy_pass",
    "def": "Nginx 리버스 프록시 지시어로, 특정 경로의 요청을 내부 백엔드 주소로 전달한다. 7장에서는 localhost:8080, 컨테이너 환경에서는 backend 같은 서비스명을 대상으로 쓴다.",
    "chapter": "ops-05",
    "track": "ops"
  },
  {
    "term": "Dockerfile",
    "def": "도커 이미지를 빌드하기 위한 명령어 모음 파일이다. FROM(베이스 이미지), WORKDIR, COPY, EXPOSE, CMD 등으로 애플리케이션을 컨테이너 이미지로 패키징한다.",
    "chapter": "ops-05",
    "track": "ops"
  },
  {
    "term": "멀티 스테이지 빌드",
    "def": "하나의 Dockerfile에서 빌드 단계와 실행 단계를 분리하는 방식이다. Node.js로 dist를 만든 뒤 결과물만 경량 Nginx 이미지에 복사해 최종 이미지 크기를 크게 줄인다.",
    "chapter": "ops-05",
    "track": "ops"
  },
  {
    "term": "DockerHub",
    "def": "도커 이미지를 업로드·공유하는 중앙 레지스트리다. 로컬에서 docker push로 이미지를 올리고 EC2에서 docker compose가 자동으로 pull해 실행한다.",
    "chapter": "ops-05",
    "track": "ops"
  },
  {
    "term": "docker-compose.yml",
    "def": "여러 컨테이너(db·backend·frontend)를 하나의 파일로 정의·오케스트레이션하는 설정이다. 이미지·환경변수·포트·볼륨·의존 관계를 선언하고 docker compose up으로 한 번에 실행한다.",
    "chapter": "ops-05",
    "track": "ops"
  },
  {
    "term": "명명 볼륨(pgdata)",
    "def": "docker-compose에서 PostgreSQL 데이터를 /var/lib/postgresql/data에 영구 보존하는 볼륨이다. 컨테이너가 삭제·재시작돼도 DB 데이터가 유지된다.",
    "chapter": "ops-05",
    "track": "ops"
  },
  {
    "term": "MSA(마이크로서비스 아키텍처)",
    "def": "일반 비즈니스 로직을 담당하는 Spring Boot와 AI 추론을 담당하는 FastAPI를 분리해 운영하는 구조다. Nginx가 경로에 따라 각 백엔드로 요청을 분기한다.",
    "chapter": "ops-06",
    "track": "ops"
  },
  {
    "term": "Nginx 경로 분기(/, /api/, /ai/)",
    "def": "Nginx가 80번 포트에서 /는 Vue.js 화면, /api/는 Spring Boot(8080), /ai/는 FastAPI(8000)로 분기하는 MSA 라우팅 핵심이다.",
    "chapter": "ops-06",
    "track": "ops"
  },
  {
    "term": "환경 변수 DB 접속(os.getenv)",
    "def": "FastAPI가 DB 접속 주소를 코드에 박지 않고 os.getenv(\"DATABASE_URL\")로 읽는 방식이다. 로컬·서버·도커 환경마다 코드 수정 없이 접속 정보만 주입해 바꿀 수 있다.",
    "chapter": "ops-06",
    "track": "ops"
  },
  {
    "term": "모노레포(Monorepo)",
    "def": "backend(FastAPI)와 frontend(Vue.js)를 하나의 저장소 안에 폴더로 분리하고 최상위에 docker-compose.yml을 두는 프로젝트 구성 방식이다.",
    "chapter": "ops-06",
    "track": "ops"
  },
  {
    "term": "/api/status (SELECT 1)",
    "def": "FastAPI의 상태 점검 엔드포인트로, engine.connect() 후 SELECT 1 쿼리를 실행한다. 성공하면 DB 연결이 정상이라고 판단해 ok를 응답한다.",
    "chapter": "ops-06",
    "track": "ops"
  },
  {
    "term": "상대 경로 API 호출(/api/status)",
    "def": "Vue.js가 백엔드 주소를 직접 쓰지 않고 /api/status 같은 상대 경로로 fetch하는 방식이다. Nginx가 경로를 보고 백엔드로 라우팅하므로 백엔드 주소가 바뀌어도 프론트 코드를 고칠 필요가 없다.",
    "chapter": "ops-06",
    "track": "ops"
  },
  {
    "term": "이중 프록시 Dockerfile",
    "def": "Vue.js 이미지의 Nginx 설정에서 /api/는 spring-backend:8080, /ai/는 fastapi-backend:8000으로 전달하는 구성이다. 컨테이너 간 통신이라 proxy_pass 대상에 서비스명을 사용한다.",
    "chapter": "ops-06",
    "track": "ops"
  },
  {
    "term": "docker compose(4중 컨테이너)",
    "def": "PostgreSQL·Spring Boot·FastAPI·Vue(+Nginx) 네 컨테이너를 하나의 docker-compose.yml로 정의해 docker compose up -d로 한 번에 실행하는 MSA 배포 방식이다.",
    "chapter": "ops-06",
    "track": "ops"
  }
];

export const quizOf = (chapterId) => QUIZZES[chapterId] || [];
export const TOTAL_QUIZ = Object.values(QUIZZES).reduce((n,a)=>n+a.length,0);
export const TOTAL_TERMS = GLOSSARY.length;
