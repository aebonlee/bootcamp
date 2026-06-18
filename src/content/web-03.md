# CSS 레이아웃 — Flexbox · Grid · 반응형

웹 페이지의 요소를 화면에 어떻게 배치할지 결정하는 것이 바로 "레이아웃"입니다. 이 장에서는 모든 배치의 기초가 되는 `display`와 `position` 속성부터, 1차원 정렬에 강한 Flexbox, 2차원 격자 배치에 강한 Grid, 그리고 다양한 화면 크기에 대응하는 반응형 디자인까지 차례대로 배웁니다. 실무에서 가장 많이 쓰이는 모던 CSS 기법을 예제와 함께 익혀, 어떤 화면에서도 깔끔하게 보이는 레이아웃을 직접 만들 수 있게 됩니다.

---

## 3.1 display와 position

모든 HTML 요소는 기본적으로 정해진 "박스(box)" 형태로 화면에 그려집니다. 이 박스가 어떻게 흐르고 배치되는지를 결정하는 가장 기본적인 속성이 `display`와 `position`입니다.

### display 속성

`display`는 요소가 어떤 종류의 박스로 렌더링될지를 정합니다. 대표적인 값은 다음과 같습니다.

| 값 | 설명 | 줄바꿈 | 너비/높이 지정 |
|------|------|--------|----------------|
| `block` | 한 줄을 모두 차지하는 블록 박스 (div, p, h1 등 기본값) | O | 가능 |
| `inline` | 글자처럼 옆으로 흐르는 인라인 박스 (span, a 등 기본값) | X | 불가(가로) |
| `inline-block` | 인라인처럼 옆으로 흐르되 너비/높이 지정 가능 | X | 가능 |
| `none` | 요소를 화면에서 완전히 제거 (공간 차지 X) | - | - |
| `flex` | 자식을 1차원으로 정렬하는 플렉스 컨테이너 | O | 가능 |
| `grid` | 자식을 2차원 격자로 배치하는 그리드 컨테이너 | O | 가능 |

```css
/* block: 항상 새 줄에서 시작하고 가로 폭을 꽉 채움 */
.box-block {
  display: block;          /* 블록 레벨 박스로 표시 */
  width: 200px;            /* block은 너비 지정 가능 */
  height: 80px;            /* 높이도 지정 가능 */
  background: #cfe8ff;
}

/* inline: 글자처럼 옆으로 나열, 너비·높이 무시됨 */
.tag-inline {
  display: inline;         /* 인라인 박스 (예: span) */
  /* width, height를 줘도 적용되지 않음 */
  background: #ffe0b2;
}

/* inline-block: 옆으로 나열되면서도 크기 지정 가능 (버튼 등에 유용) */
.btn-inline-block {
  display: inline-block;   /* 두 성격을 모두 가짐 */
  width: 120px;            /* 너비 적용됨 */
  padding: 8px 0;
  text-align: center;
  background: #c8e6c9;
}

/* none: 렌더링 자체를 하지 않아 공간도 차지하지 않음 */
.hidden {
  display: none;           /* visibility:hidden 과 달리 공간도 사라짐 */
}
```

### position 속성

`position`은 요소를 문서 흐름(normal flow) 안에서 어떻게 배치할지, 그리고 `top·right·bottom·left` 오프셋을 어떤 기준으로 적용할지를 정합니다.

| 값 | 기준 | 흐름에서 빠짐 | 주요 용도 |
|------|------|----------------|-----------|
| `static` | 없음(기본값) | X | 일반 흐름 그대로 |
| `relative` | 자기 원래 위치 | X | 살짝 이동 / 자식 absolute의 기준 |
| `absolute` | 가장 가까운 `position!=static` 조상 | O | 겹치는 배치, 배지·툴팁 |
| `fixed` | 뷰포트(브라우저 창) | O | 고정 헤더, 떠 있는 버튼 |
| `sticky` | 스크롤 위치(임계점) | 조건부 | 스크롤 시 붙는 헤더 |

