import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { HiPlusCircle } from 'react-icons/hi';

import TitleBar from '@components/header/TitleBar';
import Button from '@components/button/Button';

import SelectedItemList from '@components/itemList/SelectedItemList';
import SelectedDiscountList from '@components/itemList/SelectedDiscountList';

import {
  AddCheckDiscount,
  AddCheckItem,
  Discount,
  HairList,
  Item,
  StoreInfo,
} from '@type/itemList';
import ListModal from '@src/components/modal/ListModal';
import axios from 'axios';
import { fetchCurrencyCode } from '@src/redux/action/currencyCodeAction';

export interface appliedDiscount {
  name: string;
  appliedItem: string[];
  discountedPrice: number;
}

const Checkout = () => {
  const { selectedCart, selectedDiscount }: any = useSelector(
    selector => selector,
  );

  useEffect(() => {
    fetchPriceList();
  }, []);

  const [cartData, setcartData] = useState<AddCheckItem[]>([]);
  const [discountData, setDiscountData] = useState<AddCheckDiscount[]>([]);
  const dispatch = useDispatch();

  // 데이터 페칭
  const fetchPriceList = async () => {
    try {
      await axios
        .get(
          'https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData',
        )
        .then(res => {
          const { items, discounts, currency_code }: HairList = res.data;
          const itemArray = addId(Object.values(items));
          const discountArray = addId(Object.values(discounts));
          setcartData([...itemArray]);
          setDiscountData([...discountArray]);
          /*  dispatch(fetchCartInfo(itemArray));
          dispatch(fetchDiscountInfo(discountArray)); */
          dispatch(fetchCurrencyCode(currency_code));
        });
    } catch (error) {
      error;
    }
  };

  // 데이터 페칭 과정에서 true/false 넣어주어 가공
  const addId = (list: Item[] | Discount[]) => {
    return list.map((item, idx) => {
      return { id: idx, check: false, ...item };
    });
  };

  console.log(selectedDiscount);
  // 모달 열고 닫고, 업데이트 하는 useState
  const [cartModal, setcartModal] = useState<boolean>(false);
  const [discountModal, setDiscountModal] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

  // 모달 여닫는 핸들러들..
  const cartModalHandler = () => {
    setcartModal(!cartModal);
  };
  const discountModalHandler = () => {
    setDiscountModal(!discountModal);
  };
  const updateHandler = () => {
    setUpdate(!update);
  };
  console.log(selectedCart);

  // const selectedCart: AddCheckItem[] = selectedCart.filter(
  //   el => el.check === true,
  // );

  /*  const addedItem: AddCheckItem[] = selectedCart.filter(
    el => el.check === true,
  );
  const SumItemPrice: number = addedItem.reduce(
    (acc, item) => acc + item.price * item.count,
    0,
  );

  const copyAddedItem = addedItem; */

  /*  const addedDiscount: AddCheckDiscount[] = discount.filter(
    el => el.check === true,
  ); */

  /*  const oneSum = copyAddedItem.reduce((acc, item) => acc + item.price, 0);

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
  }); */

  return (
    <Container>
      {!cartModal && !discountModal ? (
        <>
          <HeaderWrapper>
            <TitleBar />
          </HeaderWrapper>

          <ListWrapper>
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
            {selectedCart?.map((item: AddCheckItem) => (
              <>
                <SelectedItemList
                  key={item.name}
                  {...item}
                  countUpdateHandler={updateHandler}
                  countModal={cartModal}
                />
              </>
            ))}
            {selectedDiscount.map((item, idx) => (
              <>
                <SelectedDiscountList
                  key={idx}
                  {...item}
                  updateHandler={updateHandler}
                />
              </>
            ))}

            {/*  {discountData.map((discount, idx) => (
              <SelectedDiscountList
                key={idx}
                {...discount}
                updateHandler={updateHandler}
              />
            ))} */}
            <Div></Div>
          </ListWrapper>

          <ButtonWrapper>
            <Button /* totalPrice={totalPrice} */ />
          </ButtonWrapper>
        </>
      ) : discountModal ? (
        <>
          <ListModal
            discountModalHandler={discountModalHandler}
            text="할인"
            discountData={discountData}
          />
        </>
      ) : cartModal && cartData ? (
        <>
          <ListModal
            cartModalHandler={cartModalHandler}
            text="시술 메뉴"
            cartData={cartData}
          />
        </>
      ) : null}
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
  position: fixed;
  bottom: 0;
  left: 0;
  height: 140px;
  width: ${({ theme }) => theme.deviceSizes.mobile};
  background: #fff;
  left: 50%;
  transform: translate(-50%);
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

const ListWrapper = styled.div`
  /*  height: 100vh; */
  overflow: auto;
`;
