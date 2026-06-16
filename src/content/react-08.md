# 8장. 프로젝트 실무 적용

이번 장은 금융 서비스와 같은 실무형 화면 구현부터 팀 단위 미니 프로젝트 완성까지, React 기반 화면 설계, API 연동, 조건부 렌더링, 예외 처리, 데이터 바인딩, 발표 및 피드백 기반 개선까지 전체 프로젝트 수행 과정을 경험하며 실무 수준의 프론트엔드 개발 능력과 협업 역량을 동시에 향상시키는 장이다.

## 8.1 금융 서비스 목록·상세 화면 구현

금융 서비스 화면 구현 절에서는 목록과 상세 화면 UI를 설계하고 외부 API와 연동하여 실시간 데이터를 바인딩하며, 조건부 렌더링과 예외 처리를 적용해 다양한 사용자 시나리오를 처리하고, 실제 유사 금융 화면 결과물을 제작하여 실무형 화면 설계 및 구현 능력을 익히는 과정을 다룬다.

### (1) 목록/상세 UI 구조 설계

목록과 상세 화면의 UI 구조를 컴포넌트 단위로 설계하고, 카드·테이블·리스트 구조를 적절히 활용하여 정보 표시와 화면 전환의 흐름을 직관적으로 구성하며, 재사용 가능한 컴포넌트와 상태 관리를 고려한 설계 전략을 학습한다.

#### ① 목록 컴포넌트 설계

목록 화면은 각 금융 서비스 항목을 카드나 리스트 아이템으로 표시하며, 반복되는 UI 구조를 컴포넌트화하여 재사용성을 높이고, props로 데이터 전달과 이벤트 핸들링을 효율적으로 처리한다.

```jsx
// src/components/ServiceList.js
import React from 'react';
// 개별 항목을 그리는 하위 컴포넌트를 불러옴 (목록은 이 컴포넌트를 반복 렌더링)
import ServiceItem from './ServiceItem';

// services: 표시할 서비스 배열, onSelect: 항목 선택 시 부모로 알릴 콜백
function ServiceList({ services, onSelect }) {
  // 데이터가 없거나(null/undefined) 빈 배열이면 안내 문구로 조기 반환 (예외 처리)
  if (!services || services.length === 0) return <p>서비스가 없습니다.</p>;
  return (
    <div className="service-list">
      {/* 배열을 map으로 순회하며 각 서비스를 ServiceItem으로 변환 */}
      {services.map(service => (
        // key: React가 목록 항목을 구분하는 고유값(여기선 service.id)
        // service/onSelect를 props로 내려보내 데이터와 이벤트를 위임
        <ServiceItem key={service.id} service={service} onSelect={onSelect} />
      ))}
    </div>
  );
}

// 다른 파일에서 import 할 수 있도록 기본 내보내기
export default ServiceList;
```

#### ② 상세 화면 컴포넌트 설계

선택한 항목의 상세 정보를 보여주는 컴포넌트로, 상위에서 선택된 서비스 데이터를 props로 받아 표시하고, 버튼이나 이벤트를 통해 상태 변경과 화면 전환을 관리한다.

```jsx
// src/components/ServiceDetail.js
import React from 'react';

// service: 선택된 서비스 객체, onBack: 목록으로 돌아갈 때 호출할 콜백
function ServiceDetail({ service, onBack }) {
  // 선택된 서비스가 없으면 안내 문구를 보여주고 종료 (방어 코드)
  if (!service) return <p>선택된 서비스가 없습니다.</p>;
  return (
    <div className="service-detail">
      {/* service 객체의 각 속성을 중괄호로 바인딩하여 화면에 출력 */}
      <h2>{service.name}</h2>
      <p>계좌 번호 : {service.account}</p>
      <p>잔액 : {service.balance} 원</p>
      {/* 버튼 클릭 시 부모가 넘겨준 onBack을 실행해 목록 화면으로 복귀 */}
      <button onClick={onBack}>목록으로 돌아가기</button>
    </div>
  );
}

export default ServiceDetail;
```

### (2) API 연동 데이터 바인딩

외부 금융 API 또는 모의 데이터를 이용해 목록과 상세 화면에 실시간 데이터를 바인딩하고, fetch/axios를 활용한 비동기 호출과 상태 업데이트, 로딩·에러 처리 방식을 적용하여 화면과 데이터의 동기화를 실무 수준으로 구현한다.

