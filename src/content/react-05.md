# 5장. API 연동과 인증 프로세스 구현

이번 장은 React 애플리케이션에서 외부 API와의 데이터 연동 및 사용자 인증 프로세스를 실제로 구현하는 과정을 다룬다. fetch와 axios를 활용한 비동기 호출과 로딩·에러 처리, Todo 앱의 상태 관리와 로컬 저장, 그리고 로그인 API 연동과 JWT 기반 인증 상태 유지까지 학습함으로써 실무형 프론트엔드 애플리케이션 개발의 핵심 흐름을 완성한다.

## 5.1 fetch/axios를 이용한 API 호출

fetch와 axios는 웹 애플리케이션에서 외부 API와 데이터를 주고받기 위한 핵심 도구로, 비동기 호출의 기본 구조와 차이를 이해하고 응답·에러·로딩 상태를 관리하며, 실제 외부 데이터 기반으로 화면을 구성하는 과정을 통해 실무적인 API 연동 능력을 익힌다.

### (1) API 호출 방식 및 비동기 흐름

API 호출은 네트워크 요청이 완료될 때까지 기다리지 않고 이벤트 루프를 통해 비동기적으로 처리되며, Promise 또는 async/await 구문을 활용해 응답 결과를 순차적으로 제어함으로써 UI의 끊김 없는 데이터 연동을 가능하게 한다.

① **비동기 모델**: JS는 이벤트 루프 기반. 네트워크 요청은 비동기(브라우저/노드)로 처리되고, Promise가 완료되면 마이크로태스크 큐로 콜백이 실행되어 렌더링과 충돌을 피함.

② **제어 흐름**

- 직렬(순차): `await a(); await b();`
- 병렬(동시): `await Promise.all([a(), b()])`

③ **취소**: Fetch는 `AbortController`로 취소 가능. axios는 `signal` 옵션(또는 과거의 `CancelToken`)으로 취소 가능.

④ **오류 전파**: `try/catch`로 캡처, 재시도 정책(logic) 적용.

⑤ **async/await + AbortController (fetch)**

```js
// src/examples/fetchWithAbort.js
// url: 호출할 주소, timeout: 자동 취소까지 기다릴 시간(ms, 기본 5초)
export async function fetchWithAbort(url, timeout = 5000) {
  // AbortController: fetch 요청을 도중에 중단(취소)할 수 있게 해주는 브라우저 내장 객체
  const controller = new AbortController();
  // signal: fetch에 넘겨주면 controller.abort() 호출 시 이 요청이 취소됨
  const signal = controller.signal;

  // 타임아웃 자동 취소 (선택적)
  // timeout(ms) 후에도 응답이 없으면 abort()를 호출해 요청을 강제로 중단
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    // signal을 함께 전달해 취소 가능한 GET 요청 수행 (await로 응답을 기다림)
    const res = await fetch(url, { method: 'GET', signal });
    // res.ok: HTTP 상태 코드가 200~299면 true. 아니면 직접 에러를 던져 catch로 보냄
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    // 응답 본문을 JSON으로 파싱 (이 과정도 비동기라 await 필요)
    const json = await res.json();
    // 파싱된 데이터를 호출한 쪽으로 반환
    return json;
  } finally {
    // 성공/실패/취소 무엇이든 마지막에 타이머를 정리해 메모리 누수를 막음
    clearTimeout(timer);
  }
}
```

- `AbortController`로 사용자가 취소하거나 타임아웃 시점에 요청을 중단한다.
- `response.ok` 검사로 HTTP 에러 상태를 명시적으로 처리해야 한다.
- `finally`에서 타이머를 정리하여 리소스 누수 방지.

### (2) fetch, axios의 사용법 비교

fetch는 브라우저 내장 API로 가볍고 표준화된 방식으로 요청을 처리하며, axios는 추가 기능이 풍부하고 JSON 자동 변환, 요청·응답 인터셉터, 타임아웃 설정 등 고급 기능을 제공해 프로젝트 성격에 따라 적합한 도구를 선택할 수 있다.

① **fetch**

- 내장 API, 추가 의존성 불필요
- `response.ok` 체크 후 `response.json()` 호출 필요
- 브라우저 호환성(구형) 주의(폴리필 필요)
- 취소: `AbortController`

② **axios**

- 자동으로 `response.data`에 파싱된 JSON 반환
- 인터셉터(request/response), 기본 인스턴스 설정(baseURL, headers), timeout 설정 기능
- 에러 객체가 `error.response`, `error.request` 등으로 구분되어 유용
- 취소: `signal` 옵션(또는 older CancelToken)

③ **fetch vs axios 사용**

```js
// fetch 예시 (GET)
async function fetchUsers(){
  // fetch는 기본적으로 GET 요청. await로 서버 응답(Response 객체)을 받음
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  // fetch는 HTTP 에러(404, 500 등)도 reject하지 않으므로 ok를 직접 확인해야 함
  if(!res.ok) throw new Error('Fetch failed: ' + res.status);
  // 본문을 JSON으로 파싱해 반환 (json()도 Promise라 await 필요)
  return await res.json();
}

// axios 예시 (GET) - axios 설치 필요
import axios from 'axios';
// axios.create: 공통 설정(baseURL, 타임아웃 등)을 가진 전용 인스턴스 생성
const api = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com', timeout: 6000 });

// 요청 인터셉터: 모든 요청이 서버로 나가기 직전에 가로채 공통 처리를 추가
api.interceptors.request.use(cfg => {
  // 토큰 첨부, 로깅 등
  // cfg.headers.Authorization = `Bearer ${token}`;
  // 수정한 설정(cfg)을 반드시 반환해야 요청이 그 설정대로 전송됨
  return cfg;
});

async function axiosGetPosts(){
  // baseURL이 이미 설정돼 있어 상대 경로('/posts')만 적으면 됨
  const res = await api.get('/posts');
  return res.data; // axios는 이미 파싱된 data 반환
}
```

- `api.interceptors.request`로 모든 요청에 공통 동작(예: 토큰 추가)을 삽입할 수 있다.
- `axios.create()`로 인스턴스를 만들어 프로젝트 전역 설정(기본 헤더, 베이스 URL, 타임아웃 등)을 관리.

### (3) 응답 처리·에러 처리·로딩 처리 구현

