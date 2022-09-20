import React from 'react';
import { FiX } from 'react-icons/fi';
import styled from 'styled-components';

const TitleBar = ({ text }: any) => {
  return (
    <Container>
      <IconWrapper>
        <Closed />
      </IconWrapper>
      <TitleWrapper>
        {text ? (
          <>
            <div>{text}</div>
          </>
        ) : (
          <>
            <Customer>곽지우</Customer>
            <Day>날짜</Day>
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
  margin-left: 180px;
`;

const Closed = styled(FiX)`
  width: 50px;
  height: 70px;
  color: ${({ theme }) => theme.color.grey_02};
`;
const Customer = styled.div`
  width: 400px;
`;
const Day = styled.div``;
