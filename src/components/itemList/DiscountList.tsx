import React, { useState } from 'react';
import styled from 'styled-components';
import { BsCheckLg } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';

import { AddCheckDiscount } from '@type/itemList';

interface DiscountListProps {
  discount: AddCheckDiscount;
  temp: number[];
  tempHandler: (id: number, check: boolean) => void;
  id: number;
  name: string;
  rate: number;
  check: boolean;
}

const DiscountList = ({
  id,
  name,
  rate,
  check,
  temp,
  tempHandler,
  discount,
}: DiscountListProps) => {
  console.log(discount, 'discount');
  const [selected, setSelected] = useState<boolean>(false);

  const checkHandler = () => {
    setSelected(!selected);
  };

  if (selected && !temp.includes(id)) {
    tempHandler(id, selected);
  }
  if (!selected && temp.includes(id)) {
    const idx = temp.indexOf(id);
    if (idx > -1) {
      tempHandler(idx, selected);
    }
  }

  return (
    <Container
      onClick={!check ? checkHandler : () => alert('이미 담은 목록입니다')}
    >
      <ItemContent>
        <ItemTag>
          <EditIcon />
          <Tag>{name}</Tag>
        </ItemTag>
        <Price>{rate}</Price>
      </ItemContent>
      {selected ? <CheckIcon /> : null}
    </Container>
  );
};

export default DiscountList;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  &:hover {
    cursor: pointer;
  }
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
