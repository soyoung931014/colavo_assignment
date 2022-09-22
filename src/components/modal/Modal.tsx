import React, { useState } from 'react';
import styled from 'styled-components';
import { HiPlusCircle } from 'react-icons/hi';
const Modal = ({ cartModalHandler }: any) => {
  const [cartModal, setCartModal] = useState<boolean>(false);

  const modalHandler = () => {
    setCartModal(!modalHandler);
  };
  return (
    <>
      <MenuDiv onClick={() => setCartModal(!cartModal)}>
        <Icon />
        <Text>시술</Text>
      </MenuDiv>
      <MenuDiv Discount>
        <Icon />
        <Text>할인</Text>
      </MenuDiv>
    </>
  );
};

export default Modal;
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
