# JavaScript와 브라우저

JavaScript는 웹 페이지에 생명을 불어넣는 언어입니다. 변수와 함수만으로는 정적인 계산밖에 할 수 없지만, **객체와 배열 메서드**로 데이터를 다루고, **DOM**으로 화면을 조작하며, **이벤트**로 사용자와 상호작용하고, **비동기와 fetch**로 서버와 통신하면 비로소 진짜 웹 애플리케이션이 됩니다. 이 장에서 배우는 개념들(데이터 변환, 선언적 조작, 이벤트 핸들러, 비동기 데이터 로딩)은 그대로 React로 이어지는 핵심 토대입니다.

---

## 5.1 객체와 배열 메서드

JavaScript에서 가장 많이 다루는 두 가지 자료구조는 **객체(object)**와 **배열(array)**입니다. 객체는 "이름표가 붙은 값들의 묶음"이고, 배열은 "순서가 있는 값들의 목록"입니다. 실무 데이터는 대부분 "객체들의 배열" 형태(예: 사용자 목록, 상품 목록)로 표현됩니다.

### 객체 기초

```js
// 객체: 중괄호 {} 안에 key: value 쌍을 나열한다
const user = {
  name: "수민",      // 문자열 값
  age: 28,            // 숫자 값
  isAdmin: false,     // 불리언 값
  hobbies: ["독서", "코딩"], // 값으로 배열도 가능
};

// 점 표기법(dot notation)으로 속성에 접근
console.log(user.name); // 결과: "수민"

// 대괄호 표기법(bracket notation) - key가 동적일 때 사용
const key = "age";
console.log(user[key]); // 결과: 28

// 속성 추가 / 수정
user.job = "개발자";   // 새 속성 추가
user.age = 29;          // 기존 속성 수정
console.log(user.job);  // 결과: "개발자"

// 구조 분해 할당(destructuring) - 필요한 속성만 변수로 꺼낸다
const { name, age } = user;
console.log(name, age); // 결과: "수민" 29

// 스프레드(spread) 연산자 - 기존 객체를 복사하며 일부만 덮어쓴다 (불변성 패턴)
const updatedUser = { ...user, age: 30 };
console.log(updatedUser.age); // 결과: 30
console.log(user.age);        // 결과: 29 (원본은 그대로!)
```

> `{ ...user, age: 30 }` 처럼 원본을 바꾸지 않고 새 객체를 만드는 **불변성(immutability)** 패턴은 React의 state 업데이트에서 그대로 쓰이므로 꼭 익혀두세요.

### 배열 메서드 정리

배열을 다룰 때는 `for` 반복문 대신 **고차 함수(higher-order function)** 메서드를 쓰는 것이 현대적인 방식입니다. 이 메서드들은 "무엇을 할지"를 선언적으로 표현합니다.

| 메서드 | 역할 | 반환값 | 원본 변경 |
|--------|------|--------|-----------|
| `map()` | 각 요소를 변환 | **새 배열**(길이 동일) | X |
| `filter()` | 조건에 맞는 요소만 추림 | **새 배열**(길이 ≤ 원본) | X |
| `reduce()` | 모든 요소를 하나의 값으로 누적 | **누적 결과값** | X |
| `forEach()` | 각 요소로 작업 실행(반복만) | `undefined` | X |
| `find()` | 조건에 맞는 **첫 요소** | 요소 또는 `undefined` | X |
| `some()` / `every()` | 하나라도/전부 조건 만족? | 불리언 | X |

