# JavaScript 기초 문법

JavaScript는 웹 페이지에 동작과 상호작용을 더해 주는 프로그래밍 언어입니다. HTML이 구조를, CSS가 디자인을 담당한다면 JavaScript는 사용자의 클릭에 반응하고, 데이터를 계산하고, 화면을 동적으로 바꾸는 일을 맡습니다. 이 장에서는 변수와 자료형부터 연산자, 조건문, 반복문, 함수와 스코프까지 JavaScript의 가장 기본이 되는 문법을 차근차근 익혀 봅니다.

## 4.1 변수와 자료형

변수(variable)는 값을 담아 두는 이름표가 붙은 상자입니다. 한 번 값을 저장해 두면 이름으로 언제든 꺼내 쓸 수 있습니다. 현대 JavaScript에서는 변수를 선언할 때 `let`과 `const`를 사용하며, 예전 방식인 `var`는 가급적 쓰지 않습니다.

- **`const`**: 값을 다시 바꿀 수 없는 상수. 기본적으로 `const`를 먼저 고려합니다.
- **`let`**: 값을 나중에 바꿀 수 있는 변수. 재할당이 필요할 때만 사용합니다.
- **`var`**: 과거 방식. 스코프 규칙이 헷갈리고 호이스팅 문제가 있어 권장하지 않습니다.

```js
// const 로 상수를 선언 (값 재할당 불가)
const name = "홍길동"; // 문자열 값을 name 에 저장

// let 으로 변수를 선언 (값 재할당 가능)
let age = 20; // 숫자 값을 age 에 저장
age = 21; // let 이므로 값을 바꿀 수 있음

console.log(name); // 출력: 홍길동
console.log(age); // 출력: 21

// const 로 선언한 값을 바꾸려 하면 에러 발생
// name = "김철수"; // TypeError: Assignment to constant variable.
```

### 자료형(Data Type)

JavaScript의 값은 크게 원시 타입(primitive)과 객체 타입(object)으로 나뉩니다. 자주 쓰는 자료형을 정리하면 다음과 같습니다.

| 자료형 | 설명 | 예시 |
| --- | --- | --- |
| `string` | 문자열(글자) | `"안녕"`, `'JS'` |
| `number` | 숫자(정수·실수 구분 없음) | `42`, `3.14` |
| `boolean` | 참/거짓 | `true`, `false` |
| `undefined` | 값이 할당되지 않은 상태 | `let x;` |
| `null` | 값이 비어 있음을 의도적으로 표현 | `let y = null;` |
| `object` | 여러 값을 묶은 묶음 | `{ name: "홍길동" }` |
| `array` | 순서가 있는 값의 목록(객체의 일종) | `[1, 2, 3]` |

```js
// 다양한 자료형을 변수에 담아 본다
const message = "Hello"; // string  : 문자열
const score = 95; // number  : 숫자
const isPassed = true; // boolean : 참/거짓
let empty; // undefined : 값을 아직 안 넣음
const nothing = null; // null    : 비어 있음을 명시

// typeof 연산자로 자료형을 확인할 수 있다
console.log(typeof message); // 출력: string
console.log(typeof score); // 출력: number
console.log(typeof isPassed); // 출력: boolean
console.log(typeof empty); // 출력: undefined
console.log(typeof nothing); // 출력: object  (null 은 historical 버그로 object 로 나옴)
```

### 템플릿 리터럴

