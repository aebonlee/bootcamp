# 4장. 상태관리 및 데이터 연동

이번 장은 React 애플리케이션에서 핵심이 되는 상태 관리와 데이터 연동을 심도 있게 다루며, 이벤트 처리 메커니즘을 통한 사용자 입력 제어, useState·useEffect 훅을 활용한 동적 상태 갱신과 비동기 처리, Context API를 통한 전역 상태 공유까지 학습함으로써 실무 애플리케이션에서 일관된 데이터 흐름과 효율적인 상태 관리 구조를 구현할 수 있는 기초와 응용 능력을 동시에 습득한다.

## 4.1 이벤트 처리 메커니즘

React의 이벤트 처리 메커니즘은 DOM 이벤트를 캡슐화한 합성 이벤트(Synthetic Event)를 기반으로 동작하며, onClick·onChange와 같은 표준 이벤트 속성, 이벤트 핸들러 함수 연결 방식, 입력값에 따른 상태 갱신, 상위-하위 컴포넌트 간 함수 전달 구조까지 이해함으로써 UI와 데이터 상태를 자연스럽게 연결하는 기반을 마련한다.

### (1) onClick, onChange 등의 이벤트 구조

React는 W3C 표준을 따르는 합성 이벤트 시스템으로 동작하며, onClick·onChange·onSubmit 등과 같은 속성을 통해 이벤트를 처리하여 브라우저 간 일관된 동작과 성능 최적화를 동시에 제공한다.

#### ① 핵심 개념

React는 브라우저의 네이티브 이벤트를 감싸 `SyntheticEvent`라는 통일된 객체로 제공해, `e.target`, `e.currentTarget`, `e.preventDefault()`, `e.stopPropagation()` 등의 공통 API를 사용하게 한다.

내부적으로는 이벤트 위임(일괄 리스너 등록 — 보통 루트 컨테이너에 등록) 방식으로 많은 DOM 요소에 개별 리스너를 붙이지 않아도 되게 처리한다(구현 세부는 React 버전·렌더러에 따라 다름).

React의 `<input>`/`<textarea>`의 `onChange`의 경우 사용자가 값을 입력할 때마다(사실상 `input` 이벤트처럼) 호출된다 — 브라우저 `change`와 일대일 대응이 아니라 React가 정한 의미를 가진다.

#### ② 주요 속성 및 메서드

- `e.target` : 이벤트가 발생한 실제 DOM 요소(입력값을 읽을 때는 `e.target.value` 사용).
- `e.currentTarget` : 이벤트 리스너가 바인딩된 요소(버블링/위임을 고려할 때 유용).
- `e.preventDefault()` : 폼 제출 등 브라우저 기본 동작 방지.
- `e.stopPropagation()` : 이벤트 전파(버블링) 중지.

#### ③ 예제

```jsx
// 합성 이벤트(SyntheticEvent) 객체를 다루는 기본 예제 컴포넌트
function Example(){
  // 버튼 클릭 시 실행되는 이벤트 핸들러, 인자 e가 바로 합성 이벤트 객체
  const handleClick = (e) => {
    console.log('type:', e.type); // e.type은 이벤트 종류 문자열 → 여기선 "click"
    // 필요한 값은 즉시 복사
    // 비동기 콜백에서 안전하게 쓰려면 핸들러 내부에서 바로 값을 지역변수로 꺼내 둔다
    const tag = e.currentTarget.tagName; // currentTarget = 리스너가 붙은 요소(button), tagName은 "BUTTON"
    console.log(tag);
  };
  // onClick에 핸들러 "참조"만 전달(호출하지 않음). 클릭 시 React가 대신 호출해 줌
  return <button onClick={handleClick}>클릭</button>;
}
```

#### ④ 주의사항

이벤트 객체를 비동기 콜백(예: `setTimeout`)에서 사용하려면 필요한 속성(`e.target.value`)을 즉시 지역변수로 복사해서 사용하세요. (과거 React에서는 이벤트 객체가 재사용될 수 있었고, 안전을 위해 값을 복사하는 습관이 유용함.)

`onChange`는 React에서 controlled input에 쓰이는 표준이며, `value`와 함께 쓰지 않으면 예상치 못한 동작이 발생할 수 있음.

### (2) 이벤트 핸들러 선언 및 연결 방식

이벤트 핸들러는 일반 함수 또는 화살표 함수로 선언되어 JSX 요소의 속성에 직접 연결되며, 인자 전달과 this 바인딩 문제를 해결해 컴포넌트의 동작을 깔끔하게 정의할 수 있는 핵심적인 구조를 형성한다.

#### ① 함수 선언 방식

함수형 컴포넌트

```jsx
// 함수형 컴포넌트에서는 핸들러를 화살표 함수 변수로 선언하는 것이 일반적
const handleClick = (e) => { /* ... */ }; // e는 합성 이벤트 객체
// JSX 속성에 핸들러 참조를 그대로 연결 (this 바인딩 걱정 없음)
<button onClick={handleClick}>...</button>
```

클래스형 컴포넌트

```jsx
// 클래스형 컴포넌트 예시 — React.Component를 상속
class C extends React.Component {
  // 클래스 필드 + 화살표 함수로 정의하면 this가 자동으로 인스턴스에 고정됨
  handleClick = (e) => { /* arrow property: this 바인딩 해결 */ }
  // render()에서 this.handleClick으로 메서드 참조를 onClick에 연결
  render(){ return <button onClick={this.handleClick}>OK</button> }
}
```

또는 생성자에서 `this.handleClick = this.handleClick.bind(this)`로 바인딩.

#### ② 파라미터 전달 방법

화살표 함수로 래핑 (가장 흔함)

