import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrencyCode } from '@src/redux/action/currencyCodeAction';

import TitleBar from '@components/header/TitleBar';
import Button from '@components/button/Button';

import ListModal from '@src/components/modal/ListModal';
import SelectedItemList from '@components/itemList/SelectedItemList';
import SelectedDiscountList from '@components/itemList/SelectedDiscountList';

import { HiPlusCircle } from 'react-icons/hi';

import {
  AddCheckDiscount,
  AddCheckItem,
  Discount,
  HairList,
  Item,
} from '@type/itemList';

const Checkout = () => {
  const { selectedCart, selectedDiscount }: any = useSelector(
    selector => selector,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPriceList();
  }, []);

  // 데이터
  const [cartData, setcartData] = useState<AddCheckItem[]>([]);
  const [discountData, setDiscountData] = useState<AddCheckDiscount[]>([]);

  // 모달 state
  const [cartModal, setcartModal] = useState<boolean>(false);
  const [discountModal, setDiscountModal] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

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
          dispatch(fetchCurrencyCode(currency_code));
        });
    } catch (error) {
      error;
    }
  };

  // 데이터 페칭 과정에서 id, check 넣어주어 가공
  const addId = (list: Item[] | Discount[]) => {
    return list.map((item, idx) => {
      return { id: idx, check: false, ...item };
    });
  };

  // 모달 핸들러들
  const cartModalHandler = () => {
    setcartModal(!cartModal);
  };
  const discountModalHandler = () => {
    setDiscountModal(!discountModal);
  };
  const updateHandler = () => {
    setUpdate(!update);
  };

  useEffect(() => {
    setDiscountedInfo(discountTmp);
  }, [update]);

  //적용된 할인목록과, 할인 가격을 담은 state
  const [discountedInfo, setDiscountedInfo] = useState<[string, number][]>([]);

  // 총 가격 계산 = (장바구니 가격 - 할인 적용된 가격)
  const sumPrice: number = selectedCart?.reduce(
    (acc, item) => acc + item.price * item.count,
    0,
  );

  const sumDiscountPrice: number = discountedInfo?.reduce(
    (acc, price) => acc + price[1],
    0,
  );
  const totalPrice: number = sumPrice === 0 ? 0 : sumPrice - sumDiscountPrice;

  // 할인 목록과 할인된 가격 함수
  let discountTmp: [string, number][] = [];
  const sumDiscount = (name, discountPrice) => {
    if (discountTmp.length >= 1) {
      for (const el of discountTmp) {
        if (el[0] === name) {
          el[1] = discountPrice;
          return;
        }
      }
    }
    discountTmp = [...discountTmp, [name, discountPrice]];
  };

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
            {selectedCart.map((item: AddCheckItem) => (
              <>
                <SelectedItemList
                  key={item.name}
                  {...item}
                  updateHandler={updateHandler}
                />
              </>
            ))}
            {selectedDiscount.map((item, idx) => (
              <>
                <SelectedDiscountList
                  key={idx}
                  {...item}
                  updateHandler={updateHandler}
                  sumDiscount={sumDiscount}
                />
              </>
            ))}
            <Div></Div>
          </ListWrapper>

          <ButtonWrapper>
            <Button totalPrice={totalPrice} />
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
      ) : (
        <>
          <ListModal
            cartModalHandler={cartModalHandler}
            text="시술 메뉴"
            cartData={cartData}
            cartModal={cartModal}
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
  margin: auto;
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
  overflow: auto;
`;
