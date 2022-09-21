import React, { useState } from 'react';
import styled from 'styled-components';
import { BsCheckLg } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';

import { AddIdItem } from '@type/itemList';

interface ItemListProps {
  item: AddIdItem;
}

const ItemList = ({ item }: ItemListProps) => {
  const [check, setCheck] = useState<boolean>(false);
  const { id, name, price, count }: AddIdItem = item;

  const checkHandler = () => {
    setCheck(!check);
  };
  /*  if (check && !selectedList.includes(id)) {
    setSelectedList([...selectedList, id]);
  }
  if (!check && selectedList.includes(id)) {
    const idx = selectedList.indexOf(id);
    if (idx > -1) {
      selectedList.splice(idx, 1);
    }
  } */

  return (
    <Container onClick={checkHandler}>
      <ItemContent>
        <ItemTag>
          <Tag>{item.name}</Tag>
          <EditIcon />
        </ItemTag>
        <Price>{item.price}원</Price>
      </ItemContent>
      {check ? <CheckIcon /> : null}
    </Container>
  );
};

export default ItemList;

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
