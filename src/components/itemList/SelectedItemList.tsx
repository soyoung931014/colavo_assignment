import React, { useState } from 'react';
import styled from 'styled-components';

import Count from '@components/modal/Count';

import { AiOutlineEdit } from 'react-icons/ai';
import { RiArrowDropDownLine } from 'react-icons/ri';

export interface SelectedItemListProps {
  updateHandler: () => void;
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
  updateHandler,
}: SelectedItemListProps) => {
  const [modal, setModal] = useState(false);

  const modalhandler = () => {
    setModal(!modal);
  };

  return (
    <>
      <div>
        {modal ? (
          <>
            <Count
              count={count}
              id={id}
              updateHandler={updateHandler}
              modalHandler={modalhandler}
            />
          </>
        ) : null}
        <Container onClick={() => setModal(!modal)} data-testid="modal">
          <ItemContent>
            <ItemTag>
              <EditIcon />
              <Tag>{name}</Tag>
            </ItemTag>
            <Price>{price.toLocaleString()}원</Price>
          </ItemContent>
          <CountWrapper>
            <Total>{count}</Total>
            <DropDown>
              <DropDownIcon />
            </DropDown>
          </CountWrapper>
        </Container>
      </div>
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
    background-color: #fefcfc;
    border-radius: 10px;
  }
`;
const CountWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  padding: 7px 12px;
  width: 70px;
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
  width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Price = styled.div`
  font-size: 12px;
  font-weight: 600;
  margin-top: 5px;
  padding-top: 2px;
  color: ${({ theme }) => theme.color.grey_05};
`;
const EditIcon = styled(AiOutlineEdit)`
  color: ${({ theme }) => theme.color.grey_05};
  margin-right: 5px;
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

const ItemContent = styled.div`
  margin-top: 5px;
`;
