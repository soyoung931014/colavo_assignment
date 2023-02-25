import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { AddCheckItem } from '@src/types/itemList';

import { useSelector } from 'react-redux';

import DiscountTarget from '../modal/DiscountTarget';

import { AiOutlineEdit } from 'react-icons/ai';
import { RiArrowDropDownLine } from 'react-icons/ri';

export interface SelectedDiscountListProps {
  name: string;
  rate: number;
  update: boolean;
  updateHandler: () => void;
  sumDiscount: (name: string, discountPrice: number) => void;
}

const SelectedDiscountList = ({
  name,
  rate,
  updateHandler,
  sumDiscount,
}: SelectedDiscountListProps) => {
  const { selectedCart }: any = useSelector(selector => selector);

  const [modal, setModal] = useState(false);
  const [appliedItem, setAppliedItem] = useState<AddCheckItem[]>(selectedCart);

  useEffect(() => {
    setAppliedItem(selectedCart);
  }, [selectedCart]);

  const modalHandler = () => {
    setModal(!modal);
  };

  // 할인 목록, 할인된 가격, 할인율을 내보내자.
  const discountedList = discountedInfo(appliedItem);
  function discountedInfo(appliedItem) {
    let list = '';
    let discountedPrice = 0;
    const discountedRate = parseInt(`${Number(rate) * 100}`) + '%';
    for (const item of appliedItem) {
      const { count, name, price } = item;
      if (count > 1) list += `${name} X ${count},`;
      else list += `${name},`;
      discountedPrice += Number(price) * Number(rate);
    }
    list = list.slice(0, list.length - 1);
    sumDiscount(name, Math.floor(discountedPrice));
    return [list, discountedPrice, discountedRate];
  }
  return (
    <>
      {modal ? (
        <DiscountTarget
          name={name}
          appliedItem={appliedItem}
          setAppliedItem={setAppliedItem}
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
          <Total>{discountedList[0]}</Total>
          <Price>
            -{discountedList[1].toLocaleString()}원 ( {discountedList[2]} )
          </Price>
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
  border: solid red 2px;
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
  width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ItemContent = styled.div``;