#### ① 데이터 fetch 및 상태 관리

```jsx
// src/App.js
// useState: 상태 저장, useEffect: 마운트/변경 시점에 부수효과 실행
import React, { useState, useEffect } from 'react';
import ServiceList from './components/ServiceList';
import ServiceDetail from './components/ServiceDetail';
// axios: HTTP 요청 라이브러리 (JSON 자동 변환 등 편의 기능 제공)
import axios from 'axios';

function App() {
  // 서버에서 받아온 서비스 목록을 담는 상태 (초기값은 빈 배열)
  const [services, setServices] = useState([]);
  // 현재 선택된 서비스 (null이면 목록 화면, 값이 있으면 상세 화면)
  const [selectedService, setSelectedService] = useState(null);
  // 네트워크 요청 진행 여부 (로딩 스피너 표시에 사용)
  const [loading, setLoading] = useState(false);
  // 에러 메시지 (요청 실패 시 화면에 표시)
  const [error, setError] = useState(null);

  // 컴포넌트가 처음 마운트될 때 한 번만 데이터를 가져옴 (의존성 배열 []이 비어 있음)
  useEffect(() => {
    setLoading(true); // 요청 시작 → 로딩 상태 켜기
    axios.get('https://api.example.com/services')
      .then(res => setServices(res.data))   // 성공: 응답 데이터를 상태에 저장
      .catch(err => setError('데이터 로딩 실패')) // 실패: 에러 메시지 설정
      .finally(() => setLoading(false));    // 성공/실패와 무관하게 로딩 끄기
  }, []);

  return (
    <div>
      {/* loading이 true일 때만 로딩 문구 렌더링 (단축 평가 조건부 렌더링) */}
      {loading && <p>로딩 중...</p>}
      {/* error에 값이 있을 때만 에러 메시지 렌더링 */}
      {error && <p>{error}</p>}
      {/* 선택된 서비스 유무에 따라 목록 또는 상세 화면을 전환 (삼항 연산자) */}
      {!selectedService
        // setSelectedService를 onSelect로 넘겨 항목 클릭 시 상세로 전환
        ? <ServiceList services={services} onSelect={setSelectedService} />
        // onBack에서 선택값을 null로 되돌려 목록으로 복귀
        : <ServiceDetail service={selectedService} onBack={() => setSelectedService(null)} />}
    </div>
  );
}

export default App;
```

#### ② axios와 fetch 비교

- **fetch**: 브라우저 내장, 가볍고 Promise 기반, 별도 설치 필요 없음
- **axios**: JSON 자동 변환, 요청/응답 인터셉터, 타임아웃 설정 가능, 실무에서 선호

```js
// fetch 예시
// 브라우저 내장 fetch로 GET 요청 (Promise 반환)
fetch('https://api.example.com/services')
  .then(res => res.json())            // 응답 본문을 JSON으로 직접 파싱 (axios와 달리 수동)
  .then(data => console.log(data))    // 파싱된 데이터 사용
  .catch(err => console.error(err));  // 네트워크/파싱 오류 처리
```

### (3) 조건부 화면 렌더링 및 예외 처리

사용자 입력, 데이터 유무, 네트워크 상태 등 다양한 조건에 따라 화면을 다르게 렌더링하고, 오류 메시지, 빈 데이터 처리, 로딩 스피너 등 예외 처리 UI를 구현하여 안정적이고 사용자 친화적인 화면 흐름을 구성하는 기법을 학습한다.

#### ① 조건부 렌더링 적용

```jsx
{/* && 단축 평가: 앞 조건이 true일 때만 뒤 JSX를 렌더링 */}
{loading && <p>로딩 중...</p>}
{error && <p>{error}</p>}
{/* 삼항 연산자: 선택 여부에 따라 목록/상세 중 하나만 렌더링 */}
{!selectedService ? <ServiceList ... /> : <ServiceDetail ... />}
```

#### ② 빈 데이터 처리

```jsx
// 데이터가 없거나 길이가 0이면 안내 문구를 반환해 빈 화면을 방지
if (!services || services.length === 0) return <p>등록된 서비스가 없습니다.</p>;
```

#### ③ 네트워크 오류 처리

```jsx
// 요청 실패 시 사용자에게 보여줄 친화적 에러 메시지를 상태에 저장
.catch(err => setError('API 호출 실패, 다시 시도해주세요'))
```