```css
/* relative: 원래 자리를 유지한 채 그 위치를 기준으로 이동 */
.relative-box {
  position: relative;      /* 자기 원래 위치가 기준 */
  top: 10px;               /* 원래 자리에서 아래로 10px */
  left: 20px;              /* 원래 자리에서 오른쪽으로 20px */
  /* 중요: 원래 차지하던 공간은 그대로 남아 있음 */
}

/* absolute 배치를 위해 부모에 relative를 주는 패턴 (기준점 만들기) */
.card {
  position: relative;      /* 자식 absolute의 기준 컨테이너가 됨 */
}

/* absolute: 가장 가까운 positioned 조상(.card)을 기준으로 배치 */
.card .badge {
  position: absolute;      /* 일반 흐름에서 빠짐 */
  top: 8px;                /* .card의 위에서 8px */
  right: 8px;              /* .card의 오른쪽에서 8px */
  background: crimson;
  color: #fff;
  border-radius: 999px;
  padding: 2px 8px;
}

/* fixed: 스크롤해도 항상 화면(뷰포트) 같은 위치에 고정 */
.fab {
  position: fixed;         /* 뷰포트 기준, 스크롤 무관 */
  right: 24px;             /* 화면 오른쪽에서 24px */
  bottom: 24px;            /* 화면 아래에서 24px */
  z-index: 100;            /* 다른 요소 위에 쌓이도록 */
}

/* sticky: 평소엔 일반 흐름, 스크롤이 임계점에 닿으면 그 자리에 붙음 */
.section-header {
  position: sticky;        /* relative + fixed 의 하이브리드 */
  top: 0;                  /* 화면 맨 위에 닿으면 고정 */
  background: #fff;
}
```

- `z-index`는 `position`이 `static`이 아닐 때만 쌓임 순서에 영향을 줍니다(값이 클수록 위).
- `absolute`/`fixed`는 흐름에서 빠지므로 너비가 콘텐츠에 맞게 줄어들 수 있습니다.

---

## 3.2 Flexbox 레이아웃

Flexbox(플렉스박스)는 한 방향(가로 또는 세로)으로 요소를 정렬·분배하는 데 특화된 **1차원 레이아웃** 모델입니다. 메뉴 바, 카드의 가로 정렬, 가운데 정렬 등 일상적인 배치 대부분을 간단히 해결합니다.

부모 요소에 `display: flex`를 주면 그 부모는 **flex 컨테이너**, 직계 자식들은 **flex 아이템**이 됩니다.

### 주축(main axis)과 교차축(cross axis)

- `flex-direction`이 `row`면 주축은 가로(→), 교차축은 세로(↓)
- `flex-direction`이 `column`이면 주축은 세로(↓), 교차축은 가로(→)
- `justify-content`는 **주축**, `align-items`는 **교차축** 정렬을 담당합니다.

### 컨테이너에 주는 속성

| 속성 | 주요 값 | 설명 |
|------|---------|------|
| `flex-direction` | `row` / `column` / `row-reverse` | 주축 방향 |
| `justify-content` | `flex-start` / `center` / `space-between` / `space-around` | 주축 정렬·분배 |
| `align-items` | `stretch` / `center` / `flex-start` / `flex-end` | 교차축 정렬 |
| `flex-wrap` | `nowrap` / `wrap` | 넘칠 때 줄바꿈 여부 |
| `gap` | 길이값 (예: `16px`) | 아이템 사이 간격 |

### 아이템에 주는 속성

| 속성 | 의미 | 예 |
|------|------|----|
| `flex-grow` | 남는 공간을 차지하는 비율 | `1` (균등 확장) |
| `flex-shrink` | 공간 부족 시 줄어드는 비율 | `0` (안 줄어듦) |
| `flex-basis` | 기본 크기 | `200px`, `auto` |
| `flex` | 위 3개 단축 속성 | `1 1 0`, `1` |
| `align-self` | 개별 아이템 교차축 정렬 | `center` |

