import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { appliedDiscount } from '@src/pages/Checkout';
import DiscountTarget from '../modal/DiscountTarget';

export interface SelectedDiscountListProps {
  name: string;
  appliedItem: any;
  discountedPrice: any;
  updateHandler: () => void;
}
const SelectedDiscountList = ({
  name,
  appliedItem,
  discountedPrice,
  updateHandler,
}: SelectedDiscountListProps) => {
  const [modal, setModal] = useState(false);
  const modalHandler = () => {
    setModal(!modal);
  };
  return (
    <>
      {modal ? (
        <DiscountTarget
          name={name}
          appliedItem={appliedItem}
          modalHandler={modalHandler}
          updateHandler={updateHandler}
        />
      ) : null}
      <Container onClick={modalHandler}>
        <ItemContent>
          <ItemTag>
            <Tag>{name}</Tag>
            <EditIcon />
          </ItemTag>
          <Total>{appliedItem}</Total>
          <Price>{discountedPrice}원</Price>
        </ItemContent>
        <CountWrapper>
          <Edit>수정</Edit>
          <DropDown>
            <DropDownIcon />
          </DropDown>
        </CountWrapper>
      </Container>
    </>
  );
};

export default SelectedDiscountList;
const Price = styled.div`
  margin-top: 5px;
  color: ${({ theme }) => theme.color.pink_02};
  font-size: 12px;
`;
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
const Edit = styled.div`
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
  margin-top: 3px;
  position: relative;
  left: 1px;
  font-size: 11px;
  color: ${({ theme }) => theme.color.grey_02};
`;

const ItemContent = styled.div``;