### (4) 실무 유사 화면 결과물 제작

설계된 UI와 연동 데이터를 기반으로 실무 금융 서비스와 유사한 화면을 완성하고, 목록 조회·상세 보기·상태 변경 등 핵심 기능을 통합하여 완성도 높은 프로토타입을 제작하며, 팀/개인 프로젝트 결과물로 실무 경험을 쌓는다.

#### ① 화면 전환

```jsx
{/* onSelect로 setSelectedService를 넘겨 항목 선택 시 상세로 이동 */}
<ServiceList services={services} onSelect={setSelectedService} />
{/* onBack에서 선택값을 null로 초기화하여 목록 화면으로 복귀 */}
<ServiceDetail service={selectedService} onBack={() => setSelectedService(null)} />
```

#### ② 스타일 적용

```css
/* 목록을 가로로 배치하고 줄바꿈/간격을 지정 (반응형 카드 레이아웃) */
.service-list { display: flex; flex-wrap: wrap; gap: 16px; }
/* 카드 항목: 테두리·여백·둥근 모서리, 클릭 가능함을 커서로 표시 */
.service-item { border: 1px solid #ddd; padding: 12px; border-radius: 8px; cursor: pointer; }
/* 상세 박스: 여백과 테두리로 정보 영역을 구분 */
.service-detail { padding: 20px; border: 1px solid #ccc; border-radius: 8px; }
```

#### ③ 사용자 시나리오 통합

- 목록에서 서비스 선택 → 상세 화면 표시
- 상세 화면에서 뒤로가기 → 목록 화면 복귀
- API 로딩, 실패, 빈 데이터 처리 포함

## 8.2 미니 프로젝트 완성 및 발표

미니 프로젝트 완성 및 발표 절에서는 기능 기획서 작성과 구현 전략 수립부터 화면 설계, 기능 구현, 발표 자료 제작 및 시연, 그리고 피드백 기반 코드 개선과 문서화를 거쳐 실무 프로젝트 경험을 종합적으로 체험하고 발표 능력과 협업 능력을 동시에 강화하는 과정을 다룬다.

### (1) 기능 기획서 작성 및 구현 전략 수립

프로젝트의 목표와 기능 요구사항을 정리한 기획서를 작성하고, 화면 흐름, API 연동, 상태 관리, 컴포넌트 구조 등 구현 전략을 수립하여 개발 전 단계에서 전체 아키텍처와 개발 계획을 체계적으로 설계한다.

#### ① 요구사항 정의

각 기능의 입력/출력, 화면 구성, 예외 상황을 정의하여 개발 범위와 우선순위를 명확히 한다.

```
요구사항
- 서비스 목록 조회
- 상세 정보 보기
- 신규 항목 추가/삭제
- 데이터 동기화 및 상태 표시
```

#### ② 화면 흐름 설계

사용자가 이동할 화면과 페이지 전환 흐름을 다이어그램 또는 간단한 UI 스케치를 통해 시각화한다.

```
화면 흐름:
목록 화면 → 상세 화면 → 편집 화면 → 목록 화면
```

#### ③ 구현 전략 수립

API 구조, 상태 관리 위치, 컴포넌트 재사용 계획, 로딩/에러 처리 전략 등을 포함하여 개발 전반의 로드맵을 정의한다.

### (2) 팀/개인별 화면 설계 및 기능 구현

팀 또는 개인별로 화면 구성과 UI 컴포넌트를 설계하고, 기획서에 기반하여 목록, 상세, 입력, 편집 등 기능을 React 컴포넌트 단위로 구현하며, API 연동, 상태 관리, 이벤트 처리 등 실제 동작하는 화면을 완성한다.

#### ① 컴포넌트 설계

목록, 상세, 입력, 편집 등 화면 단위 컴포넌트를 설계하고, props와 state를 활용하여 데이터 흐름을 정의한다.

```jsx
// src/components/ItemCard.js
// item: 표시할 데이터 객체, onClick: 카드 클릭 시 부모로 전달할 콜백
function ItemCard({ item, onClick }) {
  // 카드 클릭 시 해당 item을 인자로 onClick을 호출 (어떤 항목을 눌렀는지 부모에 전달)
  return <div className="item-card" onClick={() => onClick(item)}>{item.name}</div>;
}
```

