import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { saveCart } from '@src/redux/action/cartAction';

const Button = ({
  text,
  buttonName,
  cartModalHandler,
  temp,
  cart,
  saveCart,
  totalPrice,
  currency_code,
}: any) => {
  const ButtonHandler = () => {
    if (temp.length === 0) {
      alert('1개 이상 선택해주세요');
      return;
    }
    selectedItemList(cart);
    cartModalHandler();
  };
  const selectedItemList = cart => {
    if (temp.length > 0) {
      for (const itemId of temp) {
        cart[itemId].check = true;
      }
      saveCart(cart);
    }
  };

  if (currency_code === 'USD') {
    totalPrice = String(totalPrice * 7);
    totalPrice = totalPrice.slice(0, totalPrice.length - 4);
  }

  return (
    <Container>
      <CheckWrapper>
        {text ? (
          <>
            <Text Guide>{text}</Text>
          </>
        ) : (
          <>
            <Text>합계</Text>
            {currency_code === 'USD' ? (
              <Total>${totalPrice}</Total>
            ) : (
              <Total>{totalPrice}원</Total>
            )}
          </>
        )}
      </CheckWrapper>
      <NextWrapper>
        <Div></Div>
        {buttonName ? (
          <>
            <Wrapper>
              <Next onClick={ButtonHandler}>{buttonName}</Next>
            </Wrapper>
          </>
        ) : (
          <>
            <Next>다음</Next>
          </>
        )}
      </NextWrapper>
    </Container>
  );
};

const mapStateToProps = state => {
  const { cart, currency_code } = state;
  return {
    cart,
    currency_code,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveCart: cart => dispatch(saveCart(cart)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Button);

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
const Text = styled.div<{ Guide?: boolean }>`
  font-size: 17px;
  color: ${({ theme }) => theme.color.grey_01};
  margin-left: ${props => (props.Guide ? '100px' : '0')};
  padding-bottom: 10px;
`;
const Total = styled.div`
  font-size: 30px;
`;
const Next = styled.div`
  font-size: 20px;
  padding: 15px;
  width: 440px;
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