```jsx
// 클릭 시점에 handleDelete(id)가 실행되도록 화살표 함수로 감싼다
// () => ... 형태이므로 렌더링 때 즉시 실행되지 않고, 클릭할 때만 호출됨
<button onClick={() => handleDelete(id)}>삭제</button>
```

`bind` 사용

```jsx
// bind(null, id)는 첫 인자로 id가 미리 채워진 새 함수를 만들어 준다
// 첫 번째 인자 null은 this 지정(여기선 불필요해서 null)
<button onClick={handleDelete.bind(null, id)}>삭제</button>
```

주의: `onClick={handleDelete(id)}`처럼 직접 호출하면 렌더링 시 함수가 즉시 실행되므로 피해야 함.

#### ③ 성능 고려

JSX 내부에 `() => fn(arg)`를 자주 사용하면 매 렌더링마다 새 함수가 생성되어 하위 컴포넌트에 prop으로 전달될 때 불필요한 재렌더링을 유발할 수 있음.

해결책: `useCallback`으로 핸들러를 메모이제이션하거나, 하위 컴포넌트를 `React.memo`로 감싸 비교를 통해 불필요 렌더를 막음.

```jsx
// useCallback: 함수를 메모이제이션해 렌더링마다 같은 함수 참조를 재사용
// setTodos((t) => ...): 이전 상태 t를 받아 id가 일치하지 않는 항목만 남겨 삭제 처리
// 두 번째 인자 []: 의존성이 없으므로 함수는 최초 1회만 생성됨
const onRemove = useCallback((id) => setTodos(t => t.filter(x => x.id !== id)), []);
```

#### ④ 클래스의 this 문제

클래스에서 `handleClick()`을 메서드로 선언하면 `this`가 undefined가 될 수 있으니 바인딩 필요.

화살표 메서드(`handleClick = () => `)를 사용하면 바인딩 문제 없음.

### (3) 사용자 입력에 따른 상태 변경 실습

입력창이나 버튼 클릭 이벤트 발생 시 useState로 관리되는 상태 값을 업데이트하여 화면을 즉시 갱신하고, 이를 통해 React의 단방향 데이터 흐름과 UI 반영 원리를 실습할 수 있다.

#### ① Controlled Component (권장 패턴)

입력의 값(`value`)을 컴포넌트 상태로 보관하고, `onChange`에서 이 상태를 갱신하면 UI가 상태를 반영한다.

예:

```jsx
// 제어 컴포넌트(Controlled Component): 입력값을 React 상태가 단일 출처로 관리
function NameInput(){
  // name: 입력 상태값, setName: 갱신 함수, 초기값은 빈 문자열
  const [name, setName] = useState('');
  return (
    <input
      value={name} // input의 표시값을 상태 name에 묶음 → 상태가 곧 화면값
      onChange={(e) => setName(e.target.value)} // 타이핑마다 입력값으로 상태 갱신 → 재렌더링
      placeholder="이름 입력" // 값이 비어 있을 때 보이는 안내 문구
    />
  );
}
```

장점: 입력값 검증, 포맷 변환, 폼 초기화가 쉬움.

#### ② Uncontrolled Component (ref 사용)

간단한 경우 DOM ref로 값을 읽는 방법도 있음:

```jsx
// 비제어 컴포넌트: 상태 대신 DOM 노드를 직접 참조해 값을 읽음
const ref = useRef(); // DOM 요소를 가리킬 ref 객체 생성
<input ref={ref} /> // 이 input의 실제 DOM이 ref.current에 연결됨
// onSubmit에서 ref.current.value 읽기  // 제출 시점에 입력값을 한 번에 꺼내 사용
```

그러나 복잡한 폼에서는 controlled가 더 안전.

#### ③ 폼 제출 제어

`<form onSubmit={handleSubmit}>`에서 `e.preventDefault()`를 사용하여 페이지 리로드를 막고, 상태로 값 처리:

```jsx
// 폼 제출 핸들러
function handleSubmit(e){
  e.preventDefault(); // 폼 기본 동작(페이지 새로고침)을 막아 SPA 흐름 유지
  // 상태값 사용  // 여기서 상태에 보관된 입력값으로 실제 처리(서버 전송 등) 수행
}
```

#### ④ 실시간 유효성 검사 / 즉시 피드백

`onChange`에서 유효성 검사를 하여 에러 메시지를 상태로 저장하고 UI에 보여준다.

예: 이메일 포맷 검사, 최소 길이 검사 등.

#### ⑤ 비동기 입력 처리 (디바운스 예시 — 검색박스)

사용자가 타이핑할 때마다 API 콜을 하지 않도록 디바운스:

```jsx
// q: 검색어 상태값, setQ: 갱신 함수
const [q, setQ] = useState('');
useEffect(() => {
  // 입력이 멈춘 뒤 300ms 후에만 검색을 실행하도록 타이머 예약(디바운스)
  const id = setTimeout(() => { doSearch(q); }, 300);
  // 정리 함수: q가 바뀌어 effect가 다시 실행되기 전 이전 타이머를 취소 → 마지막 입력만 검색
  return () => clearTimeout(id);
}, [q]); // q가 바뀔 때마다 effect 재실행
```

주의: `doSearch`는 `useCallback`으로 고정하거나 의존성에 맞춰 관리.

### (4) 함수 전달 구조 이해

상위 컴포넌트에서 정의한 함수를 props를 통해 하위 컴포넌트에 전달하여 하위 컴포넌트의 이벤트 발생이 상위 상태를 변경하도록 설계함으로써 컴포넌트 간 데이터 흐름과 제어 권한을 명확히 이해할 수 있다.

#### ① Lifting State Up 패턴

상태가 여러 자식에 의해 필요하면 그 상태를 공통 부모로 올리고, 부모는 상태 변경 함수(예: `addItem`, `removeItem`)를 정의해 자식에 props로 전달한다.

