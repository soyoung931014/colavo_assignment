import React from 'react';
import styled from 'styled-components';
import { FiX } from 'react-icons/fi';

export interface TitleBar {
  text?: string;
  cartModalHandler?: () => void;
  discountModalHandler?: () => void;
}

const TitleBar = ({
  text,
  cartModalHandler,
  discountModalHandler,
}: TitleBar) => {
  return (
    <Container>
      <IconWrapper>
        {text === '시술 메뉴' ? (
          <Div>
            <Closed onClick={cartModalHandler} />
          </Div>
        ) : text === '할인' ? (
          <Div>
            <Closed onClick={discountModalHandler} />
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
