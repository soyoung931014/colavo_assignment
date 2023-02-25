import React, { useState } from 'react';
import styled from 'styled-components';

import { AddCheckDiscount, AddCheckItem } from '@type/itemList';

import { BsCheckLg } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';

interface ItemListProps {
  item?: AddCheckItem;
  discountItem?: AddCheckDiscount;
  tempCartList: (idx: number, selected: boolean) => void;
}

const ItemList = ({ item, discountItem, tempCartList }: ItemListProps) => {
  const [selected, setSelected] = useState<boolean>(false);
  let list;
  if (!item) list = discountItem;
  if (!discountItem) list = item;

  const { id, name, check } = list;

  const checkHandler = () => {
    setSelected(!selected);
    tempCartList(id, !selected);
  };

  return (
    <Container
      onClick={
        !check
          ? checkHandler
          : () =>
              alert(
                '이미 담은 목록입니다. 삭제를 원하시면 뒤로 돌아가서 삭제해주세요.',
              )
      }
    >
      <ItemContent>
        <ItemTag>
          <EditIcon />
          <Tag>{name}</Tag>
        </ItemTag>
        <Price>{list.price ? `${list.price}원` : `${list.rate} %`}</Price>
      </ItemContent>
      {selected ? <CheckIcon /> : check && !selected ? <CheckIcon /> : null}
    </Container>
  );
};

export default ItemList;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  &:hover {
    cursor: pointer;
    background-color: #fefcfc;
    border-radius: 10px;
  }
`;
const ItemTag = styled.div`
  display: flex;
`;
const ItemContent = styled.div``;
const Tag = styled.div<{ Checked?: boolean }>`
  margin-right: 3px;
  font-size: 18px;
  font-weight: 500;
  color: ${props => (props.Checked ? 'red' : ' #303030')};
  // color: #303030;
  width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Price = styled.div`
  font-size: 12px;
  font-weight: 600;
  margin-top: 4px;
  color: #908e8e;
`;
const EditIcon = styled(AiOutlineEdit)`
  color: #908e8e;
  margin-right: 10px;
`;
const CheckIcon = styled(BsCheckLg)`
  color: ${({ theme }) => theme.color.purple_02};
`;
