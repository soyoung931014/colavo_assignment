import React, { useState } from 'react';
import styled from 'styled-components';
import { HiPlusCircle } from 'react-icons/hi';
import TitleBar from '@src/components/header/TitleBar';
const Checkout = () => {
  const [modal, setModal] = useState(false);
  return (
    <Container>
      <HeaderWrapper>
        <TitleBar />
      </HeaderWrapper>
      <MenuWrapper>
        <MenuDiv>
          <Icon />
          <Text>시술</Text>
        </MenuDiv>
        <MenuDiv Discount>
          <Icon />
          <Text>할인</Text>
        </MenuDiv>
      </MenuWrapper>

      <ButtonWrapper>버튼</ButtonWrapper>
    </Container>
  );
};

export default Checkout;

const Container = styled.div``;
const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 410px;
  height: 100px;
  width: 480px;
`;
const MenuWrapper = styled.div`
  padding-top: 90px;
  padding-bottom: 90px;
  display: flex;
  justify-content: center;
`;
const MenuDiv = styled.div<{ Discount?: any }>`
  display: flex;
  width: 200px;
  padding: 15px;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  border-radius: 10px;
  background-color: ${props => (props.Discount ? ' #FDEFF4' : '#F7F7F7')};
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 410px;
  height: 100px;
  width: ${({ theme }) => theme.deviceSizes.mobile};
`;

const Icon = styled(HiPlusCircle)`
  width: 25px;
  height: 30px;
`;

const Text = styled.div`
  text-align: center;
  width: 50px;
  font-size: 18px;
  border: solid red 2px;
  font-weight: bold;
`;