API 호출 과정에서 응답 데이터를 파싱해 상태로 저장하고 로딩 여부를 UI에 반영하며, 네트워크 실패나 서버 오류 발생 시 에러 메시지를 사용자 친화적으로 표시함으로써 안정적인 데이터 연동과 예외 처리 구조를 구현한다.

① **핵심 패턴**

- 상태: `{ data, loading, error }`
- 사용자 친화적 에러 메시지: HTTP 상태 코드 → 인간 친화 텍스트
- 취소: 컴포넌트 언마운트 시 요청 취소
- 재시도: 필요 시 간단 재시도 로직(지수 백오프) 사용

② **공통 훅 `useApi` (로딩/에러/취소 처리)**

```jsx
// src/hooks/useApi.js
import { useState, useEffect } from 'react';

// apiFunc: 호출할 비동기 함수, deps: 이 값이 바뀌면 다시 호출(useEffect 의존성)
export default function useApi(apiFunc, deps = []) {
  // data: 응답 데이터 / loading: 로딩 여부(초기 true) / error: 에러 메시지
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // cancelled: 언마운트 후 setState 방지용 플래그(메모리 누수/경고 방지)
    let cancelled = false;
    // 호출 시작 시 로딩 켜고 이전 에러는 초기화
    setLoading(true);
    setError(null);

    apiFunc()
      // 성공: 아직 마운트 상태일 때만 데이터 반영
      .then(res => { if(!cancelled) setData(res); })
      // 실패: 에러 메시지를 상태에 저장 (메시지 없으면 기본 문구)
      .catch(err => { if(!cancelled) setError(err.message || 'Unknown error'); })
      // 성공/실패와 무관하게 마지막에 로딩 끄기
      .finally(() => { if(!cancelled) setLoading(false); });

    // 클린업: 컴포넌트가 사라지면 cancelled를 true로 바꿔 위 콜백들의 setState를 막음
    return () => { cancelled = true; };
  }, deps);

  // 컴포넌트가 사용할 상태 3종을 객체로 반환
  return { data, loading, error };
}
```

- `apiFunc`는 내부에서 fetch/axios 호출을 수행해 파싱된 데이터를 반환하는 async 함수여야 함.
- `cancelled` 플래그는 마운트 해제 후 상태 업데이트를 방지. (fetch에선 `AbortController`를 병행 권장)
- 컴포넌트에서는 `{ data, loading, error } = useApi(() => fetchUsers(), [])` 형태로 사용.

③ **FetchDemo 컴포넌트 (useApi 사용)**

```jsx
// src/components/FetchDemo.js
import React from 'react';
import useApi from '../hooks/useApi';

// API 호출 로직: 사용자 목록을 fetch로 가져오는 async 함수
const fetchUsers = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  // HTTP 에러 상태를 직접 검사해 에러로 변환
  if (!res.ok) throw new Error('Network response was not ok: ' + res.status);
  return res.json();
}

export default function FetchDemo(){
  // useApi에 fetchUsers를 넘겨 로딩/에러/데이터 상태를 한 번에 받음
  const { data, loading, error } = useApi(fetchUsers, []);
  // 로딩 중에는 로딩 UI만 렌더링하고 종료(이른 반환)
  if(loading) return <p>⏳ 로딩 중...</p>;
  // 에러가 있으면 에러 메시지 표시
  if(error) return <p>❌ 에러: {error}</p>;
  return (
    <ul>
      {/* 배열 데이터를 li로 변환. key에는 고유한 id 사용 */}
      {data.map(u => <li key={u.id}>{u.name} ({u.email})</li>)}
    </ul>
  );
}
```

- 로딩/에러/데이터 상태별 UI를 분기해서 표시한다.
- 에러 메시지는 내부에서 적절히 가공해 사용자에게 노출.

### (4) 외부 데이터 기반 화면 구성 실습

외부 API로부터 받아온 JSON 데이터를 리스트나 카드 형태로 렌더링하고, 상태 관리와 조건부 렌더링을 적용하여 실시간으로 변화하는 데이터를 기반으로 완성도 높은 화면을 구성하는 실습을 진행한다.

① **실무 포인트**

- 구조: 상단 검색/필터 → 리스트/그리드 → 페이징/무한스크롤 → 상세 모달
- UX 요소: 스켈레톤 로더, 오류 바, 빈 상태(Empty) UI
- 성능: 페이지네이션, 서버사이드 페이징, 캐시(메모리/localStorage), react-query/SWR 활용 권장
- 낙관적 업데이트(Optimistic UI): POST/DELETE 후 UI를 먼저 갱신하고 서버 응답으로 수정/복구

② **AxiosDemo (카드형 UI, 상위 5개)**

```jsx
// src/components/AxiosDemo.js
import React from 'react';
import axios from 'axios';
import useApi from '../hooks/useApi';

// baseURL과 타임아웃을 가진 axios 전용 인스턴스 생성
const api = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com', timeout: 6000 });

// 게시글을 가져온 뒤 앞 5개만 잘라 반환하는 API 함수
const fetchPosts = async () => {
  const res = await api.get('/posts');
  // 대량 데이터일 경우 서버에서 페이징을 요청하거나 slice 사용
  return res.data.slice(0, 5);
}

export default function AxiosDemo(){
  // 공통 훅으로 로딩/에러/데이터 상태 관리
  const { data, loading, error } = useApi(fetchPosts, []);
  // 로딩 중에는 스켈레톤(자리 표시) UI 노출
  if(loading) return <div className="skeleton">로딩중...</div>;
  if(error) return <div className="error">에러 : {error}</div>;
  return (
    <div className="cards">
      {/* 게시글 배열을 카드(article)로 반복 렌더링 */}
      {data.map(post => (
        <article key={post.id} className="card">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </article>
      ))}
    </div>
  );
}
```

- 카드에 `key`를 적절히 지정. 긴 리스트는 `virtualization`(react-window 등) 검토.
- 페이징 예: page 매개변수를 API에 전달하여 서버에서 잘라달라고 요청하거나 클라이언트에서 `slice` 사용.

### (5) fetch/axios API 실습 프로젝트

fetch와 axios로 외부 API를 호출할 때의 비동기 흐름, 응답 파싱, 에러/로딩 처리, UI 구성 패턴을 이해하면 실무에서 안정적이고 사용자 친화적인 데이터 연동을 구현할 수 있습니다.

① **디렉터리 구조**

