import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiArrowDropDownLine } from 'react-icons/ri';

import { AddCheckItem } from '@src/types/itemList';
import Count from '../modal/Count';
export interface SelectedItemListProps {
  countModalHandler: () => void;
  countModal: boolean;
  id: number;
  count: number;
  name: string;
  price: number;
}
const SelectedItemList = ({
  id,
  count,
  name,
  price,
  countModalHandler,
  countModal,
}: SelectedItemListProps) => {
  return (
    <>
      {countModal ? (
        <>
          <Count
            name={name}
            count={count}
            id={id}
            countModalHandler={countModalHandler}
          />
        </>
      ) : null}
      <Container onClick={countModalHandler}>
        <ItemContent>
          <ItemTag>
            <Tag>{name}</Tag>
            <EditIcon />
          </ItemTag>
          <Price>{price}원</Price>
        </ItemContent>
        <CountWrapper>
          <Total>{count}</Total>
          <DropDown>
            <DropDownIcon />
          </DropDown>
        </CountWrapper>
      </Container>
    </>
  );
};

export default SelectedItemList;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 39px;
  &:hover {
    cursor: pointer;
  }
`;
const CountWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  padding: 7px 12px;
  color: ${({ theme }) => theme.color.grey_04};
  border-radius: 20px;
  border: solid 2px #4f4b4b54;
`;
const ItemTag = styled.div`
  display: flex;
`;
const Tag = styled.div`
  margin-right: 3px;
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.grey_04};
`;
const Price = styled.div`
  font-size: 12px;
  font-weight: 600;
  margin-top: 4px;
  color: ${({ theme }) => theme.color.grey_05};
`;
const EditIcon = styled(AiOutlineEdit)`
  color: ${({ theme }) => theme.color.grey_05};
`;
const DropDownIcon = styled(RiArrowDropDownLine)`
  color: ${({ theme }) => theme.color.grey_05};
`;
const DropDown = styled.div`
  position: relative;
  left: 5px;
`;
const Total = styled.div`
  margin-left: 3px;
  position: relative;
  left: 1px;
  color: ${({ theme }) => theme.color.grey_04};
`;

const ItemContent = styled.div``;
