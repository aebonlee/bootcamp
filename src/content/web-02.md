# CSS 스타일링 기초

CSS(Cascading Style Sheets)는 HTML로 만든 문서의 색상, 크기, 간격, 배치 등 화면에 보이는 모든 시각적 표현을 담당하는 언어입니다. HTML이 문서의 "구조와 의미"를 책임진다면, CSS는 그 구조에 "옷을 입히는" 역할을 합니다. 이 장에서는 CSS를 적용하는 방법과 선택자, 박스 모델, 색상·배경·글꼴, 그리고 단위와 CSS 변수까지 스타일링의 기초를 차근차근 익힙니다.

---

## 2.1 CSS 적용 방법과 선택자

### CSS를 적용하는 3가지 방법

CSS를 HTML에 연결하는 방법은 크게 세 가지가 있습니다.

| 방법 | 작성 위치 | 특징 | 권장도 |
| --- | --- | --- | --- |
| 인라인(Inline) | HTML 태그의 `style` 속성 | 해당 요소 하나에만 적용 | 낮음 |
| 내부(Internal) | `<head>` 안의 `<style>` 태그 | 한 문서 안에서만 공유 | 보통 |
| 외부(External) | 별도 `.css` 파일을 `<link>`로 연결 | 여러 문서가 재사용, 유지보수 쉬움 | 높음(권장) |

```html
<!-- 1) 인라인 스타일: 태그에 직접 작성 (재사용 불가, 우선순위만 높음) -->
<p style="color: red;">빨간 글씨</p>

<!-- 2) 내부 스타일: head 안에 style 태그로 작성 -->
<head>
  <style>
    p { color: blue; } /* 이 문서의 모든 p 요소에 적용 */
  </style>
</head>

<!-- 3) 외부 스타일: 별도 파일을 link로 연결 (가장 권장) -->
<head>
  <link rel="stylesheet" href="style.css">
</head>
```

### CSS 규칙의 구조

CSS는 "선택자 + 선언 블록"으로 이루어집니다. 선언은 `속성: 값;` 형태입니다.

```css
/* 선택자(selector): 어떤 요소를 꾸밀지 지정 */
/* 선언 블록: 중괄호 {} 안에 속성과 값을 작성 */
h1 {
  color: navy;        /* 속성: color, 값: navy → 글자색을 남색으로 */
  font-size: 32px;    /* 속성: font-size, 값: 32px → 글자 크기 32픽셀 */
}                     /* 세미콜론(;)으로 각 선언을 구분 */
```

### 주요 선택자 종류

| 선택자 | 표기 예 | 의미 |
| --- | --- | --- |
| 전체 선택자 | `*` | 모든 요소 |
| 태그(요소) 선택자 | `p` | 모든 `<p>` 요소 |
| 클래스 선택자 | `.box` | `class="box"`인 요소 |
| 아이디 선택자 | `#header` | `id="header"`인 요소 |
| 자손 선택자 | `div p` | `div` 안의 모든 `p` |
| 자식 선택자 | `div > p` | `div`의 바로 아래 `p` |
| 가상 클래스 | `a:hover` | 마우스를 올린 `a` |

```css
/* 전체 선택자: 모든 요소의 기본 여백 제거 (초기화에 자주 사용) */
* {
  margin: 0;
  padding: 0;
}

/* 클래스 선택자: 점(.)으로 시작, 여러 요소에 재사용 가능 */
.btn {
  padding: 10px 20px;
  background: #3498db;
}

/* 아이디 선택자: 우물정(#)으로 시작, 페이지에서 단 하나만 사용 권장 */
#main-title {
  text-align: center;
}

/* 가상 클래스: 특정 상태일 때만 적용 */
a:hover {
  color: orange; /* 링크에 마우스를 올렸을 때 주황색 */
}
```

### 우선순위(명시도)와 캐스케이드

같은 요소에 여러 규칙이 충돌하면 "명시도(specificity)"가 높은 규칙이 이깁니다.

- 인라인 스타일 > 아이디(`#`) > 클래스(`.`) > 태그
- 명시도가 같으면 나중에 작성한 규칙이 적용됩니다.
- `!important`는 모든 우선순위를 무시하지만 남용하면 유지보수가 어려워지므로 자제합니다.

```css
/* 명시도 비교 예시 */
p { color: black; }        /* 태그: 가장 약함 */
.text { color: green; }    /* 클래스: 태그보다 강함 */
#intro { color: red; }     /* 아이디: 클래스보다 강함 → 최종 적용 */
```

---

## 2.2 박스 모델

웹 페이지의 모든 요소는 사각형 "박스"로 그려집니다. 박스는 안쪽부터 **콘텐츠(content) → 패딩(padding) → 테두리(border) → 마진(margin)** 4개 영역으로 구성됩니다. 이 개념을 박스 모델이라고 부릅니다.

