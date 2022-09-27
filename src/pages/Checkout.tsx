import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { HiPlusCircle } from 'react-icons/hi';

import TitleBar from '@components/header/TitleBar';
import PriceList from '@components/modal/PriceList';
import Button from '@components/button/Button';

import SelectedItemList from '@components/itemList/SelectedItemList';
import DiscountModal from '@components/modal/DiscountModal';
import SelectedDiscountList from '@components/itemList/SelectedDiscountList';

import { AddCheckDiscount, AddCheckItem, StoreInfo } from '@type/itemList';

export interface appliedDiscount {
  name: string;
  appliedItem: string[];
  discountedPrice: number;
}

const Checkout = ({ cart, discount }: StoreInfo) => {
  const [cartModal, setCartModal] = useState<boolean>(false);
  const [discountModal, setDiscountModal] = useState<boolean>(false);

  const [update, setUpdate] = useState<boolean>(false);

  const [temp, setTemp] = useState<number[]>([]);
  const [tempDiscount, setTempDiscount] = useState<number[]>([]);


  const addedItem: AddCheckItem[] = cart.filter(el => el.check === true);
  const SumItemPrice: number = addedItem.reduce(
    (acc, item) => acc + item.price * item.count,
    0,
  );

  const copyAddedItem = addedItem;

  const addedDiscount: AddCheckDiscount[] = discount.filter(
    el => el.check === true,
  );

  const oneSum = copyAddedItem.reduce((acc, item) => acc + item.price, 0);

  const discountedPrice = addedDiscount.map(el =>
    Math.floor((Math.floor(el.rate * 100) / 100) * oneSum),
  );


  const SumDiscountedPrice = discountedPrice.reduce(
    (acc, discountPrice) => acc + discountPrice,
    0,
  );

  const totalPrice = SumItemPrice - SumDiscountedPrice;

  const discountedItemList = addedItem.map(el => {
    if (el.count > 1) {
      return ` ${el.name} x ${el.count}, `;
    }
    return `${el.name}, `;
  });


  const appliedDiscount: appliedDiscount[] = addedDiscount.map((el, idx) => {
    return {
      name: el.name,
      appliedItem: discountedItemList,
      discountedPrice: -discountedPrice[idx],
    };
  });

  const cartModalHandler = () => {
    setCartModal(!cartModal);
  };
  const discountModalHandler = () => {
    setDiscountModal(!discountModal);
  };
  const updateHandler = () => {
    setUpdate(!update);
  };

  const tempHandler = (id: number, selected: boolean) => {
    if (selected) {
      setTemp([...temp, id]);
    }
    if (!selected) {
      const first = temp.slice(0, id);
      const rest = temp.slice(id + 1);
      setTemp([...first, ...rest]);
    }
  };
  const tempDiscountHandler = (id: number, selected: boolean) => {
    if (selected) {
      setTempDiscount([...tempDiscount, id]);
    }
    if (!selected) {
      const first = tempDiscount.slice(0, id);
      const rest = tempDiscount.slice(id + 1);
      setTempDiscount([...first, ...rest]);
    }
  };


  return (
    <Container>
      {!cartModal && !discountModal ? (
        <>
          <HeaderWrapper>
            <TitleBar />
          </HeaderWrapper>
          <MenuWrapper>
            <MenuDiv onClick={cartModalHandler}>
              <Icon />
              <Text>시술</Text>
            </MenuDiv>
            <MenuDiv Discount onClick={discountModalHandler}>
              <Icon />
              <Text>할인</Text>
            </MenuDiv>
          </MenuWrapper>
          {addedItem.map((item: AddCheckItem, idx: number) => (
            <>
              <SelectedItemList
                key={idx}
                {...item}
                countUpdateHandler={updateHandler}
                countModal={cartModal}
              />
            </>
          ))}
          {appliedDiscount.map((discount, idx) => (
            <SelectedDiscountList
              key={idx}
              {...discount}
              updateHandler={updateHandler}
            />
          ))}
          <Div></Div>
          <ButtonWrapper>
            <Button totalPrice={totalPrice} />
          </ButtonWrapper>
        </>
      ) : discountModal ? (
        <>
          <DiscountModal
            temp={temp}
            tempHandler={tempHandler}
            discountModalHandler={discountModalHandler}
            totalPrice={totalPrice}
          />
        </>
      ) : (
        <>
          <PriceList
            temp={tempDiscount}
            tempHandler={tempDiscountHandler}

            cartModalHandler={cartModalHandler}
          />
        </>
      )}
    </Container>
  );
};
const mapStateToProps = state => {
  const { cart, discount, currency_code }: StoreInfo = state;
  return {
    cart,
    discount,
    currency_code,
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
  padding-bottom: 17px;
  border-bottom: dotted 1px ${({ theme }) => theme.color.grey_02};
  margin-bottom: 10px;
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
  &:hover {
    cursor: pointer;
  }
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
