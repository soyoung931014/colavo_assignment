# colavo_assignment_refactoring
----
이전 기업 과제로 주어진 프로젝트를 리팩토링했습니다.<br/>
중복되는 컴포넌트를 합쳤고, 그로인해 파일 구조도 약간 수정되었습니다.<br/>
세부적으로 리스트에 각각 할인 적용, 추가, 삭제 그리고 총 가격을 나타내는 기능 등<br/>
이전 프로젝트에서 구현에 실패한 부분들을 위주로 개선시켰습니다.<br/>
이전 코드보다 깔끔한 코드로 개선되었습니다.<br/>
변수명 수정했습니다.<br/>
CSS 수정했습니다.<br/>

## 0. 고민했던 점
-----
### ✅ 테스트 코드 추가
아이템에 할인율을 적용하여, 각각의 할인된 가격 그리고 합계를 계산하는데 있어 매번 브라우저에서 테스트를 확인하는 과정을 거쳤습니다.<br/> 
여러가지 변수가 발생할 수 있는 이 과정을 브라우저단에서 일일히 테스트를 해주는건 매우  비효율적이라는 생각이 들었습니다.<br/> 
때문에 테스트 코드의 필요성을 느끼게 되었습니다. 테스트 코드에는 enzyme이라는 구현주도 테스팅방법과, React Testing Library를 이용해 행위주도 테스트 방법으로 나뉠수 있는데
구현 위주의 테스트 방법보다는, 이벤트를 발생시켰을때 화면이 어떻게 변화가 되는지의 초점을 맞춘 행위 주도 테스트 방법인 RTL을 선택했습니다.<br/> 

#### 🔮 사용시 어려웠던 점
#### 1. 세팅 
이 프로젝트는 CRA를 기반으로 만들었습니다. 저는 RTL과 Jest는 CRA에 기본적으로 내장되어 있기 때문에 세팅하기가 편리할거라 생각했습니다.
하지만 생각과는 달리 typescript, 절대 경로, 상태관리, msw을 이용해 테스팅 환경을 개발 환경과 똑같이 세팅해야한다는 점에서 어려움을 겪었습니다. 
세팅을 모두 마친 시점에서는 테스팅 환경을 만들기 위해 어떤것이 필요한지를 알게되었지만, 처음 Jest와 RTL만을 이용해서 테스팅을 시도했던 과정에서 많은 시간을 할애할 수 밖에 없었습니다.

#### 2. “Not wrapped in act” warning 
“Not wrapped in act” warning 이라는 경고 메세지를 많이 마주하게 되었습니다.  
경고 메세지에는 ‘act 함수를 감싸주어라’ 라는 해결 메세지도 같이 뜨는데 find~쿼리의 경우 이미 act 행위까지 추가되어있는것으로 
알고있어서 왜 act를 더 추가해줘야하는지에 대해 이해하지 못했습니다.  경고가 난 부분들의 공통점은 모두  상태가 변경되는  부분이었고 원인을 찾아보니
테스트 환경에서는 아무런 일이 일어나지 않는데 개발 환경에서 어떠한 일(예를 들면 setState을 통해 상태 변경)이 발생해서 나타나는 경고였습니다. 
ui에서 보여지는 상태 변경의 경우에는 테스트 코드로 처리할 수 있지만, 그렇지 않은 경우에는 act()를 이용해서 처리하여 경고를 잠재워주었습니다.


#### 🔮 사용 후기
한 번 테스트를 작성하는 시간과 브라우저에서 일일이 테스트를 확인하는 과정의 시간을 비교해 본다면 전자가 시간 절약 측면에서 더 효율적이다라는 생각이 들었습니다. 
(사실 테스팅 환경을 세팅하고 약간의 버그를 수정하는데 있어 많은 시간을 할애했을 뿐, 실제 테스트 코드를 작성하는데에는 많은 시간이 걸리지 않았습니다.)<br/>
또한 추후 작성해둔 테스트를 통해 코드의 흐름을 빠르게 파악하는데에 도움이 되겠다는 생각을 했습니다.
이 밖에도 테스트를 작성하며 내가 짠 로직들을 한 번 더 복기해 볼 수 있는 기회였고, 이번에 미처 생각하지도 못한 경우의 오류도 발견했습니다

#### 🔮 더 궁금한 점

각각의 테스트 코드를 작성하는데에 있어서 비슷한 행위를 하는 부분이 발생했고  반복되는 코드를 작성하게 되었습니다. 이 과정이 리덕스의 보일러 플레이트를 만들어주는 느낌과 비슷하게 ‘비효율적이다’라는 생각이 들었습니다. 
이 경우를 해결할 수 있는 방법이 있을것 같은데 아직 찾지 못했습니다. 

---------

### ✅  `discount`의 할인 대상 `item`을 선택한 경우 선택한 항목만 할인 적용

선택한 아이템, 할인 목록들을 store에 담아두고,  각각의 할인 목록에 각각의  state를 생성합니다.  state에 store의 선택한 아이템들을 담아주고  텍스트, 할인율, 할인 가격을 계산하는 함수를 만들어 인자로 넣어주어 
ui에 보여주는 형식으로 로직을 짰습니다. 할인이 적용되는 목록 아이템을 store가 아닌 state로 상태관리를 해준 이유는 store에  최대한 필요한 데이터만 담아 뚱뚱해지는것을 방지해주고 싶어서였는데 문득 할인을 적용시킨 아이템들도 store에 저장해
주는게 좀 더 좋은 방향이 아닐까 하는 의문이 들었습니다. 

### ✅ redux -> context
제가 이 프로젝트를 수행할때 redux를 사용한 이유는 단 시간 내에 프로젝트를 끝내는데에 있어서 가장 익숙한 상태 관리는 redux였기 때문이었습니다. 돌이켜 생각해보니 redux를 사용한 이유는 충분치 못하다고 판단합니다.
이 프로젝트의 경우, 상태 관리 툴은 필요하다 판단이 되고, 추후 기능을 추가해 확장한다기보다는 좀 더 클린한 코드를 작성, 테스트 코드를 추가, 최적화 시도 등의 계획만을 가지고 있습니다.
따라서 간단하게 사용하기 좋은 context가 적당하다고 생각합니다. 이 후, 리팩토링으로 redux에서 context로 바꿀 예정입니다. 



## 1. 사용법

---

```jsx
# with yarn
# install
$ yarn install

# run
$ yarn start
```

## 2. 기술스택

---

- React
- Typescript
- redux
- axios
- styled-components
- json-server


## 3. 프로젝트 구조

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
 ┣ 📂mocks
 ┃ ┣ 📜handlers.js
 ┃ ┗ 📜server.js
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
 ┣ 📂tests
 ┃ ┣ 📜App.test.js
 ┃ ┣ 📜Checkout.test.js
 ┃ ┣ 📜calculate.test.js
 ┃ ┣ 📜jest-setup.js
 ┃ ┗ 📜utils.tsx
 ┣ 📂types
 ┃ ┗ 📜itemList.ts
 ┣ 📜App.tsx
 ┗ 📜index.tsx
```

## 4. 요구 사항

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