백틱(`` ` ``)으로 감싼 문자열 안에서는 `${ }` 표기로 변수를 끼워 넣을 수 있습니다. 따옴표 문자열을 `+`로 잇는 것보다 훨씬 읽기 편합니다.

```js
const user = "이몽룡"; // 사용자 이름
const point = 80; // 점수

// 백틱과 ${} 로 변수를 문자열 중간에 삽입
const result = `${user}님의 점수는 ${point}점 입니다.`;

console.log(result); // 출력: 이몽룡님의 점수는 80점 입니다.
```

## 4.2 연산자와 조건문

연산자(operator)는 값을 계산하거나 비교할 때 쓰는 기호입니다. 산술, 비교, 논리 연산자가 가장 기본입니다.

### 산술 연산자

```js
const a = 10;
const b = 3;

console.log(a + b); // 출력: 13  (덧셈)
console.log(a - b); // 출력: 7   (뺄셈)
console.log(a * b); // 출력: 30  (곱셈)
console.log(a / b); // 출력: 3.333... (나눗셈)
console.log(a % b); // 출력: 1   (나머지)
console.log(a ** b); // 출력: 1000 (거듭제곱, 10의 3제곱)
```

### 비교 연산자

비교 연산자는 두 값을 견주어 `true` 또는 `false`를 돌려줍니다. `==`는 자료형을 변환해 비교하므로 헷갈리기 쉽고, **자료형까지 엄격히 비교하는 `===`를 권장**합니다.

| 연산자 | 의미 | 예시 | 결과 |
| --- | --- | --- | --- |
| `===` | 값과 타입이 모두 같음 | `1 === 1` | `true` |
| `!==` | 값 또는 타입이 다름 | `1 !== "1"` | `true` |
| `==` | 값만 같음(타입 변환) | `1 == "1"` | `true` |
| `>` | 크다 | `5 > 3` | `true` |
| `<` | 작다 | `5 < 3` | `false` |
| `>=` | 크거나 같다 | `5 >= 5` | `true` |
| `<=` | 작거나 같다 | `3 <= 5` | `true` |

```js
console.log(1 === 1); // 출력: true  (값과 타입 모두 같음)
console.log(1 === "1"); // 출력: false (number 와 string 이라 타입 다름)
console.log(1 == "1"); // 출력: true  (== 는 타입을 변환해 비교 → 권장 안 함)
console.log(5 !== 3); // 출력: true  (값이 다름)
console.log(10 >= 10); // 출력: true  (크거나 같음)
```

### 논리 연산자

| 연산자 | 이름 | 설명 |
| --- | --- | --- |
| `&&` | AND | 양쪽이 모두 참일 때 참 |
| `\|\|` | OR | 하나라도 참이면 참 |
| `!` | NOT | 참/거짓을 뒤집음 |

```js
const isMember = true; // 회원 여부
const hasCoupon = false; // 쿠폰 보유 여부

console.log(isMember && hasCoupon); // 출력: false (둘 다 true 여야 true)
console.log(isMember || hasCoupon); // 출력: true  (하나만 true 여도 true)
console.log(!isMember); // 출력: false (true 를 뒤집어 false)
```

### 조건문 (if / else if / else)

조건문은 상황에 따라 다른 코드를 실행하게 해 줍니다.

```js
const temperature = 28; // 현재 기온

// 조건을 위에서부터 차례로 검사하고, 처음 참이 되는 블록만 실행
if (temperature >= 30) {
  console.log("폭염입니다."); // 30 이상일 때
} else if (temperature >= 20) {
  console.log("따뜻합니다."); // 20 이상 30 미만일 때
} else {
  console.log("쌀쌀합니다."); // 그 외(20 미만)
}

// 출력: 따뜻합니다.
```

여러 값을 비교할 때는 `switch` 문이 깔끔합니다.

```js
const grade = "B"; // 학점

switch (grade) {
  case "A":
    console.log("우수"); // grade 가 "A" 일 때
    break; // break 로 switch 종료
  case "B":
    console.log("양호"); // grade 가 "B" 일 때 → 실행됨
    break;
  default:
    console.log("분발"); // 어느 case 와도 안 맞을 때
}

// 출력: 양호
```

조건이 단순할 때는 삼항 연산자(`조건 ? 참값 : 거짓값`)로 한 줄로 줄일 수 있습니다.

```js
const age = 19; // 나이

// age 가 19 이상이면 "성인", 아니면 "미성년자"
const label = age >= 19 ? "성인" : "미성년자";

console.log(label); // 출력: 성인
```

## 4.3 반복문과 배열 기초

반복문은 같은 작업을 여러 번 되풀이할 때 사용합니다.

| 반복문 | 사용 상황 |
| --- | --- |
| `for` | 반복 횟수가 정해져 있을 때 |
| `while` | 조건이 참인 동안 계속 반복할 때 |
| `for...of` | 배열의 각 요소를 순회할 때 |
| `forEach` | 배열의 각 요소에 함수를 적용할 때 |

```js
// for : 0 부터 시작해 5 미만일 때까지 1씩 증가하며 반복
for (let i = 0; i < 5; i++) {
  console.log(`i 의 값: ${i}`); // i 가 0,1,2,3,4 일 때마다 출력
}

// 출력:
// i 의 값: 0
// i 의 값: 1
// i 의 값: 2
// i 의 값: 3
// i 의 값: 4
```

```js
let count = 3; // 카운트다운 시작 값

// while : 조건(count > 0)이 참인 동안 반복
while (count > 0) {
  console.log(count); // 현재 count 출력
  count--; // count 를 1 감소 (안 하면 무한 루프!)
}

// 출력:
// 3
// 2
// 1
```

### 배열(Array) 기초

배열은 여러 값을 순서대로 담는 자료형입니다. 각 값은 0부터 시작하는 인덱스로 접근합니다.

```js
// 과일 이름들을 담은 배열
const fruits = ["사과", "바나나", "포도"];

console.log(fruits[0]); // 출력: 사과   (첫 번째 요소, 인덱스 0)
console.log(fruits[2]); // 출력: 포도   (세 번째 요소, 인덱스 2)
console.log(fruits.length); // 출력: 3    (요소 개수)

fruits.push("딸기"); // 배열 끝에 "딸기" 추가
console.log(fruits); // 출력: ["사과", "바나나", "포도", "딸기"]
```

배열을 순회할 때는 `for...of`나 `forEach`가 편리합니다.

```js
const scores = [90, 85, 100]; // 점수 배열

// for...of : 각 요소(score)를 차례로 꺼내 반복
for (const score of scores) {
  console.log(`점수: ${score}`); // 요소 하나씩 출력
}

// 출력:
// 점수: 90
// 점수: 85
// 점수: 100

// forEach : 화살표 함수로 각 요소와 인덱스를 처리
scores.forEach((score, index) => {
  console.log(`${index}번 점수는 ${score}`); // 인덱스와 값을 함께 출력
});

// 출력:
// 0번 점수는 90
// 1번 점수는 85
// 2번 점수는 100
```

자주 쓰는 배열 메서드도 알아 둡니다.

```js
const numbers = [1, 2, 3, 4]; // 원본 배열

// map : 각 요소를 가공해 새 배열을 만든다 (원본 불변)
const doubled = numbers.map((n) => n * 2); // 각 값을 2배로
console.log(doubled); // 출력: [2, 4, 6, 8]

// filter : 조건을 만족하는 요소만 골라 새 배열을 만든다
const evens = numbers.filter((n) => n % 2 === 0); // 짝수만 남김
console.log(evens); // 출력: [2, 4]
```

## 4.4 함수와 스코프

함수(function)는 특정 작업을 묶어 이름을 붙인 코드 블록입니다. 한 번 정의해 두면 필요할 때마다 호출(call)해 재사용할 수 있습니다.

```js
// function 키워드로 함수 선언
function greet(userName) {
  // userName 은 매개변수(parameter)
  return `${userName}님 환영합니다.`; // return 으로 결과 값을 돌려줌
}

const message = greet("성춘향"); // "성춘향"은 인수(argument)
console.log(message); // 출력: 성춘향님 환영합니다.
```

### 화살표 함수

`=>`를 쓰는 화살표 함수는 더 간결하게 함수를 표현합니다.

```js
// 화살표 함수 : 두 수를 더해 반환
const add = (x, y) => {
  return x + y; // x 와 y 를 더한 값
};

console.log(add(3, 5)); // 출력: 8

// 본문이 한 줄이면 중괄호와 return 을 생략할 수 있다
const square = (n) => n * n; // n 의 제곱을 바로 반환

console.log(square(4)); // 출력: 16
```

매개변수에는 기본값을 줄 수도 있습니다.

```js
// price 인수를 안 넘기면 기본값 0 을 사용
const formatPrice = (price = 0) => `${price}원`;

console.log(formatPrice(1000)); // 출력: 1000원
console.log(formatPrice()); // 출력: 0원  (인수 생략 → 기본값 사용)
```

### 스코프(Scope)

스코프는 변수가 유효한(접근 가능한) 범위입니다. 함수나 블록(`{ }`) 안에서 선언한 변수는 그 바깥에서 쓸 수 없습니다.

- **전역 스코프(global)**: 어디서나 접근 가능한 변수.
- **지역 스코프(local)**: 함수·블록 안에서만 접근 가능한 변수.
- `let`과 `const`는 블록 단위 스코프(block scope)를 가집니다.

```js
const globalValue = "전역"; // 전역 변수

function showScope() {
  const localValue = "지역"; // 함수 안에서만 유효한 지역 변수
  console.log(globalValue); // 전역 변수는 함수 안에서 접근 가능 → "전역"
  console.log(localValue); // 지역 변수 접근 가능 → "지역"
}

showScope();
// 출력:
// 전역
// 지역

// console.log(localValue); // ReferenceError: localValue 는 함수 밖에서 접근 불가
```

### 호이스팅(Hoisting)

JavaScript는 선언을 코드 위쪽으로 끌어올린 것처럼 처리합니다. 다만 `var`와 함수 선언은 호이스팅되지만, `let`/`const`는 선언 전에 사용하면 에러가 납니다.

```js
// 함수 선언은 호이스팅되어 정의보다 먼저 호출해도 동작한다
console.log(double(5)); // 출력: 10 (선언 전에 호출했지만 정상 동작)

function double(n) {
  return n * 2;
}

// 반면 let/const 는 선언 전에 접근하면 에러
// console.log(temp); // ReferenceError (TDZ: 일시적 사각지대)
// let temp = 10;
```

함수는 작은 단위로 나누어 작성하고, 하나의 함수는 하나의 일만 하도록 만드는 것이 좋은 코드의 기본입니다.
