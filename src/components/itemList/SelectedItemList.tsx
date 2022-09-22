import React from 'react';
import styled from 'styled-components';
import { BsCheckLg } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { AddCheckItem } from '@src/types/itemList';

const SelectedItemList = ({ id, name, price }: AddCheckItem) => {
  return (
    <Container>
      <ItemContent>
        <ItemTag>
          <Tag>{name}</Tag>
          <EditIcon />
        </ItemTag>
        <Price>{price}원</Price>
      </ItemContent>
    </Container>
  );
};

export default SelectedItemList;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;
const ItemTag = styled.div`
  display: flex;
`;
const ItemContent = styled.div``;
const Tag = styled.div`
  margin-right: 3px;
  font-size: 18px;
  font-weight: 500;
  color: #303030;
`;
const Price = styled.div`
  font-size: 12px;
  font-weight: 600;
  margin-top: 4px;
  color: #908e8e;
`;
const EditIcon = styled(AiOutlineEdit)`
  color: #908e8e;
`;
const CheckIcon = styled(BsCheckLg)``;