#### ② 상태 관리 및 API 연동

useState, useEffect 또는 Context를 활용해 상태를 관리하고, fetch/axios로 데이터를 동기화하며 로딩과 에러를 처리한다.

```jsx
// 마운트 시 한 번 실행되어 목록 데이터를 가져옴 (의존성 배열 []이 비어 있음)
useEffect(() => {
  axios.get('/api/items')
    .then(res => setItems(res.data))            // 성공: 받은 데이터를 상태에 저장
    .catch(err => setError('데이터 로딩 실패')); // 실패: 에러 메시지 설정
}, []);
```

#### ③ 이벤트 처리 및 기능 구현

추가, 삭제, 수정 버튼 클릭 시 상태를 업데이트하고 UI를 갱신하며, 조건부 렌더링을 통해 사용자 경험을 향상시킨다.

```jsx
// 전달받은 id와 다른 항목만 남겨 새 배열을 만들어 상태 갱신 (해당 항목 삭제)
const handleDelete = id => setItems(items.filter(i => i.id !== id));
```

### (3) 발표자료 작성 및 시연 발표

구현된 프로젝트 화면과 기능을 바탕으로 발표 자료를 작성하고, 시연 발표를 통해 화면 흐름, 핵심 기능, 구현 전략 등을 설명하며, 청중의 이해와 피드백을 통해 프로젝트 완성도를 검증하고 발표 경험을 쌓는다.

#### ① 발표 자료 구성

화면 캡처, 기능 설명, 개발 전략, 문제 해결 사례 등을 포함한 PPT 또는 PDF를 제작한다.

#### ② 시연 발표

프로젝트를 직접 실행하며 기능 시연, 화면 이동, 상태 변경 등 핵심 기능을 보여주고, 실무 발표와 동일하게 질문에 대응한다.

### (4) 피드백 기반 코드 수정 및 문서화

발표 및 팀 피드백을 바탕으로 UI·기능·코드 품질을 개선하고, README, 설계 문서, API 사용 설명 등 프로젝트 문서를 정리하여 유지보수성과 재사용성을 높이며, 최종 산출물을 완성하는 실무형 프로젝트 마무리 과정을 학습한다.

#### ① 코드 개선

중복 제거, 변수/함수 네이밍 정리, 상태 위치 이동 등을 통해 코드 품질을 높이고 오류를 수정한다.

```jsx
// 개선 전
// 현재 items 값을 직접 참조해 새 배열 생성 (최신 상태가 아닐 위험이 있음)
const addItem = item => setItems([...items, item]);

// 개선 후 (불변성 유지)
// prev(직전 상태)를 인자로 받는 함수형 업데이트 → 항상 최신 상태 기준으로 안전하게 추가
setItems(prev => [...prev, item]);
```

#### ② 문서화

README, API 문서, 화면 설계 문서를 작성하여 팀원 또는 사용자에게 프로젝트 정보를 명확히 전달하고 유지보수성을 확보한다.

## 8.3 금융 서비스 프로젝트 애플리케이션

이번 절에서는 금융 서비스 프로젝트 애플리케이션 예제를 실제 실행 가능한 수준으로 실습하겠습니다. 여기서는 React + Axios 기반으로 가상 은행 서비스 GTBank API를 연동하는 구조를 설계하고, 전체 소스 코드, 디렉터리 구조, 설치/실행 명령까지 실습합니다.

### (1) 프로젝트 구조와 생성

#### ① 디렉터리 구조

```
ch08/
├── node_modules/
├── public/
│   ├── index.html
├── src/
│   ├── api/
│   │   └── bankApi.js
│   ├── components/
│   │   ├── Header.js
│   │   ├── AccountList.js
│   │   ├── AccountDetail.js
│   │   └── Loader.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Detail.js
│   ├── App.js
│   ├── index.js
│   └── App.css
├── package.json
└── README.md
```

#### ② 설치 및 실행 명령

```bash
# 1. 프로젝트 생성
# create-react-app으로 ch08 이름의 React 기본 프로젝트 생성
npx create-react-app ch08
# 생성된 프로젝트 폴더로 이동
cd ch08

# 2. Axios 설치
# axios(HTTP 통신)와 react-router-dom(페이지 라우팅) 패키지 설치
npm install axios react-router-dom

# 3. 개발 서버 실행
# 로컬 개발 서버 구동 (기본 http://localhost:3000)
npm start
```

