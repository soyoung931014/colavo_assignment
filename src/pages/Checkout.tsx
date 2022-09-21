import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { HiPlusCircle } from 'react-icons/hi';

import TitleBar from '@components/header/TitleBar';
import PriceList from '@components/modal/PriceList';
import Button from '@components/button/Button';

import { Discount, HairList, Info, Item } from '@type/itemList';

const Checkout = () => {
  const [cartModal, setCartModal] = useState<boolean>(false);
  const [discountModal, setDiscountModal] = useState<boolean>(false);

  const [cartList, setCartList] = useState<any>([]); // ✅ Item[]
  const [discountList, setDiscountLsit] = useState<Discount[]>([]);
  const [currency, setCurrency] = useState<string>('');

  useEffect(() => {
    fetchPriceList();
  }, []);

  const fetchPriceList = async () => {
    try {
      await axios
        .get(
          'https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData',
        )
        .then(res => {
          const { items, discounts, currency_code }: HairList = res.data;
          const itemArray = Object.values(items);
          const discountArray = Object.values(discounts);

          setCartList(itemArray);
          setDiscountLsit(discountArray);
          setCurrency(currency_code);
        });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(cartList, discountList, currency, '----------');

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
            <MenuDiv Discount>
              <Icon />
              <Text>할인</Text>
            </MenuDiv>
          </MenuWrapper>
          <Div></Div>

          <ButtonWrapper>
            <Button />
          </ButtonWrapper>
        </>
      ) : (
        <>
          <PriceList cartList={cartList} modalHandler={cartModalHandler} />
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