| 영역 | 역할 |
| --- | --- |
| content | 글자나 이미지 등 실제 내용이 들어가는 영역 |
| padding | 콘텐츠와 테두리 사이의 안쪽 여백 |
| border | 콘텐츠와 패딩을 감싸는 테두리 선 |
| margin | 테두리 바깥쪽, 다른 요소와의 거리 |

```css
.box {
  width: 200px;            /* 콘텐츠 영역의 가로 너비 */
  height: 100px;           /* 콘텐츠 영역의 세로 높이 */

  padding: 20px;           /* 안쪽 여백: 콘텐츠와 테두리 사이 20px */
  border: 2px solid #333;  /* 테두리: 두께 2px, 실선, 진회색 */
  margin: 30px;            /* 바깥 여백: 옆 요소와 30px 간격 */
}
```

### 여백을 방향별로 지정하기

`padding`과 `margin`은 값의 개수에 따라 적용 방향이 달라집니다.

```css
.spacing {
  /* 값 1개: 상하좌우 모두 동일 */
  margin: 10px;

  /* 값 2개: 상하 / 좌우 */
  margin: 10px 20px;

  /* 값 4개: 위 → 오른쪽 → 아래 → 왼쪽 (시계 방향) */
  margin: 10px 20px 30px 40px;

  /* 특정 방향만 따로 지정도 가능 */
  padding-top: 8px;
  padding-left: 16px;
}
```

### box-sizing — 크기 계산 방식

기본값 `content-box`에서는 `width`에 패딩과 테두리가 더해져 실제 박스가 커집니다. 이를 직관적으로 바꾸려면 `border-box`를 사용합니다.

```css
/* content-box(기본): 실제 너비 = width + padding + border = 200+40+4 = 244px */
.default-box {
  box-sizing: content-box;
  width: 200px;
  padding: 20px;
  border: 2px solid #333;
}

/* border-box: width(200px) 안에 padding, border를 포함 → 실제 너비 200px 유지 */
.modern-box {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 2px solid #333;
}

/* 실무 권장: 모든 요소에 border-box 적용하면 크기 계산이 쉬워짐 */
* {
  box-sizing: border-box;
}
```

### display 속성 — 박스의 성격

| 값 | 특징 |
| --- | --- |
| `block` | 가로 전체를 차지, 줄바꿈 발생 (예: `div`, `p`) |
| `inline` | 콘텐츠 크기만큼만 차지, 가로 정렬 (예: `span`, `a`) |
| `inline-block` | inline처럼 배치되지만 width/height 지정 가능 |
| `none` | 화면에서 완전히 숨김 |

```css
/* span은 원래 inline이라 width가 무시되지만 */
/* inline-block으로 바꾸면 크기 지정이 가능해진다 */
.tag {
  display: inline-block;
  width: 80px;
  height: 30px;
}

.hidden {
  display: none; /* 요소를 화면에서 제거 (공간도 차지하지 않음) */
}
```

---

## 2.3 색상 · 배경 · 타이포그래피

### 색상 표현 방법

CSS에서 색을 지정하는 방법은 여러 가지가 있으며, 상황에 맞게 골라 씁니다.

| 표기법 | 예시 | 설명 |
| --- | --- | --- |
| 색상 이름 | `red`, `tomato` | 정해진 키워드, 간단하지만 제한적 |
| HEX | `#3498db` | 16진수 RGB, 가장 널리 쓰임 |
| RGB | `rgb(52, 152, 219)` | 빨강·초록·파랑 0~255 |
| RGBA | `rgba(52,152,219,0.5)` | RGB + 투명도(alpha 0~1) |
| HSL | `hsl(204, 70%, 53%)` | 색상·채도·명도, 직관적 조절 |

```css
.color-demo {
  color: #ffffff;                    /* HEX: 흰색 글자 */
  background-color: rgb(52, 152, 219); /* RGB: 파란 배경 */
  border-color: rgba(0, 0, 0, 0.2);  /* RGBA: 20% 투명한 검정 테두리 */
}
```

### 배경(background)

```css
.banner {
  /* 배경색 지정 */
  background-color: #f5f5f5;

  /* 배경 이미지 삽입 */
  background-image: url("bg.jpg");

  /* 반복하지 않음 (기본은 타일처럼 반복됨) */
  background-repeat: no-repeat;

  /* 요소를 꽉 채우도록 이미지 크기 조절 */
  background-size: cover;

  /* 배경 위치를 가운데로 */
  background-position: center;
}

/* 위 속성들을 한 줄로 줄여 쓰는 단축 속성 */
.banner-short {
  background: #f5f5f5 url("bg.jpg") no-repeat center / cover;
}
```

### 타이포그래피(글꼴 다루기)

글자의 모양, 크기, 굵기, 간격을 다루는 속성들입니다.

