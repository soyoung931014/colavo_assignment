import React, { useEffect } from 'react';
import styled from 'styled-components';

const Button = ({ text, buttonName, cartModalHandler, temp }: any) => {
  console.log(text, buttonName, temp);

  const ButtonHandler = () => {
    /*   console.log(temp, 'tempfmdlfmdlfmdl');
    sessionStorage.setItem('temp', temp); */

    cartModalHandler();
  };
  return (
    <Container>
      <CheckWrapper>
        {text ? (
          <>
            <Text>{text}</Text>
          </>
        ) : (
          <>
            <Text>합계</Text>
            <Total>0원</Total>
          </>
        )}
      </CheckWrapper>
      <NextWrapper>
        <Div></Div>
        {buttonName ? (
          <>
            <Next onClick={ButtonHandler}>{buttonName}</Next>
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

export default Button;

const Container = styled.div``;
const CheckWrapper = styled.div`
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
`;
const Total = styled.div`
  font-size: 30px;
`;
const Next = styled.div`
  font-size: 20px;
  padding: 15px;
  width: 468px;
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
const Div = styled.div``;
