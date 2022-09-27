import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { applyDiscount } from '@src/redux/action/discountAction';
import { AddCheckDiscount } from '@src/types/itemList';
import DiscountTargetList from '@components/itemList/DiscountTargetList';

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

  const saveHandler = () => {
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
  text-align: center;
  margin-bottom: 20px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.color.grey_01};
  font-weight: 600;
`;
const ListWrapper = styled.div``;

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
  z-index: 500;
`;
const Container = styled.div`
  width: 300px;
  padding: 70px 0;
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
  padding: 8px 0;
  position: relative;
  top: 30px;
  width: 100px;
  margin-right: ${props => (props.Delete ? '10px' : '0')};
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.color.purple_02};
    color: ${({ theme }) => theme.color.grey_02};
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  position: sticky;
  box-sizing: border-box;
  bottom: 20%;
  margin-left: 6%;
`;

const Div = styled.div``;
