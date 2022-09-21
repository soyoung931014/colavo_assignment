import React, { useState } from 'react';
import styled from 'styled-components';
import TitleBar from '../header/TitleBar';
import Button from '../button/Button';
import { Item } from '@src/types/itemList';
import ItemList from '../itemList/ItemList';

interface priceListInfo {
  itemList: Item[];
  modalHandler: () => void;
  setCart: any;
  cart: number[];
}
const PriceList = ({
  modalHandler,
  itemList,
  cart,
  setCart,
}: priceListInfo) => {
  let count = 0;
  return (
    <Container>
      <HeaderWrapper>
        <TitleBar text="시술메뉴" />
      </HeaderWrapper>
      <ItemWrapper>
        {itemList.map((item: Item, idx: number) => (
          <ItemList
            key={idx}
            item={item}
            id={count++}
            setCart={setCart}
            cart={cart}
          />
        ))}
      </ItemWrapper>
      <ButtonWrapper>
        <Button
          cart={cart}
          setCart={setCart}
          text="서비스를 선택하세요(여러 개 가능)"
          buttonName="완료"
          modalHandler={modalHandler}
        />
      </ButtonWrapper>
    </Container>
  );
};

export default PriceList;
const ItemWrapper = styled.div`
  padding-top: 90px;
  padding-bottom: 90px;
`;
const Container = styled.div`
  border: solid red 2px;
`;
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
`;