```css
/* flex 컨테이너 기본 설정 */
.navbar {
  display: flex;                   /* 자식들을 flex 아이템으로 만듦 */
  flex-direction: row;             /* 주축 = 가로 (기본값) */
  justify-content: space-between;  /* 주축: 양 끝 배치 + 사이 균등 간격 */
  align-items: center;            /* 교차축(세로): 가운데 정렬 */
  gap: 16px;                       /* 아이템 사이 간격 16px */
  padding: 12px 24px;
}

/* 가장 많이 쓰는 '완벽한 가운데 정렬' 패턴 */
.center-box {
  display: flex;
  justify-content: center;         /* 가로 가운데 */
  align-items: center;            /* 세로 가운데 */
  height: 200px;                   /* 높이가 있어야 세로 정렬이 보임 */
}

/* flex 단축 속성: grow shrink basis 순서 */
.menu-item {
  flex: 1 1 0;                     /* 남는 공간을 모든 아이템이 균등 분배 */
  /* flex: 1 과 거의 동일 (basis만 0 vs auto 차이) */
}

/* 특정 아이템만 더 크게 (검색창 등) */
.search {
  flex-grow: 2;                    /* 다른 아이템보다 2배 더 확장 */
}

/* 줄바꿈 + 간격: 카드들이 넘치면 다음 줄로 */
.card-list {
  display: flex;
  flex-wrap: wrap;                 /* 한 줄에 다 못 들어가면 줄바꿈 */
  gap: 20px;                       /* 행·열 간격 20px */
}

.card-list > .card {
  flex: 1 1 250px;                 /* 최소 250px, 남으면 확장하며 채움 */
}
```

```html
<!-- 위 .navbar 스타일을 적용한 상단 메뉴 예시 -->
<nav class="navbar">
  <!-- 왼쪽 로고 -->
  <div class="logo">MySite</div>

  <!-- 오른쪽 메뉴: 각 항목이 flex 아이템 -->
  <ul class="menu">
    <li class="menu-item">홈</li>
    <li class="menu-item">소개</li>
    <li class="menu-item">문의</li>
  </ul>
</nav>
```

> 팁: `justify-content`와 `align-items`가 헷갈릴 때는 "justify = 주축(direction을 따라가는 축)"으로 기억하면 좋습니다.

---

## 3.3 Grid 레이아웃

CSS Grid는 행(row)과 열(column)을 동시에 다루는 **2차원 레이아웃** 모델입니다. 전체 페이지 골격(헤더·사이드바·본문·푸터)이나 이미지 갤러리처럼 가로·세로를 함께 제어해야 하는 배치에 가장 적합합니다.

부모에 `display: grid`를 주고, 열과 행의 크기를 정의한 뒤 자식을 칸에 배치합니다.

### 컨테이너에 주는 속성

| 속성 | 설명 | 예 |
|------|------|----|
| `grid-template-columns` | 열의 개수·크기 정의 | `1fr 1fr 1fr`, `repeat(3, 1fr)` |
| `grid-template-rows` | 행의 개수·크기 정의 | `auto 1fr auto` |
| `gap` (`row-gap`/`column-gap`) | 칸 사이 간격 | `20px`, `16px 24px` |
| `grid-template-areas` | 영역에 이름을 붙여 배치 | `"header header"` |
| `justify-items` / `align-items` | 칸 안에서 아이템 정렬 | `center`, `stretch` |

### 단위 fr과 함수

- `fr`은 남는 공간을 비율로 나누는 단위입니다. `1fr 2fr`이면 1:2로 나눕니다.
- `repeat(3, 1fr)`은 `1fr 1fr 1fr`의 축약형입니다.
- `minmax(200px, 1fr)`은 "최소 200px, 최대 1fr"을 의미합니다.
- `repeat(auto-fit, minmax(200px, 1fr))`은 칸 크기에 맞춰 열 개수를 자동 조절하는 반응형 그리드의 핵심 패턴입니다.

