import React from 'react';
import styled from 'styled-components';
import TitleBar from '../header/TitleBar';
import { AddCheckDiscount } from '@src/types/itemList';
import { connect } from 'react-redux';
import DiscountList from '../itemList/DiscountList';
import DiscountButton from '../button/DiscountButton';

interface DiscountProps {
  discount: AddCheckDiscount;
  discountModalHandler: () => void;
  temp: number[];
  tempHandler: (id: number, check: boolean) => void;
  totalPrice: number;
}
const DiscountModal = ({
  discount,
  temp,
  tempHandler,
  discountModalHandler,
  totalPrice,
}: DiscountProps) => {
  return (
    <Container>
      <HeaderWrapper>
        <TitleBar text="할인" discountModalHandler={discountModalHandler} />
      </HeaderWrapper>
      <ItemWrapper>
        {discount.map((discount: AddCheckDiscount) => (
          <DiscountList
            key={discount.name}
            {...discount}
            temp={temp}
            tempHandler={tempHandler}
          />
        ))}
      </ItemWrapper>
      <Div></Div>
      <ButtonWrapper>
        <DiscountButton
          discountModalHandler={discountModalHandler}
          totalPrice={totalPrice}
          temp={temp}
          tempHandler={tempHandler}
        />
      </ButtonWrapper>
    </Container>
  );
};

const mapStateToProps = state => {
  const { discount } = state;
  return {
    discount,
  };
};

export default connect(mapStateToProps)(DiscountModal);
const Container = styled.div``;
const HeaderWrapper = styled.div`
  position: fixed;
  height: 80px;
  width: 478px;
  background: #fff;
  z-index: 100;
`;
const ItemWrapper = styled.div`
  padding-top: 90px;
  padding-bottom: 90px;
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
const Div = styled.div`
  height: 40vh;
`;
