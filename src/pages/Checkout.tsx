import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { HiPlusCircle } from 'react-icons/hi';
import { connect } from 'react-redux';

import TitleBar from '@components/header/TitleBar';
import PriceList from '@components/modal/PriceList';
import Button from '@components/button/Button';

import { AddCheckItem, Discount, HairList, Item } from '@type/itemList';
import Modal from '@src/components/modal/Modal';
import Discout from '@src/components/modal/Discout';

const Checkout = () => {
  /*  const [cartList, setCartList] = useState<AddCheckItem[]>([]);
  const [discountList, setDiscountLsit] = useState<Discount[]>([]);
  const [currency, setCurrency] = useState<string>(''); */

  const [cartModal, setCartModal] = useState<boolean>(false);
  const [discountModal, setDiscountModal] = useState<boolean>(false);

  const [temp, setTemp] = useState<number[]>([]);

  const tempHandler = (id: number, check: boolean) => {
    if (check) {
      setTemp([...temp, id]);
    }
    if (!check) {
      temp.splice(id, 1);
      setTemp([...temp]);
    }
  };

  const cartModalHandler = () => {
    setCartModal(!cartModal);
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
            {/*   <Modal cartModalHandler={cartModalHandler} /> */}
          </MenuWrapper>
          {temp.length}

          <Div></Div>

          <ButtonWrapper>
            <Button />
          </ButtonWrapper>
        </>
      ) : !cartModal && discountModal ? (
        <>
          <Discout />
        </>
      ) : (
        <>
          <PriceList
            cartList={cartList}
            temp={temp}
            tempHandler={tempHandler}
            /* setCartList={setCartList} */
            cartModalHandler={cartModalHandler}
          />
        </>
      )}
    </Container>
  );
};

export default Checkout;
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
