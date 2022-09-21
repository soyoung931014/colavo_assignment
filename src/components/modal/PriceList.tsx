import React, { useState } from 'react';
import styled from 'styled-components';
import TitleBar from '../header/TitleBar';
import Button from '../button/Button';
import { AddIdItem, Item } from '@src/types/itemList';
import ItemList from '../itemList/ItemList';

interface priceListProps {
  cartList: AddIdItem[];
  modalHandler: () => void;
}
const PriceList = ({ modalHandler, cartList }: priceListProps) => {
  return (
    <Container>
      <HeaderWrapper>
        <TitleBar text="시술메뉴" />
      </HeaderWrapper>
      <ItemWrapper>
        {cartList.map((item: AddIdItem, idx: number) => (
          <ItemList key={idx} item={item} />
        ))}
      </ItemWrapper>
      <ButtonWrapper>
        <Button
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