#### ③ Axios API 설정 (src/api/bankApi.js)

```js
import axios from "axios";

// 모든 요청의 공통 기본 주소 (가상의 GTBank API 서버)
const API_BASE = "https://api.mock.gtbank.com"; // 가상의 GTBank API

// 계좌 목록을 비동기로 가져오는 함수 (async → Promise 반환)
export const fetchAccounts = async () => {
  try {
    // await로 응답을 기다린 뒤 받음 (/accounts 엔드포인트 GET 요청)
    const res = await axios.get(`${API_BASE}/accounts`);
    return res.data; // 응답 본문(JSON 파싱된 데이터)만 반환
  } catch (err) {
    throw err; // 오류를 호출한 쪽으로 다시 던져 상위에서 처리하도록 함
  }
};

// 특정 계좌(id) 상세 정보를 가져오는 함수
export const fetchAccountDetail = async (id) => {
  try {
    // 템플릿 리터럴로 id를 경로에 삽입해 해당 계좌만 조회
    const res = await axios.get(`${API_BASE}/accounts/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
```

- `fetchAccounts` : 계좌 목록을 가져오는 API
- `fetchAccountDetail` : 특정 계좌 상세 정보 API

### (2) 공통 컴포넌트

#### ① Loader.js

```jsx
// 데이터를 불러오는 동안 보여줄 단순 로딩 표시 컴포넌트
function Loader() {
  return <div className="loader">로딩 중...</div>;
}

export default Loader;
```

API 요청 시 로딩 표시용 컴포넌트

#### ② Header.js

```jsx
// Link: 새로고침 없이 페이지를 이동시키는 라우터 링크 컴포넌트
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>GTBank 금융 서비스</h1>
      <nav>
        {/* to="/" : 홈 경로로 이동 (a 태그와 달리 SPA 내부 이동) */}
        <Link to="/">홈</Link>
      </nav>
    </header>
  );
}

export default Header;
```

페이지 상단 헤더, 홈으로 이동 링크 포함

#### ③ AccountList.js

```jsx
import { Link } from "react-router-dom";

