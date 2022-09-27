import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { applyDiscount } from '@src/redux/action/discountAction';

const DiscountButton = ({
  temp,
  applyDiscount,
  discountModalHandler,
  totalPrice,
  discount,
  currency_code,
}: any) => {
  const ButtonHandler = () => {
    if (temp.length === 0) {
      alert('1개 이상 선택해주세요');
      return;
    }
    selectedDiscountList(discount);
    discountModalHandler();
  };
  const selectedDiscountList = discount => {
    if (temp.length > 0) {
      for (const discountId of temp) {
        discount[discountId].check = true;
      }
      applyDiscount(discount);
    }
  };
  if (currency_code === 'USD') {
    totalPrice = String(totalPrice * 7);
    totalPrice = totalPrice.slice(0, totalPrice.length - 4);
  }

  return (
    <Container>
      <CheckWrapper>
        <Text>합계</Text>
        {currency_code === 'USD' ? (
          <Total>${totalPrice}</Total>
        ) : (
          <Total>{totalPrice}원</Total>
        )}
      </CheckWrapper>
      <NextWrapper>
        <Div></Div>
        <Wrapper>
          <Next onClick={ButtonHandler}>완료</Next>
        </Wrapper>
      </NextWrapper>
    </Container>
  );
};

const mapStateToProps = state => {
  const { discount, currency_code } = state;
  return {
    discount,
    currency_code,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    applyDiscount: discount => dispatch(applyDiscount(discount)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscountButton);

const Container = styled.div``;
const CheckWrapper = styled.div<{ Guide?: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-right: 5px;
  align-items: center;
  padding: 0 24px;
  padding-top: 22px;
  border-top: solid 1px ${({ theme }) => theme.color.grey_02}; ;
`;
const Text = styled.div`
  font-size: 17px;
  color: ${({ theme }) => theme.color.grey_01};
  margin-left: '100px';
`;
const Total = styled.div`
  font-size: 30px;
`;
const Next = styled.div`
  font-size: 20px;
  padding: 15px;
  width: 435px;
  text-align: center;
  background-color: ${({ theme }) => theme.color.purple_02};
  color: #ffff;
  border-radius: 10px;
  margin-top: 10px;
`;
const NextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  margin-right: 8px;
  padding: 0 20px;
`;
const Wrapper = styled.div`
  :hover {
    cursor: pointer;
  }
`;
const Div = styled.div``;
