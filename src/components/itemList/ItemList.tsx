import React from 'react';
import styled from 'styled-components';
import { BsCheckLg } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
const ItemList = () => {
  return (
    <Container>
      <Item>
        <ItemTag>
          <Tag>여성컷</Tag>
          <EditIcon />
        </ItemTag>
        <Price>15,000원</Price>
      </Item>
      <BsCheckLg />
    </Container>
  );
};

export default ItemList;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border: solid 2px green;
`;
const ItemTag = styled.div`
  display: flex;
`;
const Item = styled.div``;
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