```css
/* 3열 균등 그리드 갤러리 */
.gallery {
  display: grid;                          /* 그리드 컨테이너 */
  grid-template-columns: repeat(3, 1fr);  /* 같은 너비 3열 */
  gap: 16px;                              /* 모든 칸 사이 간격 16px */
}

/* fr 비율: 사이드바는 좁게, 본문은 넓게 (1:3) */
.layout {
  display: grid;
  grid-template-columns: 1fr 3fr;         /* 왼쪽:오른쪽 = 1:3 */
  gap: 24px;
}

/* 반응형 자동 그리드: 칸이 좁아지면 열 수가 알아서 줄어듦 */
.auto-grid {
  display: grid;
  /* 각 칸 최소 220px, 가능하면 1fr까지 늘림. 공간 되는 만큼 열 채움 */
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}
```

### grid-template-areas로 페이지 골격 만들기

이름 기반 배치는 코드만 봐도 레이아웃 구조가 한눈에 보여 유지보수가 쉽습니다.

```css
/* 헤더 / 사이드바+본문 / 푸터 구조를 이름으로 정의 */
.page {
  display: grid;
  grid-template-columns: 200px 1fr;        /* 사이드바 200px + 본문 나머지 */
  grid-template-rows: auto 1fr auto;       /* 헤더·본문·푸터 높이 */
  grid-template-areas:
    "header  header"                       /* 1행: 헤더가 두 열 모두 차지 */
    "sidebar main"                         /* 2행: 사이드바 + 본문 */
    "footer  footer";                      /* 3행: 푸터가 두 열 모두 차지 */
  min-height: 100vh;                       /* 화면 전체 높이 채우기 */
  gap: 12px;
}

.page > header  { grid-area: header; }     /* 위에서 정의한 이름과 연결 */
.page > nav     { grid-area: sidebar; }
.page > main    { grid-area: main; }
.page > footer  { grid-area: footer; }
```

```html
<!-- 위 .page 그리드를 적용한 페이지 골격 -->
<div class="page">
  <header>로고 / 상단 메뉴</header>   <!-- grid-area: header -->
  <nav>사이드바 메뉴</nav>            <!-- grid-area: sidebar -->
  <main>본문 콘텐츠</main>           <!-- grid-area: main -->
  <footer>저작권 정보</footer>        <!-- grid-area: footer -->
</div>
```

### 특정 칸 차지하기

```css
/* 한 아이템이 여러 칸에 걸치게 하기 */
.feature {
  grid-column: 1 / 3;   /* 1번 선 ~ 3번 선: 두 열에 걸침 */
  grid-row: 1 / 2;      /* 1번 행 ~ 2번 행 */
  /* span 표기도 가능: grid-column: span 2; (현재 위치에서 2칸) */
}
```

> Flexbox와 Grid는 경쟁 관계가 아닙니다. 큰 골격은 Grid로 잡고, 그 안의 작은 정렬은 Flexbox로 처리하는 식으로 함께 씁니다.

---

## 3.4 반응형 디자인과 미디어 쿼리

반응형 디자인(Responsive Web Design)은 하나의 코드로 모바일·태블릿·데스크톱 등 다양한 화면 크기에 자연스럽게 적응하는 설계 방식입니다. 핵심 도구는 **미디어 쿼리(`@media`)**, **유연한 단위(%, fr, rem, vw)**, 그리고 **viewport 메타 태그**입니다.

### viewport 메타 태그 (필수)

미디어 쿼리가 모바일에서 제대로 동작하려면 HTML `<head>`에 다음 태그가 반드시 있어야 합니다.