```js
const numbers = [1, 2, 3, 4, 5];

// map: 각 요소를 2배로 변환한 "새 배열"을 만든다
const doubled = numbers.map((n) => n * 2);
console.log(doubled); // 결과: [2, 4, 6, 8, 10]

// filter: 조건(짝수)을 만족하는 요소만 모은 "새 배열"
const evens = numbers.filter((n) => n % 2 === 0);
console.log(evens); // 결과: [2, 4]

// reduce: 모든 요소를 하나의 값(합계)으로 누적
//   첫 번째 인자 = (누적값 acc, 현재값 n) => 새 누적값
//   두 번째 인자 0 = acc의 초기값
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 결과: 15

// forEach: 반환값 없이 각 요소에 대해 동작만 수행
numbers.forEach((n) => {
  console.log(`값: ${n}`); // 결과: 값: 1, 값: 2, ... 값: 5
});
```

### 객체 배열 다루기 (실무 패턴)

```js
// 실무 데이터는 보통 "객체들의 배열" 형태다
const products = [
  { id: 1, name: "노트북", price: 1200000, inStock: true },
  { id: 2, name: "마우스", price: 30000, inStock: false },
  { id: 3, name: "키보드", price: 80000, inStock: true },
];

// 1) 재고 있는 상품만 골라서(filter) 이름만 추출(map)하기 - 메서드 체이닝
const availableNames = products
  .filter((p) => p.inStock)        // 재고 있는 것만: 노트북, 키보드
  .map((p) => p.name);             // 이름만 뽑기
console.log(availableNames); // 결과: ["노트북", "키보드"]

// 2) 전체 상품 가격 합계 구하기(reduce)
const totalPrice = products.reduce((acc, p) => acc + p.price, 0);
console.log(totalPrice); // 결과: 1310000

// 3) id로 특정 상품 찾기(find)
const target = products.find((p) => p.id === 2);
console.log(target.name); // 결과: "마우스"
```

> React에서 목록을 화면에 그릴 때 `products.map((p) => <li key={p.id}>{p.name}</li>)` 처럼 `map`을 그대로 사용합니다. 지금 배운 패턴이 곧 React 렌더링의 기본기입니다.

---

## 5.2 DOM 선택과 조작

**DOM(Document Object Model)**은 브라우저가 HTML 문서를 읽어 만든 **트리 구조의 객체 모델**입니다. JavaScript는 이 DOM을 통해 HTML 요소를 선택하고, 내용·속성·스타일을 바꿉니다. 즉 "JS로 화면을 조작한다"는 것은 "DOM을 조작한다"는 뜻입니다.

```html
<!-- 아래 예제들이 다룰 기본 HTML 구조 -->
<div id="app">
  <h1 class="title">할 일 목록</h1>
  <ul id="todo-list">
    <li class="todo">공부하기</li>
    <li class="todo">운동하기</li>
  </ul>
  <button id="add-btn">추가</button>
</div>
```

### DOM 선택 메서드

| 메서드 | 선택 기준 | 반환값 |
|--------|-----------|--------|
| `querySelector(sel)` | CSS 선택자 | **첫 번째** 일치 요소(없으면 `null`) |
| `querySelectorAll(sel)` | CSS 선택자 | 일치하는 **모든** 요소(NodeList) |
| `getElementById(id)` | id 값 | 해당 요소(없으면 `null`) |
| `getElementsByClassName(c)` | 클래스명 | HTMLCollection(실시간) |

```js
// querySelector: CSS 선택자로 "첫 번째" 요소 선택 (가장 권장되는 방법)
const title = document.querySelector(".title");   // 클래스 .title
const list = document.querySelector("#todo-list"); // id #todo-list
const firstTodo = document.querySelector("li.todo"); // 태그+클래스

// querySelectorAll: 일치하는 "모든" 요소를 NodeList로 반환
const todos = document.querySelectorAll(".todo");
console.log(todos.length); // 결과: 2

// NodeList는 forEach로 순회 가능
todos.forEach((li) => {
  console.log(li.textContent); // 결과: "공부하기", "운동하기"
});

// getElementById: id로 선택 (#을 붙이지 않는 점에 주의)
const btn = document.getElementById("add-btn");
```

### DOM 내용·속성·스타일 조작