```css
.text {
  /* 글꼴 지정: 앞의 글꼴이 없으면 다음 글꼴, 마지막은 계열(fallback) */
  font-family: "Noto Sans KR", "Apple SD Gothic Neo", sans-serif;

  font-size: 16px;        /* 글자 크기 */
  font-weight: 700;       /* 굵기: 400=보통, 700=굵게(bold) */
  line-height: 1.6;       /* 줄 간격: 글자 크기의 1.6배 */

  letter-spacing: 0.5px;  /* 글자(자간) 간격 */
  text-align: center;     /* 정렬: left, center, right, justify */
  text-decoration: underline; /* 밑줄 (none으로 링크 밑줄 제거 가능) */

  color: #222;            /* 글자색 */
}
```

| 속성 | 역할 | 자주 쓰는 값 |
| --- | --- | --- |
| `font-size` | 글자 크기 | `16px`, `1rem` |
| `font-weight` | 굵기 | `400`, `700`, `bold` |
| `line-height` | 줄 간격 | `1.5`, `1.6` |
| `text-align` | 가로 정렬 | `left`, `center`, `right` |
| `text-decoration` | 장식선 | `none`, `underline` |

```css
/* 실전 예: 링크의 기본 밑줄을 없애고 hover 시 다시 표시 */
a {
  text-decoration: none; /* 평소엔 밑줄 제거 */
  color: #3498db;
}

a:hover {
  text-decoration: underline; /* 마우스 올리면 밑줄 표시 */
}
```

---

## 2.4 단위와 CSS 변수

### 절대 단위와 상대 단위

CSS의 크기 단위는 고정값인 **절대 단위**와 기준에 따라 변하는 **상대 단위**로 나뉩니다.

| 단위 | 종류 | 기준 | 특징 |
| --- | --- | --- | --- |
| `px` | 절대 | 화면 픽셀 | 고정 크기, 직관적 |
| `%` | 상대 | 부모 요소 크기 | 부모에 비례 |
| `em` | 상대 | 현재 요소의 `font-size` | 중첩되면 누적됨 |
| `rem` | 상대 | 루트(`html`)의 `font-size` | 일관적, 접근성에 유리 |

```css
/* 루트 글꼴 크기를 16px로 설정 (브라우저 기본값) */
html {
  font-size: 16px;
}

.parent {
  font-size: 20px; /* em의 기준이 되는 값 */
}

.child {
  /* em: 부모(현재 요소) font-size 기준 → 20px * 1.5 = 30px */
  font-size: 1.5em;

  /* rem: 항상 루트(16px) 기준 → 16px * 1.5 = 24px (예측 가능) */
  padding: 1.5rem;

  /* % : 부모 너비 기준 → 부모의 50% */
  width: 50%;
}
```

- **px**는 정밀한 고정 크기가 필요할 때(테두리 두께 등) 적합합니다.
- **rem**은 루트 기준이라 어디서 써도 값이 일정해 글자 크기·여백에 권장됩니다.
- **em**은 부모에 따라 변하므로 컴포넌트 내부의 상대 비율에 유용하지만, 중첩 시 누적되는 점을 주의합니다.
- **%**는 반응형 너비처럼 부모 대비 비율이 필요할 때 사용합니다.

### CSS 변수(사용자 정의 속성)

반복되는 값(색상, 간격 등)을 변수로 정의해 한 곳에서 관리하면 유지보수가 쉬워집니다.

```css
/* :root는 문서 최상위 요소 → 전역 변수 선언 장소로 사용 */
:root {
  --main-color: #3498db;   /* 변수는 두 개의 하이픈(--)으로 시작 */
  --gap: 16px;
  --radius: 8px;
}

.card {
  /* var() 함수로 변수 값을 불러와 사용 */
  background-color: var(--main-color);
  padding: var(--gap);
  border-radius: var(--radius);
}

.button {
  /* 같은 변수를 여러 곳에서 재사용 → 한 곳만 바꾸면 전체 반영 */
  border: 2px solid var(--main-color);

  /* 변수가 없을 때 대비 기본값(fallback)도 지정 가능 */
  color: var(--text-color, #333);
}
```

- 변수 이름은 대소문자를 구분하며 `--이름` 형식으로 짓습니다.
- `var(--이름, 기본값)`처럼 두 번째 인자로 폴백 값을 줄 수 있습니다.
- 변수는 상속되므로 특정 영역에서만 값을 덮어쓸 수도 있습니다.

```css
/* 다크 모드처럼 특정 영역에서만 변수 값을 재정의하는 예 */
.dark-section {
  --main-color: #1a1a2e; /* 이 영역 안에서는 main-color가 어두운 색 */
}
```

---

이 장에서는 CSS를 적용하는 방법과 선택자, 박스 모델, 색상·배경·타이포그래피, 단위와 변수까지 살펴봤습니다. 특히 `box-sizing: border-box`와 `rem` 단위, CSS 변수는 실무에서 매우 자주 쓰이므로 직접 코드를 작성해 보며 익히는 것이 중요합니다.