```html
<!-- 모바일에서 화면 너비를 기기 실제 너비에 맞추고, 기본 배율 1로 설정 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### 미디어 쿼리 기본 문법

`@media`는 특정 조건(주로 화면 너비)을 만족할 때만 CSS를 적용합니다.

```css
/* 기본(모바일) 스타일을 먼저 작성 */
.container {
  width: 100%;          /* 작은 화면에선 가로 꽉 채움 */
  padding: 16px;
}

/* 화면 너비가 768px 이상일 때만 아래 규칙 적용 (태블릿~) */
@media (min-width: 768px) {
  .container {
    max-width: 720px;   /* 일정 너비 이상으로 안 넓어지게 */
    margin: 0 auto;     /* 가운데 정렬 */
  }
}

/* 화면 너비가 1024px 이상일 때 (데스크톱) */
@media (min-width: 1024px) {
  .container {
    max-width: 960px;
  }
}
```

### Mobile-First 전략

작은 화면(모바일) 기본 스타일을 먼저 작성하고, `min-width`로 큰 화면용 규칙을 점진적으로 더하는 방식을 **모바일 퍼스트**라 합니다. 코드가 단순해지고 성능에도 유리해 실무 표준으로 권장됩니다. (반대는 `max-width`를 쓰는 데스크톱 퍼스트)

### 주요 breakpoint(중단점) 가이드

| 기기 구분 | 권장 조건 | 대략 너비 |
|-----------|-----------|-----------|
| 모바일 | (기본, 조건 없음) | ~ 767px |
| 태블릿 | `min-width: 768px` | 768px ~ |
| 작은 데스크톱 | `min-width: 1024px` | 1024px ~ |
| 큰 데스크톱 | `min-width: 1280px` | 1280px ~ |

> 위 값은 절대 규칙이 아니라 관행입니다. 실제로는 콘텐츠가 깨지는 지점에서 breakpoint를 잡는 것이 가장 좋습니다.

### Grid + 미디어 쿼리로 만드는 반응형 레이아웃

```css
/* 모바일: 한 줄에 카드 1개 (세로로 쌓임) */
.cards {
  display: grid;
  grid-template-columns: 1fr;      /* 1열 */
  gap: 16px;
}

/* 태블릿: 2열 */
@media (min-width: 768px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);   /* 2열 */
  }
}

/* 데스크톱: 3열 */
@media (min-width: 1024px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);   /* 3열 */
  }
}
```

### 미디어 쿼리 없이 반응형 만들기

`auto-fit` + `minmax` 패턴이나 `clamp()`를 쓰면 미디어 쿼리 없이도 유연한 반응형이 가능합니다.

```css
/* 미디어 쿼리 없이 자동으로 열 수가 조절되는 그리드 */
.responsive-grid {
  display: grid;
  /* 칸 최소 240px 보장, 공간 남으면 늘려 채움 → 화면 따라 열 수 자동 변화 */
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

/* clamp(최소, 선호, 최대): 글자 크기를 화면에 따라 부드럽게 조절 */
.title {
  /* 최소 1.5rem, 화면비례 5vw, 최대 3rem 사이에서 자동 결정 */
  font-size: clamp(1.5rem, 5vw, 3rem);
}
```

```html
<!-- 위 .cards / .responsive-grid 를 적용하는 카드 묶음 -->
<section class="cards">
  <article class="card">카드 1</article>
  <article class="card">카드 2</article>
  <article class="card">카드 3</article>
  <article class="card">카드 4</article>
</section>
```

### 정리

- 레이아웃의 큰 틀은 **Grid**, 한 방향 정렬은 **Flexbox**.
- **모바일 퍼스트** + `min-width` 미디어 쿼리로 단계적으로 확장.
- `%`, `fr`, `rem`, `vw`, `clamp()`, `minmax()` 같은 **유연한 단위**를 적극 활용.
- `<meta name="viewport">`를 빠뜨리지 않기.
