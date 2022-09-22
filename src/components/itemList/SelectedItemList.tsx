import React from 'react';
import styled from 'styled-components';
import { BsCheckLg } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiArrowDropDownLine } from 'react-icons/ri';

import { AddCheckItem } from '@src/types/itemList';

const SelectedItemList = ({ id, name, price, count }: AddCheckItem) => {
  return (
    <Container>
      <ItemContent>
        <ItemTag>
          <Tag>{name}</Tag>
          <EditIcon />
        </ItemTag>
        <Price>{price}원</Price>
      </ItemContent>
      <CountWrapper>
        <Count>{count}</Count>
        <DropDown>
          <DropDownIcon />
        </DropDown>
      </CountWrapper>
    </Container>
  );
};

export default SelectedItemList;
const DropDown = styled.div`
  position: relative;
  left: 5px;
`;
const Count = styled.div`
  margin-left: 3px;
  position: relative;
  left: 1px;
  color: ${({ theme }) => theme.color.grey_04};
`;
const CountWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  //margin-right: 5px;
  font-size: 20px;
  padding: 7px 12px;
  color: ${({ theme }) => theme.color.grey_04};
  border-radius: 20px;
  border: solid 2px #4f4b4b54;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 39px;
`;
const ItemTag = styled.div`
  display: flex;
`;
const ItemContent = styled.div``;
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
