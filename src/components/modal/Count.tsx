import React, { useState } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { deleteCart, updateCart } from '@src/redux/action/cartAction';

export interface CountProps {
  count: number;
  id: number;
  updateHandler: () => void;
  modalHandler: () => void;
}
const Count = ({ count, id, updateHandler, modalHandler }: CountProps) => {
  const { selectedCart }: any = useSelector(selector => selector);
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(count);

  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const onlyNumber = value.replace(/[^0-9]/g, '');
    if (onlyNumber.length >= 3) return;
    setQuantity(Number(onlyNumber));
  };

  const saveHandler = () => {
    if (quantity === 0) {
      deleteHandler();
      return;
    }
    updateCountHandler();
  };

  const deleteHandler = () => {
    const undelectedCart = selectedCart.filter(item => item.id !== id);
    dispatch(deleteCart(undelectedCart));
    updateHandler();
    modalHandler();
  };

  const updateCountHandler = () => {
    let cart;
    if (quantity !== undefined) {
      cart = selectedCart.map(item =>
        item.id === id ? { ...item, count: quantity } : { ...item },
      );
    }
    dispatch(updateCart(cart));
    updateHandler();
    modalHandler();
  };

  return (
    <>
      <BackGround>
        <Container>
          <div>
            <Div>
              <Writing
                type="text"
                value={quantity}
                onChange={handleQuantity}
              ></Writing>
              <Text>갯수 입력</Text>
            </Div>
            <ButtonWrapper>
              <Div>
                <Button Delete onClick={deleteHandler}>
                  삭제
                </Button>
              </Div>
              <Div>
                <Button onClick={saveHandler}>확인</Button>
              </Div>
            </ButtonWrapper>
          </div>
        </Container>
      </BackGround>
    </>
  );
};

export default Count;

const BackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(238, 238, 238, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;
const Container = styled.div`
  width: 300px;
  height: 200px;
  background: #ffffff;
  box-shadow: 0px 4px 15px 3px rgba(220, 220, 220, 0.5);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Writing = styled.input`
  border-bottom: 2px solid ${({ theme }) => theme.color.grey_02};
  color: ${({ theme }) => theme.color.grey_01};
  text-align: center;
  font-size: 20px;
  width: 215px;
`;

const Button = styled.button<{ Delete?: boolean }>`
  color: ${({ theme }) => theme.color.purple_02};
  font-size: 20px;
  font-weight: 500;
  border-radius: 5px;
  padding: 8px 35px;
  position: relative;
  top: 30px;
  margin-right: ${props => (props.Delete ? '10px' : '0')};
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.color.purple_02};
    color: ${({ theme }) => theme.color.grey_02};
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
`;
const Text = styled.div`
  color: ${({ theme }) => theme.color.grey_02};
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;
const Div = styled.div``;
