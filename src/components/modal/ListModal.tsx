import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  AddCheckDiscount,
  AddCheckItem,
  Discount,
  HairList,
  Item,
} from '@src/types/itemList';
import axios from 'axios';
import { fetchCartInfo, saveCart } from '@src/redux/action/cartAction';
import {
  applyDiscount,
  fetchDiscountInfo,
} from '@src/redux/action/discountAction';
import { fetchCurrencyCode } from '@src/redux/action/currencyCodeAction';
import { useSelector, useDispatch } from 'react-redux';
import ItemList from '../itemList/ItemList';
import TitleBar from '../header/TitleBar';
import Button from '../button/Button';

export interface ListModalProps {
  cartModalHandler?: () => void;
  discountModalHandler?: () => void;
  text: string;
  cartData?: AddCheckItem[];
  discountData?: AddCheckDiscount[];
}

const ListModal = ({
  cartModalHandler,
  discountModalHandler,
  text,
  cartData,
  discountData,
}: ListModalProps) => {
  //cartData: 페칭된 전체 cartData
  //selectedCart: 선택된 카트
  //discountData: 할인데이터
  //cartItemList: 페칭된 전체와, 선택된 카트를 비교해 cartData에 체크시키기

  // 체크 true된 데이터 가져오기
  const { selectedCart, selectedDiscount }: any = useSelector(
    selector => selector,
  );
  const dispatch = useDispatch();

  // 시술 메뉴, 할인에 목록으로 내려줄 데이터
  // props로 내려오는 cartData가 처음에 undefined를 내 에러 발생시킴. 에러처리해야함
  const cartItemList = cartData ? lists(selectedCart, cartData) : null;
  const discountItemList = discountData
    ? lists(selectedDiscount, discountData)
    : null;

  // cartData와 개인 store(=selectedItem = 장바구니에 담은거)  담김 처리해줌
  function lists(selectedItem, lists) {
    for (const list of lists) {
      for (const item of selectedItem) {
        if (list.id === item.id) list.check = true;
      }
    }
    return lists;
  }

  // 체크된 리스트, 여기는 상태 변경을 (체크 부분만하고(체크부분은 체크컴포넌트 부분에서 렌더링됨)) 굳이 안해줘도 되니까 state에 안담아줌.
  // 이게 store에 저장될 배열
  let checkCartList: AddCheckItem[] = [];
  const tempCartList = (idx: number, value: boolean) => {
    if (value && cartData) {
      checkCartList = [...checkCartList, cartData[idx]];
    } else {
      checkCartList = checkCartList.filter(el => el.id !== idx);
    }
  };

  let checkDiscountList: AddCheckDiscount[] = [];
  const tempDiscountList = (idx: number, value: boolean) => {
    if (value && discountData) {
      checkDiscountList = [...checkDiscountList, discountData[idx]];
    } else {
      checkDiscountList = checkDiscountList.filter(el => el.id !== idx);
    }
  };

  // 저장 버튼 (체크된 데이터를 스토어에 저장, 기본화면돌아가기)
  const saveCartHandler = () => {
    if (cartData && cartModalHandler) {
      dispatch(saveCart(checkCartList));
      cartModalHandler();
    }
    if (discountData && discountModalHandler) {
      dispatch(applyDiscount(checkDiscountList));
      discountModalHandler();
    }
    return;
  };

  return (
    <Container>
      <HeaderWrapper>
        <TitleBar text={text} cartModalHandler={cartModalHandler} />
      </HeaderWrapper>
      <ItemWrapper>
        {cartItemList
          ? cartItemList.map((item: AddCheckItem) => (
              <ItemList
                key={item.name}
                item={item}
                tempCartList={tempCartList}
              />
            ))
          : discountItemList
          ? discountItemList.map((item: AddCheckDiscount) => (
              <ItemList
                key={item.name}
                discountItem={item}
                tempCartList={tempDiscountList}
              />
            ))
          : null}
      </ItemWrapper>
      <ButtonWrapper>
        <Button
          text="서비스를 선택하세요(여러 개 가능)"
          buttonName="완료"
          cartModalHandler={saveCartHandler}
        />
      </ButtonWrapper>
    </Container>
  );
};

export default ListModal;
const ItemWrapper = styled.div`
  padding-top: 90px;
  padding-bottom: 90px;
`;
const Container = styled.div``;
const HeaderWrapper = styled.div`
  position: fixed;
  height: 80px;
  width: 478px;
  background: #fff;
  z-index: 100;
`;
const ButtonWrapper = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  height: 140px;
  background: #fff;
  width: ${({ theme }) => theme.deviceSizes.mobile};
  z-index: 300;
`;
