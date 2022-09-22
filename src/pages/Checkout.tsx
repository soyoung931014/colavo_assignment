import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { HiPlusCircle } from 'react-icons/hi';

import TitleBar from '@components/header/TitleBar';
import PriceList from '@components/modal/PriceList';
import Discount from '@components/modal/Discount';
import Button from '@components/button/Button';

import { AddCheckItem, StoreInfo } from '@type/itemList';
import SelectedItemList from '@components/itemList/SelectedItemList';

const Checkout = ({ cart, discount }: StoreInfo) => {
  const [cartModal, setCartModal] = useState<boolean>(false);
  const [discountModal, setDiscountModal] = useState<boolean>(false);
  const [temp, setTemp] = useState<number[]>([]);

  const filterItem: AddCheckItem[] = cart.filter(el => el.check === true);

  const cartModalHandler = () => {
    setCartModal(!cartModal);
  };

  const tempHandler = (id: number, selected: boolean) => {
    if (selected) {
      setTemp([...temp, id]);
    }
    if (!selected) {
      temp.splice(id, 1);
      setTemp([...temp]);
    }
  };

  return (
    <Container>
      {!cartModal ? (
        <>
          <HeaderWrapper>
            <TitleBar />
          </HeaderWrapper>
          <MenuWrapper>
            <MenuDiv onClick={cartModalHandler}>
              <Icon />
              <Text>시술</Text>
            </MenuDiv>
            <MenuDiv Discount onClick={() => setDiscountModal(!discountModal)}>
              <Icon />
              <Text>할인</Text>
            </MenuDiv>
          </MenuWrapper>
          {filterItem.map((item: AddCheckItem) => (
            <SelectedItemList key={item.name} {...item} />
          ))}
          <Div></Div>
          <ButtonWrapper>
            <Button />
          </ButtonWrapper>
        </>
      ) : !cartModal && discountModal ? (
        <>
          <Discount />
        </>
      ) : (
        <>
          <PriceList
            temp={temp}
            tempHandler={tempHandler}
            cartModalHandler={cartModalHandler}
          />
        </>
      )}
    </Container>
  );
};
const mapStateToProps = state => {
  const { cart, discount }: any = state;
  return {
    cart,
    discount,
  };
};
export default connect(mapStateToProps)(Checkout);
const Container = styled.section``;
const HeaderWrapper = styled.div`
  position: fixed;
  height: 80px;
  width: 478px;
  background: #fff;
  z-index: 100;
  left: 50%;
  transform: translate(-50%);
`;
const MenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: sticky;
  padding-top: 90px;
  padding-bottom: 90px;
`;
const MenuDiv = styled.div<{ Discount?: boolean }>`
  display: flex;
  width: 200px;
  padding: 15px;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  border-radius: 10px;
  background-color: ${props => (props.Discount ? ' #FDEFF4' : '#F7F7F7')};
  color: ${props => (props.Discount ? '#f45dc989' : '#23222241')};
`;

const ButtonWrapper = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  height: 140px;
  width: ${({ theme }) => theme.deviceSizes.mobile};
`;

const Icon = styled(HiPlusCircle)`
  width: 25px;
  height: 30px;
`;

const Text = styled.div`
  text-align: center;
  width: 50px;
  font-size: 18px;
  font-weight: bold;
  margin-top: 3px;
`;

const Div = styled.div`
  height: 80vh;
`;
