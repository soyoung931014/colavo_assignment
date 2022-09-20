import React, { useState } from 'react';
import styled from 'styled-components';
import { HiPlusCircle } from 'react-icons/hi';
import TitleBar from '@components/header/TitleBar';
import Button from '@components/button/Button';

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
      <Div></Div>

      <ButtonWrapper>
        <Button />
      </ButtonWrapper>
    </Container>
  );
};

export default Checkout;
const Container = styled.div``;
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
  padding-bottom: 90px;
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
`;

const ButtonWrapper = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  height: 140px;
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
  font-weight: bold;
  margin-top: 3px;
`;

const Div = styled.div`
  height: 80vh;
`;
