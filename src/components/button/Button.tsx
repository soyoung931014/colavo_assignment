import React, { useEffect } from 'react';
import styled from 'styled-components';

export interface ButtonProps {
  text?: string;
  buttonName?: string;
  cartModalHandler?: any;
  totalPrice?: any;
  currency_code?: string;
}

const Button = ({
  text,
  buttonName,
  cartModalHandler,
  totalPrice,
  currency_code,
}: ButtonProps) => {
  const ButtonHandler = () => {
    cartModalHandler();
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
              <Total> ${totalPrice} </Total>
            ) : (
              <Total>{totalPrice.toLocaleString()}원</Total>
            )}
          </>
        )}
      </CheckWrapper>
      <NextWrapper>
        {buttonName ? (
          <>
            <Wrapper>
              <Next onClick={ButtonHandler}>{buttonName}</Next>
            </Wrapper>
          </>
        ) : (
          <>
            <Wrapper>
              <Next>다음</Next>
            </Wrapper>
          </>
        )}
      </NextWrapper>
    </Container>
  );
};

export default Button;

const Container = styled.div``;
const CheckWrapper = styled.div<{ Guide?: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-right: 5px;
  align-items: center;
  padding: 0 23px;
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
  font-size: 25px;
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