// accounts: 표시할 계좌 배열을 props로 받음
function AccountList({ accounts }) {
  // 계좌가 없으면 안내 문구로 조기 반환 (빈 데이터 예외 처리)
  if (!accounts || accounts.length === 0) return <p>계좌가 없습니다.</p>;
  return (
    <ul className="account-list">
      {/* 계좌 배열을 순회하며 각 항목을 li로 렌더링 */}
      {accounts.map((acc) => (
        // key: 목록 항목 구분용 고유값 (계좌 id 사용)
        <li key={acc.id}>
          {/* 클릭 시 해당 계좌 상세 페이지(/detail/계좌id)로 이동 */}
          <Link to={`/detail/${acc.id}`}>
            {acc.name} - 잔액 : {acc.balance} 원
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default AccountList;
```

계좌 목록 표시 및 상세 화면 이동 링크 제공

#### ④ AccountDetail.js

```jsx
// account: 선택된 계좌 상세 객체를 props로 받음
function AccountDetail({ account }) {
  // 데이터가 아직 없으면(로딩 전/실패) 안내 문구 표시 (방어 코드)
  if (!account) return <p>정보가 없습니다.</p>;

  return (
    <div className="account-detail">
      {/* account 객체의 속성들을 화면에 바인딩하여 출력 */}
      <h2>{account.name} 계좌 정보</h2>
      <p>계좌번호 : {account.number}</p>
      <p>잔액 : {account.balance} 원</p>
      <p>상태 : {account.status}</p>
    </div>
  );
}

export default AccountDetail;
```

계좌 상세 정보 표시

### (3) 페이지 컴포넌트

#### ① Home.js

```jsx
import React, { useEffect, useState } from "react";
// 앞서 만든 계좌 목록 API 함수와 표시 컴포넌트들을 불러옴
import { fetchAccounts } from "../api/bankApi";
import AccountList from "../components/AccountList";
import Loader from "../components/Loader";

function Home() {
  // 계좌 목록 상태 (초기값 빈 배열)
  const [accounts, setAccounts] = useState([]);
  // 로딩 상태 (초기값 true → 처음엔 로딩 화면부터 보여줌)
  const [loading, setLoading] = useState(true);
  // 에러 메시지 상태
  const [error, setError] = useState(null);

  // 마운트 시 한 번 계좌 목록 API 호출
  useEffect(() => {
    fetchAccounts()
      .then((data) => setAccounts(data)) // 성공: 받은 목록을 상태에 저장
      .catch(() => setError("계좌 정보를 가져오지 못했습니다.")) // 실패: 에러 메시지
      .finally(() => setLoading(false)); // 끝나면 로딩 종료
  }, []);

  // 상태에 따른 조건부 렌더링: 로딩 중이면 로더, 에러면 메시지 표시
  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  // 정상 응답이면 목록 컴포넌트에 데이터 전달
  return <AccountList accounts={accounts} />;
}

export default Home;
```

- 계좌 목록 API 호출
- 로딩/에러 처리
- AccountList 컴포넌트 전달

#### ② Detail.js

```jsx
import React, { useEffect, useState } from "react";
// useParams: URL 경로의 동적 파라미터(:id)를 읽어오는 훅
import { useParams } from "react-router-dom";
import { fetchAccountDetail } from "../api/bankApi";
import AccountDetail from "../components/AccountDetail";
import Loader from "../components/Loader";

function Detail() {
  // URL의 /detail/:id 부분에서 id 값을 추출
  const { id } = useParams();
  // 계좌 상세 데이터 상태 (초기값 null)
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  // id가 바뀔 때마다 해당 계좌 상세를 다시 조회 (의존성 배열에 id 포함)
  useEffect(() => {
    fetchAccountDetail(id)
      .then((data) => setAccount(data)) // 성공: 상세 데이터 저장
      .finally(() => setLoading(false)); // 완료 후 로딩 종료
  }, [id]);

  // 로딩 중이면 로더 표시
  if (loading) return <Loader />;

  // 받아온 계좌 데이터를 상세 컴포넌트에 전달
  return <AccountDetail account={account} />;
}

export default Detail;
```

- URL 파라미터 기반 계좌 상세 API 호출
- 로딩 처리

#### ③ App.js

```jsx
// 라우팅 핵심 요소: Router(라우팅 활성화), Routes(경로 모음), Route(개별 경로)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import "./App.css";

function App() {
  return (
    // Router로 감싸야 하위에서 라우팅/Link가 동작함
    <Router>
      {/* 모든 페이지 상단에 공통으로 보이는 헤더 */}
      <Header />
      <Routes>
        {/* "/" 경로 → Home 페이지 렌더링 */}
        <Route path="/" element={<Home />} />
        {/* "/detail/:id" 경로 → Detail 페이지 (:id는 동적 파라미터) */}
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
```

- SPA 구조 및 라우팅 구성
- 홈/상세 페이지 연결

#### ④ index.js

```jsx
import React from "react";
// ReactDOM client API: React 18의 createRoot 사용
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";

// public/index.html의 id="root" 요소를 찾아 React 렌더링 루트 생성
const root = ReactDOM.createRoot(document.getElementById("root"));
// 최상위 App 컴포넌트를 실제 화면에 렌더링 (앱 시작점)
root.render(<App />);
```

#### ⑤ App.css

```css
/* 전역 기본 스타일: 폰트, 배경색, 바깥/안쪽 여백 초기화 */
body {
  font-family: Arial, sans-serif;
  background: #f5f5f5;
  margin: 0;
  padding: 0;
}

/* 상단 헤더 영역: 파란 배경, 흰 글씨, 가운데 정렬 */
header {
  background: #0078d4;
  color: white;
  padding: 10px;
  text-align: center;
}

/* 헤더 내 링크: 흰 글씨, 왼쪽 간격, 밑줄 제거 */
header nav a {
  color: white;
  margin-left: 10px;
  text-decoration: none;
}

/* 목록·상세 컨테이너: 최대 너비 제한 후 가운데 정렬, 카드형 스타일 */
.account-list, .account-detail {
  max-width: 600px;
  margin: 20px auto;
  background: white;
  padding: 15px;
  border-radius: 8px;
}

/* 목록 각 항목 사이의 아래 간격 */
.account-list li {
  margin-bottom: 10px;
}

/* 로딩 표시: 가운데 정렬과 충분한 바깥 여백 */
.loader {
  text-align: center;
  margin: 50px;
}
```