```js
const title = document.querySelector(".title");

// 1) 텍스트 내용 변경
title.textContent = "오늘의 할 일"; // 화면 글자가 바뀐다

// 2) HTML 내용 변경 (태그 포함) - 단, 사용자 입력을 넣으면 XSS 위험 주의
title.innerHTML = "오늘의 <strong>할 일</strong>";

// 3) 속성(attribute) 조작
const btn = document.getElementById("add-btn");
btn.setAttribute("disabled", "true"); // 속성 추가 → 버튼 비활성화
btn.removeAttribute("disabled");       // 속성 제거 → 다시 활성화

// 4) 클래스 조작 (classList)
title.classList.add("highlight");      // 클래스 추가
title.classList.remove("title");       // 클래스 제거
title.classList.toggle("active");      // 있으면 빼고 없으면 추가
console.log(title.classList.contains("highlight")); // 결과: true

// 5) 인라인 스타일 조작 (CSS 속성은 카멜케이스)
title.style.color = "tomato";          // color: tomato
title.style.fontSize = "32px";         // font-size: 32px
```

### 요소 생성·추가·삭제

```js
const list = document.querySelector("#todo-list");

// 1) 새 요소 생성
const newItem = document.createElement("li"); // <li></li> 생성
newItem.textContent = "물 마시기";            // 내용 채우기
newItem.classList.add("todo");                 // 클래스 부여

// 2) 부모 요소에 자식으로 추가
list.appendChild(newItem); // <ul> 끝에 <li>물 마시기</li> 추가됨

// 3) 요소 삭제
const first = document.querySelector(".todo");
first.remove(); // 첫 번째 할 일 제거

// 4) 여러 데이터를 한 번에 렌더링하는 패턴 (배열 → DOM)
const data = ["회의 준비", "이메일 확인", "보고서 작성"];
list.innerHTML = ""; // 기존 목록 비우기
data.forEach((text) => {
  const li = document.createElement("li");
  li.textContent = text;
  list.appendChild(li);
});
// 결과: <ul>에 3개의 <li>가 채워진다
```

> 이렇게 "데이터를 직접 DOM에 그려 넣는" 명령형(imperative) 방식은 항목이 많아질수록 복잡해집니다. React는 "데이터(state)만 바꾸면 화면은 알아서 그려진다"는 **선언형(declarative)** 방식으로 이 문제를 해결합니다. 그래서 5.1의 `map`이 React에서 다시 등장합니다.

---

## 5.3 이벤트 처리

**이벤트(event)**는 사용자의 클릭, 입력, 스크롤 등 "브라우저에서 일어나는 일"입니다. 우리는 특정 요소에 **이벤트 리스너(listener)**를 등록해 그 일이 일어났을 때 실행할 함수(핸들러)를 지정합니다. 표준 방식은 `addEventListener`입니다.

### 주요 이벤트

| 이벤트 이름 | 발생 시점 | 자주 쓰는 요소 |
|-------------|-----------|----------------|
| `click` | 마우스 클릭 | 버튼, 링크 등 모든 요소 |
| `input` | 입력값이 바뀔 때마다 | `<input>`, `<textarea>` |
| `change` | 값 변경 후 포커스 이탈 | `<select>`, 체크박스 |
| `submit` | 폼 제출 | `<form>` |
| `keydown` / `keyup` | 키를 누름 / 뗌 | 입력 요소, 문서 |
| `mouseover` / `mouseout` | 마우스 진입 / 이탈 | 모든 요소 |
| `DOMContentLoaded` | HTML 파싱 완료 | `document` |

### addEventListener 기본

```js
const btn = document.getElementById("add-btn");

// addEventListener(이벤트이름, 핸들러함수)
btn.addEventListener("click", () => {
  console.log("버튼이 클릭되었습니다!"); // 클릭할 때마다 실행
});

// 핸들러는 event 객체를 자동으로 전달받는다
btn.addEventListener("click", (event) => {
  console.log(event.type);   // 결과: "click"
  console.log(event.target); // 결과: 클릭된 요소(btn) 자체
});
```

