import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AddCheckItem, Discount, HairList, Item } from '@src/types/itemList';
import axios from 'axios';
import { fetchCartInfo, saveCart } from '@src/redux/action/cartAction';
import { fetchDiscountInfo } from '@src/redux/action/discountAction';
import { fetchCurrencyCode } from '@src/redux/action/currencyCodeAction';
import { useSelector, useDispatch } from 'react-redux';
import ItemList from '../itemList/ItemList';
import TitleBar from '../header/TitleBar';
import Button from '../button/Button';

const ListModal = ({ cartModalHandler, text, cartData }: any) => {
  //cartData: 페칭된 전체 cartData
  //selectedCart: 선택된 카트
  //cartItemList: 페칭된 전체와, 선택된 카트를 비교해 cartData에 체크시키기
  const { selectedCart, discount }: any = useSelector(selector => selector); // 체크 true된 데이터 가져오기
  const dispatch = useDispatch();

  const cartItemList = list(selectedCart, cartData); // cart이름 헷갈리니까 usercart로바꾸기

  function list(selectedItem, lists) {
    for (const list of lists) {
      for (const item of selectedItem) {
        if (item.id === list.id) list.check = true;
      }
    }
    return lists;
  }
  console.log(cartItemList);

  let checkDataList: AddCheckItem[] = [];
  const tempCartList = (idx: number, value: boolean) => {
    if (value) {
      checkDataList = [...checkDataList, cartData[idx]];
    } else {
      checkDataList = checkDataList.filter(el => el.id !== idx);
    }
  };
  const saveCartHandler = () => {
    dispatch(saveCart(checkDataList));
    cartModalHandler();
  };

  return (
    <Container>
      <HeaderWrapper>
        <TitleBar text={text} cartModalHandler={cartModalHandler} />
      </HeaderWrapper>
      <ItemWrapper>
        {cartItemList.map((item: AddCheckItem, idx: number) => (
          <ItemList key={item.name} item={item} tempCartList={tempCartList} />
        ))}
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
