import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AddCheckItem, Discount, HairList, Item } from '@src/types/itemList';
import axios from 'axios';
import { fetchCartInfo, saveCart } from '@src/redux/action/cartAction';
import { fetchDiscountInfo } from '@src/redux/action/discountAction';
import { fetchCurrencyCode } from '@src/redux/action/currencyCodeAction';
import { useSelector, useDispatch } from 'react-redux';
import ItemList from '../itemList/ItemList';
import TitleBar from '../header/TitleBar';
import Button from '../button/Button';
import { check } from 'prettier';

const ListModal = ({ cartModalHandler }: any) => {
  const { cart, discount }: any = useSelector(selector => selector); // 체크 true된 데이터 가져오기
  const dispatch = useDispatch();
  const [cartList, setCartList] = useState<AddCheckItem[]>([]);
  useEffect(() => {
    if (cart.length === 0) fetchPriceList();
  }, []);
  console.log(cart);

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
          setCartList([...itemArray]);
          /*  dispatch(fetchCartInfo(itemArray));
          dispatch(fetchDiscountInfo(discountArray)); */
          dispatch(fetchCurrencyCode(currency_code));
        });
    } catch (error) {
      error;
    }
  };

  const addId = (list: Item[] | Discount[]) => {
    return list.map((item, idx) => {
      return { id: idx, check: false, ...item };
    });
  };

  function list(cartList, cart) {
    for (const item of cart) {
      for (const list of cartList) {
        if (item.id === list.id) cartList.check = true;
      }
    }
    return cartList;
  }
  const itemList = list(cartList, cart);
  console.log(itemList);

  let checkDataList: AddCheckItem[] = [];
  const tempCartList = (idx: number, value: boolean) => {
    if (value) {
      checkDataList = [...checkDataList, cartList[idx]];
    } else {
      checkDataList = checkDataList.filter(el => el.id !== idx);
    }
    console.log(checkDataList);
  };
  const saveCartHandler = () => {
    dispatch(saveCart(checkDataList));
    cartModalHandler();
  };
  console.log(cart, 'cartttt');

  return (
    <Container>
      <HeaderWrapper>
        <TitleBar text="시술 메뉴" cartModalHandler={cartModalHandler} />
      </HeaderWrapper>
      <ItemWrapper>
        {itemList.map((item: AddCheckItem, idx: number) => (
          <ItemList key={item.name} item={item} tempCartList={tempCartList} />
        ))}
      </ItemWrapper>
      <ButtonWrapper>
        <Button
          text="서비스를 선택하세요(여러 개 가능)"
          buttonName="완료"
          cartModalHandler={saveCartHandler}
        />
      </ButtonWrapper>
    </Container>
  );
};

export default ListModal;
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