### 입력 이벤트와 event 객체

```html
<input id="name-input" type="text" placeholder="이름 입력" />
<p id="greeting"></p>
```

```js
const input = document.getElementById("name-input");
const greeting = document.getElementById("greeting");

// input 이벤트: 글자를 칠 때마다 발생
input.addEventListener("input", (event) => {
  // event.target.value = 현재 입력창에 들어있는 값
  const text = event.target.value;
  greeting.textContent = `안녕하세요, ${text}님!`;
  // 입력: "수민" → 결과: "안녕하세요, 수민님!"
});
```

### 폼 제출과 preventDefault

```html
<form id="login-form">
  <input id="email" type="email" />
  <button type="submit">로그인</button>
</form>
```

```js
const form = document.getElementById("login-form");

form.addEventListener("submit", (event) => {
  // 폼은 기본적으로 제출 시 페이지를 새로고침한다
  event.preventDefault(); // 기본 동작(새로고침)을 막는다 (SPA의 핵심!)

  const email = document.getElementById("email").value;
  console.log("입력된 이메일:", email); // 새로고침 없이 값 처리
});
```

### 이벤트 위임 (event delegation)

목록의 각 항목마다 리스너를 다는 대신, **부모 한 곳**에만 리스너를 달고 `event.target`으로 실제 클릭된 자식을 구분하는 기법입니다. 동적으로 추가된 항목까지 처리할 수 있어 효율적입니다.

```js
const list = document.querySelector("#todo-list");

// 부모 <ul>에 한 번만 리스너를 등록
list.addEventListener("click", (event) => {
  // 클릭된 요소가 <li>일 때만 처리
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("done"); // 완료 표시 토글
    console.log(`"${event.target.textContent}" 클릭됨`);
  }
});
// li가 100개여도 리스너는 단 1개! 나중에 추가된 li도 자동 처리됨
```

> React에서는 `<button onClick={handleClick}>`처럼 JSX 속성으로 이벤트를 연결합니다. 내부적으로는 결국 이벤트 시스템을 쓰지만, 우리가 직접 `addEventListener`를 호출할 필요는 없어집니다. 다만 `event.preventDefault()`, `event.target.value` 같은 개념은 React에서도 그대로 사용됩니다.

---

## 5.4 비동기와 fetch 기초

웹 앱은 서버에서 데이터를 받아와 화면에 보여줍니다. 그런데 네트워크 요청은 시간이 걸리므로, JavaScript는 응답을 **기다리는 동안 멈추지 않고** 다른 일을 계속하는 **비동기(asynchronous)** 방식으로 처리합니다. 핵심 도구는 **Promise**, **async/await**, 그리고 데이터를 가져오는 **fetch**입니다.

### 동기 vs 비동기

```js
// 동기(synchronous): 위에서 아래로 한 줄씩, 끝나야 다음 줄
console.log("1");
console.log("2");
console.log("3");
// 결과: 1, 2, 3 (순서대로)

// 비동기(asynchronous): 오래 걸리는 작업은 미뤄두고 다음 코드를 먼저 실행
console.log("A");
setTimeout(() => {
  console.log("B"); // 1초 뒤에 실행 (그동안 멈추지 않음)
}, 1000);
console.log("C");
// 결과: A, C, B  (B가 마지막에 출력됨)
```

### Promise

**Promise**는 "지금은 없지만 미래에 완료될 작업의 결과"를 담는 객체입니다. 세 가지 상태가 있습니다: 대기(pending) → 성공(fulfilled) 또는 실패(rejected).