예:

```jsx
// 부모 컴포넌트: 공유가 필요한 상태(items)를 보유 (상태 끌어올리기)
function Parent(){
  const [items, setItems] = useState([]); // 항목 배열 상태, 초기값은 빈 배열
  // 항목 추가 함수: 이전 배열 s에 새 객체를 펼쳐 추가, id는 현재 시각으로 생성
  const addItem = (t) => setItems(s => [...s, { id: Date.now(), text: t }]);
  return <ChildForm onAdd={addItem} />; // 자식에게 상태 변경 함수를 prop으로 내려줌
}
// 자식 컴포넌트: props로 받은 onAdd를 호출해 부모 상태를 변경
function ChildForm({ onAdd }) { /* onAdd('hello') */ } // 자식의 이벤트가 부모 상태를 바꾸는 구조
```

#### ② 인자(값) 전달 방식

하위에서 상위로는 값(value) 또는 식별자(id)를 전달하는 것이 일반적(예: `onRemove(id)`).

가능한 경우 이벤트 객체 대신 필요한 값만 전달하라 (`onChange`에서 `e.target.value` 대신 `onChangeValue(value)` 호출) — 이렇게 하면 하위 컴포넌트가 상위의 내부 구현(이벤트 객체)에 종속되지 않음.

#### ③ prop drilling 문제와 해결

여러 중첩 컴포넌트를 통해 동일 콜백을 전달하면 코드가 지저분해짐 → 해결책:

- Context API로 전역/중간 단계 생략
- 컴포지션(Children as Function / render props)
- 상태관리 라이브러리 (Zustand, Redux 등)

#### ④ 성능 고려 및 메모이제이션

부모가 `onChange` 함수를 재생성하면 `React.memo`로 감싼 자식도 재렌더링됨. 이를 막으려면 부모에서 `useCallback`을 사용:

```jsx
// useCallback으로 삭제 함수를 메모이제이션 → 매 렌더링마다 새 함수가 생기지 않음
// 이전 상태 s에서 id가 일치하지 않는 항목만 남겨 해당 항목을 제거
// []: 의존성이 없어 함수 참조가 항상 동일하게 유지됨(자식 불필요 재렌더 방지)
const onRemove = useCallback((id) => setItems(s => s.filter(x => x.id !== id)), []);
```

그러나 무분별한 `useCallback` 사용은 코드 복잡성만 늘리므로, 실제로 성능 이슈가 증명될 때 적용하라.

#### ⑤ 패턴 예제 — Todo

- 부모: `todos`, `addTodo`, `removeTodo`, `toggleTodo` 보유
- 하위 `AddTodo`: `onAdd` prop으로 문자열 받음
- 하위 `TodoItem`: `onRemove`, `onToggle` prop 받아 UI 이벤트 발생 시 호출

#### ⑥ 테스트와 타입 안정성

Prop으로 전달되는 함수의 시그니처를 명확히 문서화/타입화(TypeScript)하면 하위 컴포넌트 작성자가 올바른 인자를 넘겨줄 수 있음.

테스트: RTL(React Testing Library)에서 `fireEvent.click` 호출 후 상위 상태 변화가 일어나는지 검증.

### (5) 이벤트 처리 메커니즘 실습

React의 합성 이벤트(Synthetic Event), onClick/onChange/onSubmit 사용법, 이벤트 핸들러 선언·연결, 상위→하위 함수 전달 구조를 실습으로 익히는 예제 앱입니다. 간단한 Todo 앱을 통해 입력 이벤트와 버튼 클릭 이벤트로 상태를 변경하고, 하위 컴포넌트에서 상위 함수 호출로 상태를 제어하는 패턴을 보여줍니다.

프로젝트 디렉터리 구조

```
ex01-event-handling/
├─ package.json
├─ vite.config.js
├─ index.html
├─ public/
│  └─ favicon.ico
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ styles.css
│  └─ components/
│       ├─ TodoApp.jsx
│       ├─ AddTodo.jsx
│       ├─ TodoList.jsx
│       └─ TodoItem.jsx
└─ README.md
```

#### ① 빠른 시작 명령 (터미널 명령어)

```bash
# 1) 프로젝트 생성 폴더로 이동한 뒤
# (폴더명이 ex01-event-handling일 때)
npm init -y                 # 기본 package.json을 자동 생성(-y는 모든 질문에 yes)
# package.json을 아래 내용으로 덮어쓰기(또는 수동 편집)

# 2) 의존성 설치
npm install react react-dom # 런타임 의존성: React 본체와 DOM 렌더러 설치
npm install -D vite         # 개발 의존성(-D): 빌드/개발 서버 도구 Vite 설치

# 3) 개발 서버 실행
npx vite                    # 로컬에 설치된 vite를 직접 실행해 개발 서버 구동
# 또는 package.json scripts 후
npm run dev                 # package.json의 "dev" 스크립트(=vite)를 실행
```

(아래 package.json 스니펫을 사용하면 npm install 후 npm run dev 로 개발 서버 실행 가능)

#### ② package.json

```json
{
  "name": "ex01-event-handling",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "vite": "^5.4.8"
  }
}
```

#### ③ vite.config.js

```js
// Vite 설정 헬퍼 — 타입 추론과 자동완성을 제공
import { defineConfig } from 'vite';
// React용 플러그인 — JSX 변환과 빠른 새로고침(HMR) 지원
import react from '@vitejs/plugin-react';

// 설정 객체를 export default로 내보내면 Vite가 이를 읽어 사용
export default defineConfig({
  plugins: [react()] // React 플러그인 활성화 → .jsx 처리 가능
});
```