```
ex01/
├── package.json
├── public/
│   └── index.html
└── src/
    ├── index.js
    ├── App.js
    ├── components/
    │   ├── FetchDemo.js   # fetch API 실습
    │   └── AxiosDemo.js   # axios 실습
    ├── hooks/
    │   └── useApi.js      # 공통 API 호출 커스텀 훅
    └── styles/
        └── App.css
```

② **실행 명령어**

```bash
# React 프로젝트 생성 (ex01 폴더에 기본 템플릿 구성)
npx create-react-app ex01
# 생성된 프로젝트 폴더로 이동
cd ex01

# axios 설치 (fetch는 내장)
npm install axios

# 개발 서버 실행 (http://localhost:3000)
npm start
```

③ **src/index.js**

```jsx
import React from "react";
// React 18의 새로운 클라이언트 렌더링 진입점
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/App.css";

// public/index.html의 <div id="root">를 찾아 React 루트를 생성
const root = ReactDOM.createRoot(document.getElementById("root"));
// App을 화면에 렌더링. StrictMode는 개발 중 잠재적 문제를 경고해줌
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

④ **src/App.js**

```jsx
import React from "react";
// 두 데모 컴포넌트를 불러와 한 화면에 배치
import FetchDemo from "./components/FetchDemo";
import AxiosDemo from "./components/AxiosDemo";

function App() {
  return (
    <div className="app-container">
      <h1>5.1 fetch / axios API 실습</h1>
      {/* fetch 데모 영역 */}
      <div className="demo-section">
        <h2>① fetch API</h2>
        <FetchDemo />
      </div>
      {/* axios 데모 영역 */}
      <div className="demo-section">
        <h2>② axios API</h2>
        <AxiosDemo />
      </div>
    </div>
  );
}

export default App;
```

⑤ **src/hooks/useApi.js (공통 API 훅)**

```jsx
import { useState, useEffect } from "react";

// apiFunc: 데이터를 가져오는 async 함수, dependencies: 재호출 트리거 배열
function useApi(apiFunc, dependencies = []) {
  // 응답 데이터, 로딩 여부, 에러를 각각 상태로 관리
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 언마운트 후 setState를 막기 위한 플래그
    let cancel = false;
    setLoading(true);
    apiFunc()
      .then((res) => {
        // 컴포넌트가 살아있을 때만 데이터 반영
        if (!cancel) setData(res);
      })
      .catch((err) => {
        // 에러 메시지를 상태에 저장
        if (!cancel) setError(err.message);
      })
      .finally(() => {
        // 성공/실패 관계없이 로딩 종료
        if (!cancel) setLoading(false);
      });
    // 클린업: 언마운트 시 cancel을 true로 만들어 위 콜백의 setState 차단
    return () => {
      cancel = true;
    };
  }, dependencies);

  // 세 가지 상태를 묶어 반환
  return { data, loading, error };
}

export default useApi;
```

⑥ **src/components/FetchDemo.js**

```jsx
import React from "react";
import useApi from "../hooks/useApi";

