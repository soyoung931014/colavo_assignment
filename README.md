# colavo_assignment

### 1. 사용법

---

```jsx
# with yarn
# install
$ yarn install

# run
$ yarn start
```

### 2. 기술스택

---

- React
- Typescript
- redux
- axios
- styled-components
- json-server

### 3. 프로젝트 구조

---

```jsx
📦src
 ┣ 📂components
 ┃ ┣ 📂button
 ┃ ┃ ┣ 📜Button.tsx
 ┃ ┃ ┗ 📜DiscountButton.tsx
 ┃ ┣ 📂header
 ┃ ┃ ┗ 📜TitleBar.tsx
 ┃ ┣ 📂itemList
 ┃ ┃ ┣ 📜DiscountList.tsx
 ┃ ┃ ┣ 📜DiscountTargetList.tsx
 ┃ ┃ ┣ 📜ItemList.tsx
 ┃ ┃ ┣ 📜SelectedDiscountList.tsx
 ┃ ┃ ┗ 📜SelectedItemList.tsx
 ┃ ┣ 📂layout
 ┃ ┃ ┗ 📜MobileLayout.tsx
 ┃ ┗ 📂modal
 ┃ ┃ ┣ 📜Count.tsx
 ┃ ┃ ┣ 📜DiscountModal.tsx
 ┃ ┃ ┣ 📜DiscountTarget.tsx
 ┃ ┃ ┗ 📜PriceList.tsx
 ┣ 📂pages
 ┃ ┗ 📜Checkout.tsx
 ┣ 📂redux
 ┃ ┣ 📂action
 ┃ ┃ ┣ 📜cartAction.tsx
 ┃ ┃ ┣ 📜currencyCodeAction.tsx
 ┃ ┃ ┗ 📜discountAction.tsx
 ┃ ┣ 📂reducers
 ┃ ┃ ┣ 📜cartReducer.tsx
 ┃ ┃ ┣ 📜currencyCodeReducer.tsx
 ┃ ┃ ┗ 📜discountReducer.tsx
 ┃ ┗ 📂store
 ┃ ┃ ┣ 📜rootReducer.tsx
 ┃ ┃ ┗ 📜store.tsx
 ┣ 📂routes
 ┃ ┗ 📜Router.tsx
 ┣ 📂styles
 ┃ ┣ 📜GlobalStyle.ts
 ┃ ┗ 📜theme.ts
 ┣ 📂types
 ┃ ┗ 📜itemList.ts
 ┣ 📜App.tsx
 ┗ 📜index.tsx
```

### 4. 요구 사항

# 목표

결제 아이템을 장바구니에 담고 결제 금액을 계산하세요

- `콜라보살롱` 앱 UI 참고
- UI와 화면 구성을 새롭게 구성 가능

# UI 요구 사항

- `item`, `discount`는 각각 장바구니로 추가/삭제 가능
- 동일한 아이템을 장바구니로 담을 수 없음
- `item`의 수량 선택 가능 eg. `item x 3`
- `discount`의 할인 대상 `item`을 선택하지 않으면 장바구니에 담긴 모든 `item`을 할인 적용
- `discount`의 할인 대상 `item`을 선택한 경우 선택한 항목만 할인 적용
- 장바구니에 담긴 내용이 변경될 때 마다 사용자에게 최종 금액을 표시
- 최종 금액은 `currency_code`에 따라 표시
  - `USD`: $13.40
  - `KRW`: 30000원