#### ④ index.html

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8" /> <!-- 문자 인코딩을 UTF-8로 지정(한글 깨짐 방지) -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <!-- 반응형: 기기 너비에 맞춰 화면 배율 설정 -->
    <title>ex01 - Event Handling</title> <!-- 브라우저 탭에 표시될 제목 -->
  </head>
  <body>
    <div id="root"></div> <!-- React 앱이 마운트될 빈 컨테이너(루트 요소) -->
    <script type="module" src="/src/main.jsx"></script> <!-- ES 모듈로 진입점 스크립트 로드 -->
  </body>
</html>
```

#### ⑤ src/main.jsx

```jsx
import React from 'react'
import { createRoot } from 'react-dom/client' // React 18의 새 루트 생성 API
import App from './App' // 최상위 앱 컴포넌트
import './styles.css' // 전역 스타일 시트 적용

// index.html의 #root 요소를 찾아 React 루트를 만들고 App을 렌더링
createRoot(document.getElementById('root')).render(
  <React.StrictMode> {/* 개발 중 잠재적 문제를 경고해 주는 검사 모드(렌더 2회 실행 등) */}
    <App />
  </React.StrictMode>
)
```

#### ⑥ src/App.jsx

```jsx
import React from 'react'
import TodoApp from './components/TodoApp' // 실제 Todo 로직을 담은 컴포넌트

