import React from 'react';
import { FiX } from 'react-icons/fi';
import styled from 'styled-components';

const TitleBar = ({ text, cartModalHandler }: any) => {
  return (
    <Container>
      <IconWrapper>
        {text ? (
          <Div>
            <Closed onClick={cartModalHandler} />
          </Div>
        ) : (
          <Closed />
        )}
      </IconWrapper>
      <TitleWrapper>
        {text ? (
          <>
            <Title>{text}</Title>
          </>
        ) : (
          <>
            <Customer>곽지우</Customer>
            <Day>2019.6.14 오후 5:30 </Day>
          </>
        )}
      </TitleWrapper>
    </Container>
  );
};

export default TitleBar;

const Container = styled.div`
  display: flex;
  align-items: center;
`;
const IconWrapper = styled.div``;
const TitleWrapper = styled.div`
  margin-left: 164px;
`;

const Closed = styled(FiX)`
  width: 55px;
  height: 70px;
  color: ${({ theme }) => theme.color.grey_02};
`;
const Div = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
const Customer = styled.div`
  width: 400px;
  color: ${({ theme }) => theme.color.grey_01};
  font-size: 23px;
  font-weight: 500;
`;
const Title = styled.div`
  color: ${({ theme }) => theme.color.grey_01};
  font-size: 23px;
  font-weight: 500;
`;
const Day = styled.div`
  color: ${({ theme }) => theme.color.grey_02};
  position: relative;
  right: 30px;
  top: 2px;
`;
