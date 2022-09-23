import React from 'react';
import styled from 'styled-components';
import TitleBar from '../header/TitleBar';
import Button from '../button/Button';
import { AddCheckItem } from '@src/types/itemList';
import ItemList from '../itemList/ItemList';
import { connect } from 'react-redux';

interface priceListProps {
  cart: AddCheckItem[];
  cartModalHandler: () => void;
  temp: number[];
  tempHandler: (id: number, check: boolean) => void;
}
const PriceList = ({
  cartModalHandler,
  cart,
  temp,
  tempHandler,
}: priceListProps) => {
  return (
    <Container>
      <HeaderWrapper>
        <TitleBar text="시술메뉴" cartModalHandler={cartModalHandler} />
      </HeaderWrapper>
      <ItemWrapper>
        {cart.map((item: AddCheckItem) => (
          <ItemList
            key={item.name}
            item={item}
            temp={temp}
            tempHandler={tempHandler}
          />
        ))}
      </ItemWrapper>
      <ButtonWrapper>
        <Button
          text="서비스를 선택하세요(여러 개 가능)"
          buttonName="완료"
          cartModalHandler={cartModalHandler}
          temp={temp}
        />
      </ButtonWrapper>
    </Container>
  );
};
const mapStateToProps = state => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(PriceList);
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
