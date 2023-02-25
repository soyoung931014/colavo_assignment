import React from 'react';
import styled from 'styled-components';

import { AddCheckItem } from '@src/types/itemList';

import { useDispatch, useSelector } from 'react-redux';
import { deleteDiscount } from '@src/redux/action/discountAction';

import DiscountTargetList from '@components/itemList/DiscountTargetList';

export interface DiscountTargetProps {
  name: string;
  appliedItem: AddCheckItem[];
  setAppliedItem: (itme: AddCheckItem[]) => void;
  modalHandler: () => void;
  updateHandler: () => void;
  id?: number;
}
const DiscountTarget = ({
  id,
  name,
  appliedItem,
  setAppliedItem,
  modalHandler,
  updateHandler,
}: DiscountTargetProps) => {
  const { selectedDiscount }: any = useSelector(selector => selector);
  const dispatch = useDispatch();

  const deleteHandler = () => {
    const item = selectedDiscount.filter(item => item.name !== name);
    dispatch(deleteDiscount(item));
    modalHandler();
    updateHandler();
  };

  const saveHandler = () => {
    setAppliedItem(updateAppliedList());
    modalHandler();
    updateHandler();
  };

  // 수정 버튼에서 카트리스트 선택 여부 배열
  let checkId: number[] = appliedItem?.map(item => item.id);

  const tempCartList = (id: number) => {
    if (checkId.includes(id)) checkId = checkId.filter(el => el !== id);
    else checkId = [...checkId, id];
  };
  // 새로 checkId와 appliedItem을 이용해 수정한 할인 리스트 가져오기
  const updateAppliedList = () => {
    let updateList: AddCheckItem[] = [];
    for (const item of appliedItem) {
      for (const id of checkId) {
        if (item.id === id) {
          updateList = [...updateList, { ...item }];
        }
      }
    }

    return updateList;
  };

  return (
    <>
      <BackGround>
        <Container>
          <div>
            <Title>{name}</Title>
            <ListWrapper>
              {appliedItem.map((list, idx) => (
                <DiscountTargetList
                  key={idx}
                  idx={idx}
                  id={list.id}
                  name={list.name}
                  tempCartList={tempCartList}
                />
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

export default DiscountTarget;
const Title = styled.div`
  font-size: 25px;
  text-align: center;
  margin-bottom: 20px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.color.grey_01};
  font-weight: 600;
`;
const ListWrapper = styled.div`
  width: 252px;
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
  z-index: 500;
`;
const Container = styled.div`
  width: 300px;
  padding: 50px 0;
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
  margin-right: ${props => (props.Delete ? '20px' : '0')};
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
  margin-left: 15px;
`;

const Div = styled.div``;