const FetchDemo = () => {
  // 사용자 목록을 fetch로 가져오는 함수
  const fetchUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    // 응답이 정상(2xx)이 아니면 에러를 던져 훅의 catch로 전달
    if (!response.ok) throw new Error("네트워크 오류 발생!");
    return response.json();
  };

  // 공통 훅으로 상태를 받음. []이므로 마운트 시 1회만 호출
  const { data, loading, error } = useApi(fetchUsers, []);

  // 상태별 분기 렌더링
  if (loading) return <p>⏳ 로딩 중...</p>;
  if (error) return <p>❌ 에러: {error}</p>;

  return (
    <ul>
      {/* 각 사용자를 li로 렌더링, key는 고유 id */}
      {data.map((user) => (
        <li key={user.id}>
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  );
};

export default FetchDemo;
```

⑦ **src/components/AxiosDemo.js**

```jsx
import React from "react";
import axios from "axios";
import useApi from "../hooks/useApi";

const AxiosDemo = () => {
  // 게시글을 axios로 가져와 앞 5개만 반환
  const fetchPosts = async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return response.data.slice(0, 5); // 앞 5개만 표시
  };

  // 공통 훅으로 로딩/에러/데이터 관리
  const { data, loading, error } = useApi(fetchPosts, []);

  if (loading) return <p>⏳ 로딩 중...</p>;
  if (error) return <p>❌ 에러: {error}</p>;
  return (
    <div>
      {/* 게시글을 카드 형태로 반복 렌더링 */}
      {data.map((post) => (
        <div key={post.id} className="card">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default AxiosDemo;
```

⑧ **src/styles/App.css**

```css
/* 전체 컨테이너: 가운데 정렬 + 최대 너비 제한 */
.app-container {
  max-width: 800px;
  margin: 0 auto;       /* 좌우 자동 여백으로 수평 가운데 정렬 */
  padding: 20px;
  font-family: sans-serif;
}

/* 데모 구역 사이 간격 */
.demo-section {
  margin-bottom: 40px;
}

/* 게시글 카드 스타일 */
.card {
  border: 1px solid #ccc;
  border-radius: 10px;   /* 둥근 모서리 */
  padding: 15px;
  margin-bottom: 15px;
  background-color: #f9f9f9;
}
```

- fetch API → 사용자 목록 가져오기
- axios API → 게시글 5개 가져오기
- 공통 `useApi` 훅으로 로딩/에러/응답 처리 구조를 통합 관리

## 5.2 Todo 애플리케이션 작성

Todo 애플리케이션은 상태 배열 관리, 항목 추가·삭제 로직, 조건부 렌더링을 통한 완료 여부 표시, 로컬 스토리지를 활용한 데이터 저장 기능을 통해 상태 관리와 데이터 지속성을 학습할 수 있는 대표적인 실습 예제다.

### (1) 할 일 추가/삭제 로직 구현

사용자가 입력한 할 일을 배열 상태에 추가하고 필요 시 삭제 기능을 구현함으로써 입력 처리와 이벤트 기반 상태 변경의 기초 로직을 학습한다.

- `useState`로 todos 배열 상태를 정의
- `setTodos([...todos, newTodo])` → 새로운 항목 추가
- `filter`를 사용해 특정 id의 항목만 제외하여 삭제

아래 코드는 사용자가 입력한 할 일을 추가하고, 필요할 때 삭제하는 기본 동작을 구현합니다.

```jsx
import React, { useState } from "react";

function TodoApp() {
  // todos: 할 일 목록 배열 / input: 입력창의 현재 텍스트
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    // 기존 배열을 펼치고(...) 새 입력값을 뒤에 추가한 새 배열로 교체
    setTodos([...todos, input]); // 새로운 항목 추가
    // 입력창 비우기
    setInput("");
  };

  const removeTodo = (index) => {
    // filter로 해당 index만 제외한 새 배열을 만들어 삭제 효과
    setTodos(todos.filter((_, i) => i !== index)); // index 기준 삭제
  };

  return (
    <div>
      <input
        value={input}                                  // 입력값을 상태와 동기화(제어 컴포넌트)
        onChange={(e) => setInput(e.target.value)}     // 입력할 때마다 상태 갱신
        placeholder="할 일을 입력하세요"
      />
      <button onClick={addTodo}>추가</button>

      <ul>
        {/* 각 할 일을 li로 렌더링 (index를 key로 사용) */}
        {todos.map((todo, index) => (
          <li key={index}>
            {todo} <button onClick={() => removeTodo(index)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
```

- `useState([])`: 할 일 목록을 배열로 관리
- `setTodos([...todos, input])`: 기존 배열 복사 후 새 항목 추가
- `filter`: 삭제할 index 제외한 나머지 요소만 유지

### (2) 상태 배열 관리 및 변경 처리

할 일 목록을 배열로 관리하며 useState 또는 useReducer를 활용해 항목의 추가, 삭제, 수정과 같은 변화를 불변성 원칙에 맞게 처리하여 React의 상태 관리 원리를 익힌다.

- React는 직접 배열을 수정하지 않고 새 배열을 반환해야 한다.
- `map`, `filter`, `concat` 등의 함수형 배열 메서드를 사용.
- 완료 여부 토글 시: `todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo)`

아래 코드는 상태를 배열로 관리하며 불변성을 지켜 수정·삭제합니다.

```jsx
// 특정 index 항목의 완료 여부(completed)를 뒤집는 함수
const toggleTodo = (index) => {
  setTodos(
    // map으로 새 배열을 만들어 불변성 유지
    todos.map((todo, i) =>
      // 클릭한 index와 같으면 completed만 반전한 새 객체로 교체, 아니면 그대로
      i === index ? { ...todo, completed: !todo.completed } : todo
    )
  );
};
```

- `map`을 사용하여 배열을 순회
- 클릭한 항목(`index`)만 `completed` 값을 반전
- `...todo`: 기존 속성을 유지하면서 `completed`만 수정

### (3) 조건부 렌더링을 통한 시각화

완료된 할 일과 미완료 항목을 조건부 렌더링으로 구분 표시하고, 스타일이나 아이콘을 활용해 시각적으로 명확히 표현함으로써 UI와 데이터 상태의 연결성을 경험한다.

- JSX 내 삼항 연산자(`?:`) 활용
- CSS 클래스 조건 적용: `className={todo.completed ? "done" : ""}`

아래 코드는 완료 여부에 따라 다른 스타일을 적용합니다.

```jsx
<ul>
  {todos.map((todo, index) => (
    <li
      key={index}
      // completed가 true면 취소선(line-through), 아니면 없음
      style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      // 항목 클릭 시 완료 여부 토글
      onClick={() => toggleTodo(index)}
    >
      {todo.text}
    </li>
  ))}
</ul>
```

- `todo.completed`가 `true`면 `line-through` 적용
- 항목 클릭 시 `toggleTodo` 실행 → 완료 여부 전환

### (4) 간단한 저장 적용 - localStorage

할 일 데이터를 localStorage에 저장하고 컴포넌트 마운트 시 불러오는 기능을 구현하여 브라우저 새로고침 후에도 데이터가 유지되는 영속성을 실습한다.

- `localStorage.setItem("todos", JSON.stringify(todos))`
- `JSON.parse(localStorage.getItem("todos") || "[]")`
- `useEffect`를 활용해 상태 변경 시 자동 저장

아래 코드는 새로고침해도 데이터가 유지되도록 저장합니다.

```jsx
import { useEffect } from "react";

// 저장: todos가 바뀔 때마다 실행
useEffect(() => {
  // 배열은 문자열로 직렬화(JSON.stringify)해야 localStorage에 저장 가능
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]); // 의존성 배열에 todos → 변경될 때마다 저장

// 불러오기: 마운트 시 1회만 실행
useEffect(() => {
  const saved = localStorage.getItem("todos");
  if (saved) {
    // 저장된 문자열을 다시 배열로 파싱해 상태 복원
    setTodos(JSON.parse(saved));
  }
}, []); // 빈 배열 → 최초 1회만 실행
```

- `[todos]` 의존성 배열 → `todos`가 변경될 때마다 localStorage 저장
- 마운트 시(`[]`) localStorage에서 값 불러오기

### (5) Todo 애플리케이션 작성

Todo 애플리케이션은 입력한 할 일을 추가·삭제하고 완료 여부를 토글하며 조건부 렌더링을 통해 시각적으로 구분하고, localStorage를 활용해 데이터가 새로고침 후에도 유지되도록 구현함으로써 상태 관리, 이벤트 처리, 영속성 적용까지 React 핵심 개념을 종합적으로 학습할 수 있는 대표적인 실습 예제이다.

① **디렉터리 구조**

```
ex02/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── TodoInput.js
│   │   ├── TodoList.js
│   │   └── TodoItem.js
│   ├── App.js
│   ├── index.js
│   ├── App.css
│   └── styles.css
├── package.json
└── README.md
```

② **설치 및 실행 명령**

```bash
# 1. 프로젝트 생성
npx create-react-app ex02
# 생성된 폴더로 이동
cd ex02

# 2. 개발 서버 실행 (http://localhost:3000)
npm start
```

③ **src/App.js**

```jsx
import React, { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  // useState 초기값에 함수를 넘기면 최초 렌더링 시 1회만 실행됨(지연 초기화)
  const [todos, setTodos] = useState(() => {
    // 초기 상태를 localStorage에서 불러오기
    const saved = localStorage.getItem("todos");
    // 저장된 값이 있으면 파싱, 없으면 빈 배열로 시작
    return saved ? JSON.parse(saved) : [];
  });

  // todos 상태가 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 할 일 추가: 고유 id(Date.now)와 함께 새 객체 생성 후 배열에 추가
  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  // 완료 토글: 해당 id 항목만 completed 반전(불변성 유지)
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 삭제: 해당 id를 제외한 새 배열로 교체
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <h1>📋 Todo List</h1>
      {/* 입력 컴포넌트에 추가 함수를 props로 전달 */}
      <TodoInput addTodo={addTodo} />
      {/* 목록 컴포넌트에 데이터와 토글/삭제 함수 전달 */}
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
```

④ **src/components/TodoInput.js**

```jsx
import React, { useState } from "react";

// 부모로부터 addTodo 함수를 props로 받음
function TodoInput({ addTodo }) {
  // 입력창 텍스트 상태
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    // form 기본 제출(새로고침) 동작 막기
    e.preventDefault();
    // 공백만 입력된 경우 무시
    if (!value.trim()) return;
    // 부모의 추가 함수 호출
    addTodo(value);
    // 입력창 비우기
    setValue("");
  };

  return (
    // Enter 키나 버튼 클릭 시 handleSubmit 실행
    <form onSubmit={handleSubmit} className="todo-input">
      <input
        type="text"
        placeholder="할 일을 입력하세요..."
        value={value}                                  // 상태와 동기화(제어 컴포넌트)
        onChange={(e) => setValue(e.target.value)}     // 입력마다 상태 갱신
      />
      <button type="submit">추가</button>
    </form>
  );
}

export default TodoInput;
```

⑤ **src/components/TodoList.js**

```jsx
import React from "react";
import TodoItem from "./TodoItem";

// 목록 데이터와 토글/삭제 함수를 props로 받음
function TodoList({ todos, toggleTodo, deleteTodo }) {
  // 빈 목록일 때 안내 문구 표시(조건부 렌더링)
  if (todos.length === 0) return <p>할 일이 없습니다 ✨</p>;
  return (
    <ul className="todo-list">
      {/* 각 할 일을 TodoItem으로 렌더링하고 함수들을 그대로 전달 */}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}     // 고유 id를 key로 사용
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
```

⑥ **src/components/TodoItem.js**

```jsx
import React from "react";

// 단일 할 일과 토글/삭제 함수를 props로 받음
function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    // completed가 true면 'done' 클래스 추가(템플릿 리터럴로 클래스 동적 구성)
    <li className={`todo-item ${todo.completed ? "done" : ""}`}>
      {/* 텍스트 클릭 시 완료 토글 */}
      <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
      {/* 버튼 클릭 시 해당 항목 삭제 */}
      <button onClick={() => deleteTodo(todo.id)}>삭제</button>
    </li>
  );
}

export default TodoItem;
```

⑦ **src/App.css**

```css
/* 앱 카드: 가운데 정렬 + 그림자 */
.App {
  max-width: 400px;
  margin: 50px auto;     /* 위 50px, 좌우 가운데 정렬 */
  padding: 20px;
  border-radius: 12px;
  background: #f9f9f9;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);  /* 입체감을 주는 그림자 */
  text-align: center;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

/* 입력 영역: 가로 배치 */
.todo-input {
  display: flex;          /* input과 button을 한 줄에 */
  gap: 10px;              /* 요소 간 간격 */
  margin-bottom: 20px;
}

.todo-input input {
  flex: 1;                /* 남은 공간을 모두 차지 */
  padding: 8px;
}

.todo-input button {
  padding: 8px 12px;
  background: #0078d4;    /* 파란색 버튼 */
  color: white;
  border: none;
  border-radius: 4px;
}

/* 목록: 기본 불릿 제거 */
.todo-list {
  list-style: none;
  padding: 0;
}

/* 항목: 텍스트와 버튼을 양 끝 정렬 */
.todo-item {
  display: flex;
  justify-content: space-between;  /* 좌우 양 끝으로 배치 */
  background: white;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* 완료된 항목: 취소선 + 회색 처리 */
.todo-item.done span {
  text-decoration: line-through;
  color: gray;
}
```

## 5.3 로그인 프로세스 및 API 호출 구현

로그인 프로세스는 사용자 입력 기반 API 요청과 JWT 토큰 처리, 인증 여부에 따른 조건부 렌더링, 로그인 성공 시 홈 화면 전환을 통해 보안성과 사용자 경험을 동시에 고려한 인증 흐름을 구축하는 실무형 학습 과정이다.

### (1) 로그인 요청 API 연동

아이디와 비밀번호 입력값을 기반으로 로그인 API를 호출하고, 서버 응답 결과에 따라 인증 여부를 판별해 로그인 성공·실패 시의 로직을 제어한다.

```jsx
// LoginForm.js
import React, { useState } from "react";

// onLogin: 로그인 성공 시 토큰을 부모로 전달하는 콜백
function LoginForm({ onLogin }) {
  // 아이디/비밀번호 입력 상태
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    // form 기본 제출(새로고침) 방지
    e.preventDefault();
    // (API 요청)
    // 로그인 API로 POST 요청. 본문에 입력값을 JSON으로 담아 전송
    const response = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // 본문이 JSON임을 명시
      body: JSON.stringify({ username, password }),    // 객체를 JSON 문자열로 변환
    });

    // 응답 본문을 JSON으로 파싱
    const data = await response.json();
    if (response.ok) {
      onLogin(data.token); // 성공 시 토큰 전달
    } else {
      // 실패 시 서버가 보낸 메시지를 알림으로 표시
      alert("로그인 실패: " + data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="아이디"
        value={username}                                 // 상태와 동기화
        onChange={(e) => setUsername(e.target.value)}    // 입력마다 갱신
      />
      <input
        type="password"                                  // 입력값을 가림
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">로그인</button>
    </form>
  );
}

export default LoginForm;
```

사용자가 아이디/비밀번호를 입력하면 `fetch`를 통해 서버 API(`/api/login`)로 POST 요청을 보냅니다. 성공 시 JWT 토큰을 받아 상위 컴포넌트로 전달합니다.

### (2) JWT 토큰 처리 흐름

로그인 성공 시 서버로부터 전달받은 JWT 토큰을 로컬 스토리지나 쿠키에 저장하고, 이후 요청 시 인증 헤더에 포함시켜 안전하게 사용자 인증 상태를 유지한다.

```jsx
// App.js
import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";

function App() {
  // 초기 토큰을 localStorage에서 읽어와 상태로 보관(새로고침해도 로그인 유지)
  const [token, setToken] = useState(localStorage.getItem("token"));

  // 로그인 성공 콜백: 토큰을 저장하고 상태 갱신
  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken); // 저장
    setToken(newToken); // 상태 갱신
  };

  // 로그아웃: 토큰 제거 후 상태를 비움
  const handleLogout = () => {
    localStorage.removeItem("token"); // 제거
    setToken(null);
  };

  return (
    <div>
      {/* 토큰 유무에 따라 홈 또는 로그인 폼을 조건부 렌더링 */}
      {token ? (
        <Home onLogout={handleLogout} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
```

로그인 성공 시 받은 JWT 토큰을 `localStorage`에 저장하여 새로고침 후에도 유지할 수 있습니다. 로그아웃 시에는 제거합니다.

### (3) 인증 상태에 따른 조건부 렌더링

인증 여부에 따라 로그인 폼 또는 사용자 전용 콘텐츠를 조건부 렌더링으로 전환하여 사용자 경험을 향상시키고 불필요한 접근을 차단한다.

```jsx
// Home.js
import React, { useEffect, useState } from "react";

function Home({ onLogout }) {
  // 사용자 프로필 데이터 상태(초기엔 null)
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // 저장된 토큰을 꺼냄
    const token = localStorage.getItem("token");
    // 보호된 프로필 API 호출. Authorization 헤더에 Bearer 토큰을 실어 인증
    fetch("http://localhost:4000/api/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())          // 응답을 JSON으로 파싱
      .then((data) => setProfile(data));  // 프로필 상태에 저장
  }, []); // 마운트 시 1회만 호출

  return (
    <div>
      <h1>홈 화면</h1>
      {/* 프로필 로드 완료 여부에 따라 환영 문구 또는 로딩 문구 표시 */}
      {profile ? (
        <p>환영합니다, {profile.username}님 🎉</p>
      ) : (
        <p>사용자 정보를 불러오는 중...</p>
      )}
      {/* 로그아웃 버튼: 부모의 콜백 실행 */}
      <button onClick={onLogout}>로그아웃</button>
    </div>
  );
}

export default Home;
```

토큰이 있으면 `Home` 화면을 보여주고, 없으면 `LoginForm`을 보여줍니다. 또, 토큰을 이용해 프로필 API를 호출하여 인증된 사용자만 접근할 수 있도록 조건부 렌더링합니다.

### (4) 로그인 홈 화면 전환 구현

로그인 성공 시 홈 화면 또는 대시보드로 리다이렉트되도록 구현하여 인증 후 사용자 흐름을 자연스럽게 이어가는 전환 과정을 학습한다.

```jsx
// App.js (추가 - React Router 활용)
// 라우팅에 필요한 컴포넌트들. Navigate는 자동 리다이렉트에 사용
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  // 토큰 상태(로그인 여부 판별 기준)
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  return (
    // BrowserRouter: 라우팅 기능을 앱 전체에 제공
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          // 토큰이 있으면 홈, 없으면 /login으로 강제 이동
          element={token ? <Home /> : <Navigate to="/login" />}
        />
        {/* 로그인 경로: 로그인 성공 콜백 전달 */}
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
      </Routes>
    </BrowserRouter>
  );
}
```

로그인 성공 시 `/` 경로(홈 화면)으로 자동 전환되도록 `Navigate`를 사용합니다. 로그인이 안 되어 있으면 `/login`으로 강제 이동시켜 보안 흐름을 유지합니다.

### (5) 로그인 기능 구현 실습

아래 실습은 로컬 `public/member.json`을 이용한 모의 로그인, JWT(학습용 페이크 토큰) 생성·저장, Context 기반 전역 인증 상태, 보호 라우트, 로그인 후 홈 리다이렉트, 에러·로딩 처리 등을 포함합니다. 코드를 복사해 `create-react-app`으로 바로 실행할 수 있도록 구성했습니다.

① **디렉터리 구조**

```
ex03/
├── package.json
├── public/
│   ├── index.html
│   └── member.json
└── src/
    ├── index.js
    ├── App.js
    ├── App.css
    ├── utils/
    │   ├── api.js
    │   └── jwt.js
    ├── context/
    │   └── AuthContext.js
    ├── components/
    │   ├── Header.js
    │   ├── LoginForm.js
    │   └── ProtectedRoute.js
    └── pages/
        ├── LoginPage.js
        └── HomePage.js
```

② **설치 및 실행 명령**

```bash
# 1) 프로젝트 생성 (바로 시작하려면 아래 대로)
npx create-react-app ex03
cd ex03

# 2) 라우터 설치 (버전 6 명시)
npm install react-router-dom@6

# 3) (선택) styled-components 등 추가 패키지 필요시 설치
# npm install styled-components

# 4) 코드를 src/ 및 public/에 붙여넣은 뒤 실행
npm start
```

③ **public/member.json (모의 사용자 데이터)**

```json
[
  { "id": 1, "username": "alice", "password": "alice1234", "name": "Alice Kim", "role": "user" },
  { "id": 2, "username": "bob", "password": "bob1234", "name": "Bob Lee", "role": "admin" }
]
```

④ **src/utils/jwt.js (학습용 페이크 JWT 생성/파싱)**

```js
// src/utils/jwt.js
// 간단한 Base64(학습용)으로 토큰 생성/파싱 — 실제 서비스에서는 서버 서명 검증 필요
// payload: 토큰에 담을 사용자 정보, expiresInSec: 만료까지 초(기본 24시간)
export function createFakeJWT(payload = {}, expiresInSec = 60 * 60 * 24) {
  // JWT 헤더(알고리즘/타입). 학습용이라 형식만 흉내냄
  const hdr = { alg: "HS256", typ: "JWT" };
  // 현재 시각(초 단위)
  const now = Math.floor(Date.now() / 1000);
  // 본문: payload + 발급시각(iat) + 만료시각(exp)
  const body = { ...payload, iat: now, exp: now + expiresInSec };
  // 객체를 URL-safe하게 Base64 인코딩하는 헬퍼(한글 등 비ASCII도 안전 처리)
  const b64 = (o) => btoa(unescape(encodeURIComponent(JSON.stringify(o))));
  // header.payload.signature 형태로 조립(서명은 가짜 문자열)
  return `${b64(hdr)}.${b64(body)}.signature`;
}

// 토큰 문자열을 받아 payload(본문) 객체로 복원
export function parseFakeJWT(token) {
  try {
    // '.'으로 세 부분(header.payload.signature)으로 분리
    const parts = token.split(".");
    // 형식이 어긋나면 null 반환
    if (parts.length < 2) return null;
    // 두 번째 조각(payload)을 Base64 디코드 후 JSON 파싱
    const payload = JSON.parse(decodeURIComponent(escape(atob(parts[1]))));
    return payload;
  } catch (e) {
    // 잘못된 토큰이면 null 반환(예외 무시)
    return null;
  }
}

// 토큰 만료 여부 판별
export function isExpired(token) {
  const p = parseFakeJWT(token);
  // 파싱 실패하거나 exp가 없으면 만료로 간주(안전 기본값)
  if (!p || !p.exp) return true;
  // 현재 시각이 만료시각 이상이면 만료
  return Math.floor(Date.now() / 1000) >= p.exp;
}
```

⑤ **src/utils/api.js (모의 로그인 함수 — member.json 조회)**

```js
// src/utils/api.js
import { createFakeJWT } from "./jwt";

// 입력 아이디/비밀번호로 모의 로그인 수행
export async function mockLogin({ username, password }) {
  // member.json은 public 폴더에 있어 /member.json으로 접근 가능
  const res = await fetch("/member.json");
  // 로드 실패 시 에러
  if (!res.ok) throw new Error("사용자 데이터 로드 실패");
  const users = await res.json();
  // 간단한 인증 (학습용) — plaintext 비밀번호 비교
  // 아이디와 비밀번호가 모두 일치하는 사용자를 찾음
  const user = users.find((u) => u.username === username && u.password === password);
  // 인위적 지연 (UX용)
  // 실제 네트워크처럼 0.6초 대기시켜 로딩 UI를 체험
  await new Promise((r) => setTimeout(r, 600));
  if (!user) {
    // 일치하는 사용자가 없으면 에러 객체에 코드까지 담아 던짐
    const err = new Error("아이디 또는 비밀번호가 올바르지 않습니다.");
    err.code = "INVALID_CREDENTIALS";
    throw err;
  }
  // 인증 성공: 사용자 정보를 담은 가짜 JWT 발급(24시간 유효)
  const token = createFakeJWT({ sub: user.id, username: user.username, name: user.name, role: user.role }, 60 * 60 * 24);
  // 토큰과 (비밀번호 제외한) 사용자 정보를 반환
  return { token, user: { id: user.id, username: user.username, name: user.name, role: user.role } };
}
```

⑥ **src/context/AuthContext.js (전역 인증 상태)**

```jsx
// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { parseFakeJWT, isExpired } from "../utils/jwt";

// 인증 정보를 앱 전역에 공유할 Context 생성
const AuthContext = createContext(null);
// localStorage에 토큰을 저장할 때 사용할 키 이름
const TOKEN_KEY = "ex03_token";

// AuthProvider: 하위 컴포넌트들에게 인증 상태와 함수를 공급
export function AuthProvider({ children }) {
  // 토큰 초기값을 localStorage에서 읽어옴(지연 초기화)
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  // 사용자 정보 초기값을 토큰에서 복원
  const [user, setUser] = useState(() => {
    const t = localStorage.getItem(TOKEN_KEY);
    if (!t) return null;
    // 만료된 토큰이면 제거하고 비로그인 처리
    if (isExpired(t)) {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }
    // 유효하면 토큰 payload에서 사용자 정보 추출
    const p = parseFakeJWT(t);
    return p ? { id: p.sub, username: p.username, name: p.name, role: p.role } : null;
  });

  // 토큰이 바뀔 때마다 사용자 상태를 동기화
  useEffect(() => {
    // 토큰이 없으면 비로그인 상태로 정리
    if (!token) {
      setUser(null);
      localStorage.removeItem(TOKEN_KEY);
      return;
    }
    // 토큰이 만료됐으면 모든 인증 상태 초기화
    if (isExpired(token)) {
      setToken(null);
      setUser(null);
      localStorage.removeItem(TOKEN_KEY);
      return;
    }
    // 유효한 토큰이면 payload로 사용자 정보 갱신
    const p = parseFakeJWT(token);
    setUser(p ? { id: p.sub, username: p.username, name: p.name, role: p.role } : null);
  }, [token]);

  // 로그인: 토큰/사용자 저장 및 상태 갱신
  const login = ({ token, user }) => {
    localStorage.setItem(TOKEN_KEY, token);
    setToken(token);
    setUser(user);
  };

  // 로그아웃: 저장된 토큰 제거 및 상태 초기화
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  // Context로 내려줄 값. useMemo로 불필요한 재생성 방지(isAuth = 토큰+유저 둘 다 있음)
  const value = useMemo(() => ({ token, user, isAuth: !!token && !!user, login, logout }), [token, user]);

  // Provider로 감싸 하위 트리에 value 공급
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 커스텀 훅: 어디서든 인증 정보를 간편하게 가져오기
export function useAuth() {
  const ctx = useContext(AuthContext);
  // Provider 밖에서 쓰면 실수를 알려주는 에러
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
```

⑦ **src/components/ProtectedRoute.js (인증 보호 라우트)**

```jsx
// src/components/ProtectedRoute.js
import React from "react";
// Outlet: 보호된 자식 라우트를 렌더링하는 자리, Navigate: 리다이렉트용
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  // 전역 인증 여부 확인
  const { isAuth } = useAuth();
  // 인증됐으면 자식 라우트 표시, 아니면 /login으로 이동(replace로 히스토리 대체)
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}
```

⑧ **src/components/LoginForm.js (폼 컴포넌트 — 로딩/에러 처리 포함)**

```jsx
// src/components/LoginForm.js
import React, { useReducer, useState } from "react";
import { mockLogin } from "../utils/api";

// 입력 폼의 초기 상태
const init = { username: "", password: "" };
// reducer: 액션 타입에 따라 폼 상태를 갱신
function reducer(state, action) {
  switch (action.type) {
    case "SET": return { ...state, [action.key]: action.value }; // 특정 필드만 변경
    case "RESET": return init;                                   // 초기화
    default: return state;
  }
}

// onSuccess: 로그인 성공 시 결과를 부모로 넘기는 콜백
export default function LoginForm({ onSuccess }) {
  // useReducer로 username/password를 하나의 상태로 관리
  const [state, dispatch] = useReducer(reducer, init);
  // 로딩/에러 상태
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();   // 기본 제출 막기
    setError(null);       // 이전 에러 초기화
    setLoading(true);     // 로딩 시작
    try {
      // 모의 로그인 호출(아이디 앞뒤 공백 제거)
      const result = await mockLogin({ username: state.username.trim(), password: state.password });
      onSuccess(result);              // 성공 결과 부모로 전달
      dispatch({ type: "RESET" });    // 폼 초기화
    } catch (err) {
      // 실패 메시지 표시
      setError(err.message || "로그인 실패");
    } finally {
      setLoading(false);  // 성공/실패 무관하게 로딩 종료
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 420 }}>
      <div style={{ marginBottom: 8 }}>
        <label>아이디</label>
        {/* 입력 시 dispatch로 username 필드 갱신 */}
        <input value={state.username} onChange={(e) => dispatch({ type: "SET", key: "username", value: e.target.value })} required />
      </div>
      <div style={{ marginBottom: 8 }}>
        <label>비밀번호</label>
        <input type="password" value={state.password} onChange={(e) => dispatch({ type: "SET", key: "password", value: e.target.value })} required />
      </div>
      {/* 에러가 있을 때만 빨간 글씨로 표시 */}
      {error && <div style={{ color: "crimson", marginBottom: 8 }}>{error}</div>}
      {/* 로딩 중에는 버튼 비활성화 및 문구 변경 */}
      <button type="submit" disabled={loading}>{loading ? "로그인 중…" : "로그인"}</button>
    </form>
  );
}
```

⑨ **src/components/Header.js**

```jsx
// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  // 전역 인증 상태와 로그아웃 함수 가져오기
  const { isAuth, user, logout } = useAuth();
  return (
    <header style={{ display: "flex", justifyContent: "space-between", padding: 12, borderBottom: "1px solid #eee" }}>
      {/* 로고: 클릭 시 홈으로 이동(새로고침 없는 SPA 이동) */}
      <div><Link to="/">EX03</Link></div>
      <div>
        {/* 로그인 여부에 따라 사용자 정보+로그아웃 또는 로그인 버튼 표시 */}
        {isAuth ? (
          <>
            {/* user가 있을 때만 안전하게 접근(?.) */}
            <span style={{ marginRight: 12 }}>{user?.name} ({user?.role})</span>
            <button onClick={logout}>로그아웃</button>
          </>
        ) : (
          <Link to="/login"><button>로그인</button></Link>
        )}
      </div>
    </header>
  );
}
```

⑩ **src/pages/LoginPage.js**

```jsx
// src/pages/LoginPage.js
import React from "react";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  // 전역 login 함수
  const { login } = useAuth();
  // 프로그래밍 방식 페이지 이동 함수
  const navigate = useNavigate();

  // 로그인 성공 시 처리
  const handleSuccess = ({ token, user }) => {
    login({ token, user });  // 전역 인증 상태 저장
    // 로그인 후 홈으로 이동
    // replace: true → 뒤로가기 시 로그인 페이지로 안 돌아가게 히스토리 교체
    navigate("/home", { replace: true });
  };

  return (
    <main style={{ padding: 24 }}>
      <h2>로그인</h2>
      {/* 성공 콜백을 폼에 전달 */}
      <LoginForm onSuccess={handleSuccess} />
    </main>
  );
}
```

⑪ **src/pages/HomePage.js**

```jsx
// src/pages/HomePage.js
import React from "react";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  // 전역 상태에서 로그인 사용자 정보 가져오기
  const { user } = useAuth();
  return (
    <main style={{ padding: 24 }}>
      <h2>홈</h2>
      {/* user가 없을 수 있으므로 ?.로 안전하게 접근 */}
      <p>환영합니다, {user?.name} 님!</p>
      <p>이곳은 보호된 홈 화면입니다.</p>
    </main>
  );
}
```

⑫ **src/App.js (라우팅 + 레이아웃)**

```jsx
// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    // AuthProvider로 감싸 전체 앱에 인증 상태 공급
    <AuthProvider>
      {/* BrowserRouter로 라우팅 활성화 */}
      <BrowserRouter>
        {/* 모든 페이지 상단에 공통 헤더 표시 */}
        <Header />
        <Routes>
          {/* 루트 접근 시 /home으로 리다이렉트 */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          {/* 로그인 페이지(공개 경로) */}
          <Route path="/login" element={<LoginPage />} />
          {/* ProtectedRoute로 감싼 경로는 인증된 경우에만 접근 가능 */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<HomePage />} />
          </Route>
          {/* 정의되지 않은 모든 경로는 /home으로 보냄 */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
```

⑬ **src/index.js**

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// index.html의 root div에 React 루트 생성
const root = ReactDOM.createRoot(document.getElementById("root"));
// App을 화면에 렌더링
root.render(<App />);
```

⑭ **src/App.css**

```css
/* 기본 본문 스타일: 폰트, 여백 제거, 배경/글자색 */
body { font-family: Arial, Helvetica, sans-serif; margin:0; background:#f7f8fa; color:#222; }
/* 링크 밑줄 제거 및 글자색 상속 */
a { text-decoration:none; color:inherit; }
/* 버튼 공통 스타일 */
button { cursor:pointer; padding:6px 10px; border-radius:6px; border:1px solid #ddd; background:#fff; }
/* 입력창 공통 스타일(box-sizing으로 패딩 포함 너비 계산) */
input { padding:8px; border:1px solid #ccc; border-radius:6px; width:100%; box-sizing:border-box; }
/* 메인 영역: 가운데 정렬 + 최대 너비 제한 */
main { padding:20px; max-width:900px; margin:0 auto; }
```

⑮ **동작 흐름**

1. `/login`에서 아이디/비밀번호 입력 → `mockLogin()` 호출 (member.json에서 조회)
2. 성공 시 `{ token, user }` 반환 → `AuthContext.login()`으로 token/user 저장 (`localStorage`)
3. `AuthProvider`가 전역 상태를 제공 → `isAuth`가 보호 라우트로 동작(`ProtectedRoute`)
4. 인증 상태일 때 `/home`에 접근 가능, 비인증 시 `/login`으로 리다이렉트
5. 로그아웃 시 `localStorage` 제거 및 인증 상태 초기화
