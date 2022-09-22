import { saveCart } from '@src/redux/action/cartAction';
import { AddCheckItem } from '@src/types/itemList';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

export interface CountProps {
  name: string;
  count: number;
  id: number;
  cart: AddCheckItem[];
  countModalHandler: () => void;
}
const Count = ({ name, count, id, cart, countModalHandler }: CountProps) => {
  const [total, setTotal] = useState(count);

  const handleChangeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const onlyNumber = value.replace(/[^0-9]/g, '');
    setTotal(Number(onlyNumber));
  };
  const countHandler = () => {
    if (cart !== undefined) {
      cart[id].count = total;
    }
    saveCart(cart);
    countModalHandler();
  };

  const deleteHandler = () => {
    if (cart !== undefined) {
      cart[id].check = false;
    }
    saveCart(cart);
    countModalHandler();
  };
  return (
    <>
      <BackGround>
        <Container>
          <div>
            <Div>
              <Writing
                type="text"
                onChange={handleChangeCount}
                value={total}
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
                <Button onClick={countHandler}>확인</Button>
              </Div>
            </ButtonWrapper>
          </div>
        </Container>
      </BackGround>
    </>
  );
};

const mapStateToProps = state => {
  const { cart }: any = state;
  return {
    cart,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveCart: cart => dispatch(saveCart(cart)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Count);

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
