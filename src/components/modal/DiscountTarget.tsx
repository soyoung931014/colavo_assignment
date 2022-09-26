import { applyDiscount } from '@src/redux/action/discountAction';
import { AddCheckDiscount } from '@src/types/itemList';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import DiscountTargetList from '../itemList/DiscountTargetList';
export interface DiscountTargetProps {
  name: string;
  appliedItem: string[];
  modalHandler: () => void;
  updateHandler: () => void;
  discount: AddCheckDiscount[];
}
const DiscountTarget = ({
  name,
  appliedItem,
  modalHandler,
  discount,
  updateHandler,
}: DiscountTargetProps) => {
  console.log(appliedItem, 'applied');
  console.log(discount, 'discount');
  const findDiscount = discount.filter(el => el.name === name);
  const { id } = findDiscount[0];
  const deleteHandler = () => {
    if (discount !== undefined) {
      discount[id].check = false;
    }
    applyDiscount(discount);
    modalHandler();
    updateHandler();
  };
  console.log(discount, 'd8');
  const saveHandler = () => {
    console.log('저장');
    modalHandler();
  };
  return (
    <>
      <BackGround>
        <Container>
          <div>
            <Title>{name}</Title>
            <ListWrapper>
              {appliedItem.map((list, idx) => (
                <DiscountTargetList key={idx} item={list} />
              ))}
            </ListWrapper>
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
const mapStateToProps = state => {
  const { discount } = state;
  console.log(discount, 'dfdfd');
  return {
    discount,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    applyDiscount: discount => dispatch(applyDiscount(discount)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DiscountTarget);
const Title = styled.div`
  font-size: 25px;
  position: fixed;
  z-index: 200;
  left: 50%;
  transform: translate(-50%);
  background: #fff;
  border-bottom: solid 2px red;
  margin-top: 10px;
`;
const ListWrapper = styled.div`
  padding-top: 50px;
  position: sticky;
`;

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
  border: solid red 2px;
  position: sticky;
  bottom: 0;
  left: 0;
`;

const Div = styled.div``;
