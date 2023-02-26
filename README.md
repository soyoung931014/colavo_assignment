# colavo_assignment_refactoring
----
이전 기업 과제로 주어진 프로젝트를 리팩토링했습니다.<br/>
중복되는 컴포넌트를 합쳤고, 그로인해 파일 구조도 약간 수정되었습니다.<br/>
세부적으로 리스트에 각각 할인 적용, 추가, 삭제 그리고 총 가격을 나타내는 기능 등<br/>
이전 프로젝트에서 구현에 실패한 부분들을 위주로 개선시켰습니다.<br/>
이전 코드보다 깔끔한 코드로 개선되었습니다.<br/>
변수명 수정했습니다.<br/>
CSS 수정했습니다.<br/>

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
 ┃ ┃ ┗ 📜Button.tsx
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
 ┃ ┃ ┣ 📜DiscountTarget.tsx
 ┃ ┃ ┗ 📜ListModal.tsx
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

#### 🔮 목표

결제 아이템을 장바구니에 담고 결제 금액을 계산하세요

- `콜라보살롱` 앱 UI 참고
- UI와 화면 구성을 새롭게 구성 가능

#### 🔮 UI 요구 사항

<details>
<summary>1. `item`, `discount`는 각각 장바구니로 추가/삭제 가능   </summary>
<div markdown="1">

![ezgif com-resize](https://user-images.githubusercontent.com/80194405/221419302-5a02fad5-2aaa-47c6-91fb-f33b54b6b0bf.gif)
</div>
</details>

<details>
<summary>2. 동일한 아이템을 장바구니로 담을 수 없음 </summary>
<div markdown="1">

![ezgif com-resize (1)](https://user-images.githubusercontent.com/80194405/221420156-95af820f-ae4c-4e22-8dd1-9067ed3567b0.gif)


</div>
</details>

<details>
<summary>3. `item`의 수량 선택 가능 eg. `item x 3` </summary>
<div markdown="1">

![ezgif com-resize (2)](https://user-images.githubusercontent.com/80194405/221420236-ca8ebad7-e67e-41e1-a452-405e4abc540b.gif)

</div>
</details>

<details>
<summary>4. `discount`의 할인 대상 `item`을 선택하지 않으면 장바구니에 담긴 모든 `item`을 할인 적용</summary>
<div markdown="1">
- 할인율은 시술 종류의 갯수에 상관없이 한 개로 적용됨. ex) 10000원 시술 X 3 일때, 10%할인이라면 1000원으로 적용 

![ezgif com-resize (3)](https://user-images.githubusercontent.com/80194405/221420370-dc68ac37-83c6-4dae-84f8-a5127184463e.gif)

</div>
</details>

<details>
<summary>5. `discount`의 할인 대상 `item`을 선택한 경우 선택한 항목만 할인 적용 </summary>
<div markdown="1">


![ezgif com-resize (4)](https://user-images.githubusercontent.com/80194405/221420724-4d3578e2-949f-49be-b24b-d733d7a3e709.gif)

</div>
</details>
</details>

<details>
<summary>6. 장바구니에 담긴 내용이 변경될 때 마다 사용자에게 최종 금액을 표시 </summary>
<div markdown="1">


![ezgif com-resize (7)](https://user-images.githubusercontent.com/80194405/221421970-4c0441ed-23f5-410d-aaeb-1da182b3447d.gif)



</div>
</details>
</details>