```js
// Promise는 .then(성공처리).catch(실패처리) 로 결과를 받는다
const promise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("데이터 도착!"); // 성공 → then으로 전달
  } else {
    reject("에러 발생!");    // 실패 → catch로 전달
  }
});

promise
  .then((result) => console.log(result)) // 결과: "데이터 도착!"
  .catch((error) => console.log(error))  // 실패 시 실행
  .finally(() => console.log("작업 종료")); // 성공/실패 무관하게 항상 실행
```

### fetch로 데이터 가져오기 (.then 방식)

`fetch(url)`은 네트워크 요청을 보내고 **Promise**를 반환합니다.

```js
// fetch는 Promise를 반환한다
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then((response) => {
    // response는 응답 자체(헤더, 상태코드 등). 본문은 .json()으로 파싱
    if (!response.ok) throw new Error("요청 실패"); // 404, 500 등 처리
    return response.json(); // .json()도 Promise를 반환
  })
  .then((data) => {
    console.log(data.name); // 결과: 서버가 준 사용자 이름
  })
  .catch((error) => {
    console.log("에러:", error.message); // 네트워크 오류 처리
  });
```

### async / await (권장 방식)

`async/await`는 Promise를 **동기 코드처럼 읽기 쉽게** 쓰는 문법입니다. `await`는 "이 Promise가 끝날 때까지 기다린 뒤 결과값을 꺼내라"는 뜻이며, `async` 함수 안에서만 쓸 수 있습니다.

```js
// async 함수 안에서 await 사용
async function getUser() {
  try {
    // await: fetch가 끝날 때까지 기다렸다가 response를 받는다
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    if (!response.ok) throw new Error("요청 실패"); // 에러 상태 처리

    // await: json 파싱이 끝날 때까지 기다린다
    const data = await response.json();
    console.log(data.name); // 결과: 사용자 이름

    return data; // async 함수의 반환값도 Promise로 감싸진다
  } catch (error) {
    // try 블록 안의 어떤 await에서든 에러가 나면 여기로 온다
    console.log("에러 발생:", error.message);
  }
}

getUser(); // 함수 호출
```

### 실전: 데이터를 가져와 화면에 그리기

지금까지 배운 모든 것(fetch + async/await + 배열 메서드 + DOM 조작)을 하나로 합친 예제입니다.

```html
<ul id="user-list"></ul>
```

```js
async function renderUsers() {
  const list = document.getElementById("user-list");
  try {
    // 1) 서버에서 사용자 목록(배열)을 비동기로 가져온다
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json(); // users = 객체들의 배열

    // 2) 배열 메서드 map으로 각 사용자를 <li> HTML 문자열로 변환
    const html = users
      .map((user) => `<li>${user.name} (${user.email})</li>`)
      .join(""); // 배열을 하나의 문자열로 합친다

    // 3) DOM에 그려 넣는다
    list.innerHTML = html;
  } catch (error) {
    list.innerHTML = "<li>데이터를 불러오지 못했습니다.</li>";
  }
}

renderUsers(); // 페이지 로드 시 실행
```

> 이 패턴 — "비동기로 데이터를 받아 → state에 담고 → map으로 목록을 렌더링한다" — 은 React 앱에서 거의 모든 화면이 동작하는 방식입니다. React에서는 `useEffect` 안에서 `fetch`하고, 받은 데이터를 `useState`에 저장하면 화면이 자동으로 갱신됩니다. 즉, 이 장 전체가 React로 가는 직행 다리입니다.

### 정리

- **객체/배열 메서드**: 데이터를 변환(map)·추림(filter)·누적(reduce)하는 선언적 도구. 불변성 패턴(스프레드)은 React state의 기본.
- **DOM**: 브라우저가 만든 트리. `querySelector`로 선택하고 내용·속성·스타일을 조작.
- **이벤트**: `addEventListener`로 사용자 상호작용을 처리. `event.target.value`, `preventDefault`가 핵심.
- **비동기/fetch**: `async/await`로 서버 데이터를 받아 화면을 그린다. React 데이터 흐름의 토대.