// 앱의 최상위 레이아웃을 그리는 컴포넌트
export default function App(){
  return (
    <div className="app"> {/* JSX에서는 class 대신 className 사용 */}
      <header>
        <h1>ex01 - 이벤트 처리 실습 (Todo)</h1>
        <p>onChange, onClick, onSubmit, 그리고 상위→하위 함수 전달 예제입니다.</p>
      </header>
      <main>
        <TodoApp /> {/* 상태와 이벤트 로직을 담당하는 핵심 컴포넌트 배치 */}
      </main>
    </div>
  )
}
```

#### ⑦ src/styles.css

```css
/* :root에 CSS 변수를 선언해 색상 등을 한 곳에서 관리 */
:root{ --bg:#f6f8fa; --card:#fff; --muted:#666; }
/* 전역 폰트/여백 초기화 및 배경색을 변수로 지정 */
body{ font-family: Inter, Roboto, system-ui, -apple-system; margin:0; background:var(--bg); color:#111 }
/* 앱 전체 컨테이너: 최대 너비 제한 + 가운데 정렬 */
.app{ max-width:800px; margin:40px auto; padding:24px; }
header h1{ margin:0 0 6px 0 } /* 제목 아래 여백만 살짝 줌 */
/* 카드 박스: 흰 배경, 둥근 모서리, 은은한 그림자 */
.card{ background:var(--card); border-radius:8px; padding:16px; box-shadow:0 6px 18px rgba(0,0,0,.06) }
/* 입력+버튼을 가로로 나란히 배치하는 행(flex) */
.form-row{ display:flex; gap:8px; margin-bottom:12px }
.input{ flex:1; padding:8px 10px; border:1px solid #ddd; border-radius:6px } /* flex:1로 남는 공간을 입력창이 차지 */
/* 기본 버튼 스타일: 파란 배경, 흰 글자, 클릭 커서 */
.btn{ padding:8px 12px; border:none; background:#2274e1; color:#fff; border-radius:6px; cursor:pointer }
.btn:disabled{ opacity:.6 } /* 비활성화 시 흐리게 표시 */
.todo-list{ margin-top:12px }
/* 할 일 항목: 좌우 양끝 정렬 + 아래 구분선 */
.todo-item{ display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #f0f0f0 }
.todo-item:last-child{ border-bottom:none } /* 마지막 항목은 구분선 제거 */
.small{ font-size:13px; color:var(--muted) } /* 보조 텍스트(작고 흐린 색) */
```

#### ⑧ src/components/TodoApp.jsx

```jsx
import React, { useState, useCallback } from 'react'
import AddTodo from './AddTodo'
import TodoList from './TodoList'

// 부모 컴포넌트: 상태 보유 및 하위로 함수 전달
export default function TodoApp(){
  // todos: 할 일 목록 상태, 초기값으로 항목 2개를 가진 배열 지정
  const [todos, setTodos] = useState([
    { id: 1, text: 'React 학습', done: false },
    { id: 2, text: '이벤트 처리 예제 만들기', done: false }
  ])

  // 추가 함수: 하위 컴포넌트에서 호출됨
  const addTodo = useCallback((text) => {
    if(!text || !text.trim()) return; // 빈 문자열/공백만 입력되면 추가하지 않음(방어 코드)
    // 이전 상태 s를 펼치고 끝에 새 항목 추가, id는 고유값으로 현재 시각 사용
    setTodos((s) => [
      ...s,
      { id: Date.now(), text: text.trim(), done: false } // trim()으로 앞뒤 공백 제거
    ])
  }, []) // 의존성 [] → 함수 참조 고정(자식 불필요 재렌더 방지)

  // 삭제 함수: 하위 컴포넌트에서 호출됨
  const removeTodo = useCallback((id) => {
    // filter로 전달받은 id와 다른 항목만 남겨 해당 항목 제거
    setTodos((s) => s.filter(t => t.id !== id))
  }, [])

  // 완료 토글 함수 (파라미터 전달 예시)
  const toggleDone = useCallback((id) => {
    // map으로 순회하며 id가 일치하는 항목의 done만 반전, 나머지는 그대로 유지
    setTodos((s) => s.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }, [])

  return (
    <div className="card">
      <AddTodo onAdd={addTodo} /> {/* 추가 함수를 자식에 prop으로 전달 */}
      <div className="small">총 항목: {todos.length}</div> {/* 현재 항목 개수 표시 */}
      {/* 목록과 함께 삭제/토글 함수를 자식에 전달 */}
      <TodoList todos={todos} onRemove={removeTodo} onToggle={toggleDone} />
    </div>
  )
}
```

#### ⑨ src/components/AddTodo.jsx

```jsx
import React, { useState } from 'react'

// 하위 컴포넌트: 입력과 제출 처리, 상위 onAdd 호출
// props로 부모의 추가 함수 onAdd를 구조 분해로 받음
export default function AddTodo({ onAdd }){
  const [text, setText] = useState('') // 입력창의 값을 담는 지역 상태

  // onChange 핸들러: 합성 이벤트의 event.target.value 사용
  const handleChange = (e) => {
    setText(e.target.value) // 사용자가 친 글자로 상태 갱신 → 제어 컴포넌트 유지
  }

  // onSubmit 핸들러: 폼 제출 기본 동작 막기
  const handleSubmit = (e) => {
    e.preventDefault() // 브라우저 기본 폼 제출을 막음 (페이지 새로고침 방지)
    onAdd(text)        // 부모의 추가 함수 호출 → 부모 상태에 항목 추가
    setText('')        // 입력창 비우기(다음 입력 준비)
  }

  return (
    // 폼 제출(Enter 또는 버튼) 시 handleSubmit 실행
    <form onSubmit={handleSubmit} className="form-row" aria-label="add-todo-form">
      <input
        className="input"
        value={text}            // 입력값을 상태와 묶음(제어 컴포넌트)
        onChange={handleChange} // onChange 연결 → 타이핑마다 상태 갱신
        placeholder="할 일을 입력하고 Enter 또는 추가 버튼"
        aria-label="새 할 일 입력" // 스크린리더용 접근성 라벨
      />
      {/* 입력이 공백뿐이면 disabled로 버튼 비활성화 */}
      <button type="submit" className="btn" disabled={!text.trim()}>추가</button>
    </form>
  )
}
```

#### ⑩ src/components/TodoList.jsx

```jsx
import React from 'react'
import TodoItem from './TodoItem'

// 목록 컴포넌트: 부모에게서 받은 todos 배열과 두 콜백을 전달받음
export default function TodoList({ todos, onRemove, onToggle }){
  // 항목이 하나도 없으면 안내 문구만 렌더링(조기 반환)
  if(!todos.length) return <div className="small">할 일이 없습니다.</div>
  return (
    <div className="todo-list">
      {/* 배열을 map으로 순회하며 각 항목을 TodoItem으로 렌더링 */}
      {todos.map(t => (
        // key: React가 목록 항목을 구분하는 고유 식별자(필수)
        // todo와 콜백들을 그대로 자식에 내려줌
        <TodoItem key={t.id} todo={t} onRemove={onRemove} onToggle={onToggle} />
      ))}
    </div>
  )
}
```

#### ⑪ src/components/TodoItem.jsx

```jsx
import React from 'react'

// 개별 항목 컴포넌트: todo 데이터와 삭제/토글 콜백을 받음
export default function TodoItem({ todo, onRemove, onToggle }){
  const { id, text, done } = todo // todo 객체에서 필요한 값 구조 분해

  // onClick에 파라미터 전달하는 방법: 화살표 함수로 래핑
  // 클릭 시 이 항목의 id를 부모 삭제 함수에 넘김
  const handleRemove = () => onRemove(id)
  const handleToggle = (e) => {
    // 이벤트 객체가 필요하면 e 사용 가능 (예: e.stopPropagation())
    onToggle(id) // 이 항목의 id로 완료 상태 토글 요청
  }

  return (
    <div className="todo-item" role="listitem"> {/* role: 접근성용 리스트 항목 역할 명시 */}
      <div>
        {/* 체크박스 상태를 done과 묶고, 변경 시 토글 핸들러 호출 */}
        <input type="checkbox" checked={done} onChange={handleToggle} aria-label={`완료 ${text}`} />
        {/* 완료된 항목은 취소선 스타일 적용 */}
        <span style={{ marginLeft:8, textDecoration: done ? 'line-through' : 'none' }}>{text}</span>
      </div>
      <div>
        <button onClick={handleRemove} className="btn">삭제</button> {/* 클릭 시 이 항목 삭제 */}
      </div>
    </div>
  )
}
```

#### ⑫ 실행 및 테스트

1. `npm install` (package.json 준비 후)
2. `npm run dev` → 브라우저에서 `http://localhost:5173` 열기
3. 입력 상자에 텍스트 입력 → Enter 또는 추가 버튼 클릭 → 항목이 추가되는지 확인
4. 체크박스 클릭 → 체크 상태로 토글되는지 확인
5. 삭제 버튼 클릭 → 항목이 삭제되는지 확인

## 4.2 useState, useEffect Hook 활용

React 훅은 클래스형 컴포넌트의 한계를 보완하기 위해 도입된 함수형 컴포넌트 전용 기능으로, useState는 컴포넌트 내 상태를 선언·갱신하는 핵심 도구이며 useEffect는 데이터 요청·DOM 조작·구독과 같은 부수 효과를 관리하는 메커니즘으로, 두 훅의 조합은 상태와 라이프사이클을 직관적으로 제어할 수 있게 해준다.

### (1) Hook의 정의와 사용 이유

훅은 함수형 컴포넌트에서도 상태 관리와 생명주기 로직을 사용할 수 있게 만든 기능으로, 코드 재사용성과 가독성을 높이고 클래스 문법에 의존하지 않는 선언적 컴포넌트 설계를 가능하게 한다.

- React 16.8에서 도입
- 함수형 컴포넌트에서도 상태와 사이드 이펙트(부수효과) 관리 가능
- 코드 재사용성 증가: 커스텀 훅을 통해 로직을 모듈화
- 클래스 문법의 `this` 바인딩 문제 해결
- 함수 중심의 선언적 프로그래밍 스타일 강화

### (2) useState 기반 상태 초기화 및 갱신

useState는 초기값을 지정하고 상태 변수와 setter 함수를 반환하여 상태를 선언하며, setter를 호출할 때마다 컴포넌트가 재렌더링되어 UI를 최신 상태로 동기화한다.

```jsx
// useState(0): 초기값 0으로 상태 선언, [현재값, 갱신함수] 형태의 배열 반환
const [count, setCount] = useState(0);
```

- `count` : 상태 변수 (현재 값 저장)
- `setCount` : setter 함수 (상태 갱신 → 리렌더링 발생)
- 인자는 초기값 (`0`)
- setter를 호출하면 React는 해당 상태를 갱신 후 컴포넌트를 리렌더링

예시: 버튼 클릭 시 카운터 증가

```jsx
// 클릭 시 현재 count에 1을 더한 값으로 상태 갱신 → 화면 숫자 증가
<button onClick={() => setCount(count + 1)}>+1</button>
```

### (3) useEffect를 통한 비동기 로직 처리

useEffect는 렌더링 이후 실행되는 부수 효과 로직을 정의하는 훅으로, 데이터 fetch, 이벤트 구독, DOM 수정 같은 비동기·외부 의존 로직을 안전하게 처리할 수 있게 한다.

#### ① 구조

```jsx
useEffect(() => {
  // 실행할 코드   // 렌더링 후 실행되는 부수 효과 본문(데이터 요청, 구독 등)
  return () => {
    // 정리 (clean-up) 코드  // 다음 effect 실행 전/언마운트 시 실행(구독 해제 등)
  };
}, [/* 의존성 */]); // 이 배열 값이 바뀔 때만 effect 재실행
```

#### ② 특징

- 렌더링 이후 동작
- 정리 함수로 메모리 누수 방지 가능
- 비동기 데이터 fetch에 최적

컴포넌트 로드 시 데이터 가져오기

```jsx
useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/posts/1") // 외부 API에 GET 요청
    .then(res => res.json())   // 응답(Response)을 JSON으로 파싱
    .then(data => setPost(data)); // 파싱된 데이터를 상태에 저장 → 화면 갱신
}, []); // [] → 마운트 시 1회만 실행
```

### (4) 의존성 배열 개념과 라이프사이클 비교

useEffect의 두 번째 인자인 의존성 배열을 통해 실행 시점을 제어할 수 있으며, 빈 배열은 마운트 시 1회만 실행, 값 지정은 특정 값 변경 시 실행, 생략은 모든 렌더링마다 실행되어 클래스 컴포넌트의 생명주기와 비교 가능하다.

- `[]` (빈 배열): 마운트 시 1회 실행 (componentDidMount)
- `[value]` : 특정 값 변경 시 실행 (componentDidUpdate)
- 배열 생략: 매 렌더링마다 실행
- return의 clean-up: componentWillUnmount

#### ① 윈도우 크기 이벤트 등록/해제

```jsx
useEffect(() => {
  // 창 크기가 바뀔 때 실행할 핸들러 정의
  const handleResize = () => console.log(window.innerWidth);
  window.addEventListener("resize", handleResize); // resize 이벤트 구독(리스너 등록)

  // 정리 함수: 언마운트 시 리스너 제거 → 메모리 누수/중복 등록 방지
  return () => window.removeEventListener("resize", handleResize);
}, []); // [] → 등록은 최초 1회, 해제는 언마운트 시
```

### (5) useState & useEffect 실습 애플리케이션

이번 예제는 API 데이터 fetch + 카운터 상태 관리를 동시에 다루어 useState와 useEffect의 활용을 종합적으로 실습합니다.

#### ① 디렉터리 구조

```
ex02-usestate-useeffect/
├── public/
│  └── index.html
├── src/
│  ├── App.js
│  ├── Counter.js
│  ├── PostViewer.js
│  ├── index.js
│  └── App.css
└── package.json
```

#### ② 실행 명령어

```bash
# 프로젝트 생성
npx create-react-app ex02-usestate-useeffect # CRA로 보일러플레이트 프로젝트 생성
cd ex02-usestate-useeffect                   # 생성된 프로젝트 폴더로 이동

# 필요 라이브러리 설치 (없으면 기본 CRA로 충분)
npm install                                  # package.json에 명시된 의존성 설치

# 개발 서버 실행
npm start                                    # CRA 개발 서버 구동(기본 3000번 포트)
```

#### ③ src/index.js

```jsx
import React from "react";
import ReactDOM from "react-dom/client"; // React 18 클라이언트 렌더 API
import App from "./App"; // 최상위 컴포넌트
import "./App.css"; // 전역 스타일

// index.html의 #root를 루트로 잡아 React 앱을 연결
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />); // App 컴포넌트를 화면에 렌더링
```

#### ④ src/App.js

```jsx
import React from "react";
import Counter from "./Counter";       // 카운터(useState) 예제
import PostViewer from "./PostViewer"; // 데이터 fetch(useEffect) 예제

// 두 예제 컴포넌트를 함께 보여주는 최상위 컴포넌트
function App() {
  return (
    <div className="app-container">
      <h1>Ex02: useState & useEffect Demo</h1>
      <Counter />     {/* useState 데모 */}
      <hr />          {/* 시각적 구분선 */}
      <PostViewer />  {/* useEffect + fetch 데모 */}
    </div>
  );
}

export default App; // 다른 파일에서 import할 수 있도록 내보내기
```

#### ⑤ src/Counter.js

```jsx
import React, { useState } from "react";

// useState로 숫자 상태를 관리하는 카운터 컴포넌트
function Counter() {
  const [count, setCount] = useState(0); // 카운트 상태, 초기값 0

  return (
    <div className="counter">
      <h2>Counter Example</h2>
      <p>현재 값: {count}</p> {/* 상태값을 화면에 표시 */}
      <button onClick={() => setCount(count + 1)}>+1 증가</button> {/* 1 증가 */}
      <button onClick={() => setCount(count - 1)}>-1 감소</button> {/* 1 감소 */}
      <button onClick={() => setCount(0)}>초기화</button>          {/* 0으로 리셋 */}
    </div>
  );
}

export default Counter;
```

#### ⑥ src/PostViewer.js

```jsx
import React, { useState, useEffect } from "react";

// useEffect로 API 데이터를 불러와 보여주는 컴포넌트
function PostViewer() {
  const [post, setPost] = useState(null);    // 받아온 글 데이터(초기엔 없음)
  const [loading, setLoading] = useState(true); // 로딩 상태(초기엔 로딩 중)

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1") // 1번 글 요청
      .then((res) => res.json())  // 응답을 JSON으로 변환
      .then((data) => {
        setPost(data);       // 데이터를 상태에 저장
        setLoading(false);   // 로딩 종료 표시
      });
  }, []); // [] → 마운트 시 한 번만 요청

  return (
    <div className="post-viewer">
      <h2>API Fetch Example</h2>
      {/* loading이 true면 안내, false면 받아온 글 내용 표시(조건부 렌더링) */}
      {loading ? <p>로딩 중...</p> : (
        <div>
          <h3>{post.title}</h3> {/* 글 제목 */}
          <p>{post.body}</p>    {/* 글 본문 */}
        </div>
      )}
    </div>
  );
}

export default PostViewer;
```

#### ⑦ src/App.css

```css
/* 앱 전체 컨테이너 여백과 기본 폰트 */
.app-container {
  font-family: Arial, sans-serif;
  padding: 20px;
}

/* 두 데모 영역에 위아래 간격 부여 */
.counter, .post-viewer {
  margin: 20px 0;
}

/* 버튼 사이 간격과 안쪽 여백 */
button {
  margin-right: 10px;
  padding: 5px 10px;
}
```

정리:

- `useState` : 카운터 증가/감소/초기화
- `useEffect` : API 데이터 fetch 후 화면 반영
- 의존성 배열 `[]` : 마운트 시 1회만 실행

## 4.3 Context API를 통한 상태관리

Context API는 전역 상태 공유를 위한 내장 기능으로, props drilling 문제를 해결하고 createContext와 useContext로 손쉽게 컨텍스트를 정의·사용하며, Provider와 Consumer를 통해 상태를 계층적으로 전달하고, 실제 실습에서는 인증 상태나 테마와 같은 공통 데이터를 전역 관리 구조로 구현할 수 있다.

### (1) 전역 상태의 필요성과 구조

규모가 커진 애플리케이션에서 다수의 컴포넌트가 동일한 데이터를 필요로 할 때, 전역 상태를 두어 데이터의 일관성을 유지하고 중첩된 props 전달의 비효율을 줄이는 구조가 필요하다.

- props drilling : 데이터가 꼭 필요 없는 중간 컴포넌트까지 전달됨
- 전역 상태 관리: Context API, Redux, Recoil 등의 방법 존재
- Context API는 React 내장 기능으로 추가 라이브러리 없이 가능

### (2) createContext, useContext 및 구조

createContext로 컨텍스트 객체를 생성하고, useContext 훅을 사용하여 원하는 컴포넌트에서 해당 컨텍스트 값을 직접 참조함으로써 간단하고 선언적인 전역 상태 사용 구조를 구현한다.

```jsx
// createContext로 컨텍스트 객체 생성, 인자 "light"는 Provider 없을 때의 기본값
const ThemeContext = createContext("light");
```

- `createContext` : 컨텍스트 객체 생성, 기본값 지정 가능
- `useContext` : 함수형 컴포넌트 내에서 Context 값 접근

```jsx
// useContext로 가장 가까운 Provider의 값을 읽어 옴(여기선 현재 테마)
const theme = useContext(ThemeContext);
```

### (3) Provider, Consumer 구조 실습

Context.Provider를 사용하여 전역 상태와 값을 하위 컴포넌트에 공급하고, Consumer 또는 useContext로 이를 구독하는 구조를 실습함으로써 상태 전달의 원리를 체득할 수 있다.

- `Context.Provider` : value 속성으로 전달
- 모든 하위 컴포넌트에서 접근 가능
- Consumer 방식도 가능하지만, 최신 코드에서는 `useContext`를 권장

### (4) 계층형 데이터 전달 예제 구성

다중 Provider를 중첩 배치하여 사용자 인증, UI 테마, 언어 설정과 같은 서로 다른 전역 상태를 계층적으로 관리하고, 복잡한 데이터 흐름을 구조화하는 예제를 구성할 수 있다.

- 예: `AuthContext`, `ThemeContext`, `LanguageContext`
- Provider를 트리 구조로 배치
- 각 Consumer 컴포넌트는 필요한 데이터만 구독

### (5) Context API 실습 애플리케이션

이번 예제에서는 테마 전환 (light/dark)과 사용자 인증 상태를 Context API로 관리합니다.

#### ① 디렉터리 구조

```
ex03-context-api/
├── public/
│  └── index.html
├── src/
│  ├── contexts/
│  │  ├── ThemeContext.js
│  │  └── AuthContext.js
│  ├── components/
│  │  ├── Header.js
│  │  ├── ThemeToggler.js
│  │  └── UserProfile.js
│  ├── App.js
│  ├── index.js
│  └── App.css
└── package.json
```

#### ② 실행 명령어

```bash
# 프로젝트 생성
npx create-react-app ex03-context-api # CRA로 프로젝트 생성
cd ex03-context-api                   # 프로젝트 폴더로 이동

# CRA 기본 패키지로 충분
npm install                           # 의존성 설치(추가 라이브러리 불필요)

# 실행
npm start                             # 개발 서버 실행
```

#### ③ src/index.js

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";

// #root에 React 앱 연결 후 App 렌더링 (진입점)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

#### ④ src/contexts/ThemeContext.js

```jsx
import { createContext, useState } from "react";

// 테마 값을 공유할 컨텍스트 객체 생성(기본값 미지정)
export const ThemeContext = createContext();

// Provider 컴포넌트: 하위 트리(children)에 테마 상태와 토글 함수를 공급
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light"); // 테마 상태, 초기값 light

  // 현재 테마를 light↔dark로 뒤집는 함수
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light")); // 이전 값 기준으로 반전
  };

  return (
    // value로 전달한 객체가 하위의 useContext에서 그대로 읽힘
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children} {/* Provider로 감싼 모든 자식이 이 값에 접근 가능 */}
    </ThemeContext.Provider>
  );
}
```

#### ⑤ src/contexts/AuthContext.js

```jsx
import { createContext, useState } from "react";

// 인증 정보를 공유할 컨텍스트 객체 생성
export const AuthContext = createContext();

// Provider 컴포넌트: 로그인 사용자 상태와 로그인/로그아웃 함수를 공급
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // 로그인 사용자 정보(미로그인 시 null)

  const login = (name) => setUser({ name }); // 이름을 받아 사용자 객체 설정(로그인)
  const logout = () => setUser(null);        // 사용자 정보를 비움(로그아웃)

  return (
    // user 상태와 login/logout 함수를 묶어 하위에 제공
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

#### ⑥ src/components/Header.js

```jsx
import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { AuthContext } from "../contexts/AuthContext";

// 헤더: 테마와 로그인 정보를 동시에 구독해 표시
function Header() {
  const { theme } = useContext(ThemeContext); // 현재 테마 값만 구조 분해로 가져옴
  const { user } = useContext(AuthContext);   // 현재 사용자 정보 가져옴

  return (
    // className에 theme을 넣어 light/dark에 따라 다른 스타일 적용
    <header className={`header ${theme}`}>
      <h1>Ex03: Context API Demo</h1>
      {/* 로그인 여부에 따라 환영 문구 또는 안내 문구 표시 */}
      <p>{user ? `환영합니다, ${user.name}님!` : "로그인하지 않았습니다."}</p>
    </header>
  );
}

export default Header;
```

#### ⑦ src/components/ThemeToggler.js

```jsx
import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

// 테마 전환 버튼 컴포넌트
function ThemeToggler() {
  // 테마 값과 전환 함수를 컨텍스트에서 함께 가져옴
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <p>현재 테마: {theme}</p> {/* 현재 테마 표시 */}
      <button onClick={toggleTheme}>테마 전환</button> {/* 클릭 시 테마 토글 */}
    </div>
  );
}

export default ThemeToggler;
```

#### ⑧ src/components/UserProfile.js

```jsx
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

// 사용자 프로필/로그인 컴포넌트
function UserProfile() {
  // 사용자 정보와 로그인/로그아웃 함수를 컨텍스트에서 가져옴
  const { user, login, logout } = useContext(AuthContext);

  return (
    <div>
      {/* 로그인 상태에 따라 다른 UI를 보여주는 조건부 렌더링 */}
      {user ? (
        <> {/* 프래그먼트: 불필요한 래퍼 없이 여러 요소 묶기 */}
          <p>사용자: {user.name}</p>
          <button onClick={logout}>로그아웃</button> {/* 클릭 시 로그아웃 */}
        </>
      ) : (
        <>
          <p>로그인 필요</p>
          {/* 클릭 시 "홍길동" 이름으로 로그인 처리 */}
          <button onClick={() => login("홍길동")}>로그인</button>
        </>
      )}
    </div>
  );
}

export default UserProfile;
```

#### ⑨ src/App.js

```jsx
import React from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header";
import ThemeToggler from "./components/ThemeToggler";
import UserProfile from "./components/UserProfile";

// 여러 Provider를 중첩해 전역 상태를 계층적으로 공급
function App() {
  return (
    // ThemeProvider로 감싸 테마 상태를 하위 전체에 제공
    <ThemeProvider>
      {/* AuthProvider로 감싸 인증 상태를 하위 전체에 제공 */}
      <AuthProvider>
        <div className="app">
          <Header />        {/* 테마+인증 정보를 구독해 표시 */}
          <ThemeToggler />  {/* 테마 전환 */}
          <UserProfile />   {/* 로그인/로그아웃 */}
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
```

#### ⑩ src/App.css

```css
/* 앱 전체 여백과 기본 폰트 */
.app {
  font-family: Arial, sans-serif;
  padding: 20px;
}

/* 헤더 공통 여백 */
.header {
  padding: 10px;
  margin-bottom: 20px;
}

/* 라이트 테마일 때 헤더 색상(밝은 배경/어두운 글자) */
.header.light {
  background-color: #f0f0f0;
  color: #333;
}

/* 다크 테마일 때 헤더 색상(어두운 배경/밝은 글자) */
.header.dark {
  background-color: #333;
  color: #f0f0f0;
}

/* 버튼 위 여백과 안쪽 여백 */
button {
  margin-top: 10px;
  padding: 5px 10px;
}
```

정리:

- `createContext`, `useContext` 활용
- `Provider`로 전역 상태 공급
- 테마(light/dark) 전환
- 사용자 로그인/로그아웃 전역 관리
- props drilling 없이 필요한 컴포넌트에서 바로 사용
