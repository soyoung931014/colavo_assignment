import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { HiPlusCircle } from 'react-icons/hi';

import TitleBar from '@components/header/TitleBar';
import PriceList from '@components/modal/PriceList';
import Button from '@components/button/Button';

import { AddCheckDiscount, AddCheckItem, StoreInfo } from '@type/itemList';
import SelectedItemList from '@components/itemList/SelectedItemList';
import DiscountModal from '@components/modal/DiscountModal';
import SelectedDiscountList from '@components/itemList/SelectedDiscountList';

export interface appliedDiscount {
  name: string;
  appliedItem: string[];
  discountedPrice: number;
}

const Checkout = ({ cart, discount }: StoreInfo) => {
  const [cartModal, setCartModal] = useState<boolean>(false);
  const [discountModal, setDiscountModal] = useState<boolean>(false);
  const [countModal, setCountModal] = useState<boolean>(false);
  const [temp, setTemp] = useState<number[]>([]);

  const addedItem: AddCheckItem[] = cart.filter(el => el.check === true);
  const SumItemPrice: number = addedItem.reduce(
    (acc, item) => acc + item.price * item.count,
    0,
  );
  const copyAddedItem = addedItem; // 원본배열 복사
  //할인목록 체크된거 저장된 배열[{},{}]
  const addedDiscount: AddCheckDiscount[] = discount.filter(
    el => el.check === true,
  );

  //수량 무시하고 선택된 가격 합
  const oneSum = copyAddedItem.reduce((acc, item) => acc + item.price, 0);
  // 할인율에 따른 할인된 가격 배열로 나타냄
  const discountedPrice = addedDiscount.map(el =>
    Math.floor((Math.floor(el.rate * 100) / 100) * oneSum),
  );
  // 할인된값 합
  const SumDiscountedPrice = discountedPrice.reduce(
    (acc, discountPrice) => acc + discountPrice,
    0,
  );
  // 총 가격
  const totalPrice = SumItemPrice - SumDiscountedPrice;

  // addedItem의 목록 이름
  const discountedItemList = addedItem.map(el => {
    if (el.count > 1) {
      return ` ${el.name} x ${el.count}, `;
    }
    return `${el.name}, `;
  });

  //적용된 할인 리스트
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
  const countModalHandler = () => {
    setCountModal(!countModal);
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

          {addedItem.map((item: AddCheckItem) => (
            <SelectedItemList
              key={item.name}
              {...item}
              countModal={countModal}
              countModalHandler={countModalHandler}
            />
          ))}
          {appliedDiscount.map((discount, idx) => (
            <SelectedDiscountList key={idx} {...discount} />
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
