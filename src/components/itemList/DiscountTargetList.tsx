import React, { useState } from 'react';
import styled from 'styled-components';
import { BsCheckLg } from 'react-icons/bs';

export interface DiscountTargetList {
  item: string;
  id?: number;
}
const DiscountTargetList = ({ item }: DiscountTargetList) => {
  item = item.slice(0, item.length - 2);

  const [checked, setChecked] = useState<boolean>(false);
  const checkedHandler = () => {
    setChecked(!checked);
  };

  return (
    <Container onClick={checkedHandler}>
      <Tag>{item}</Tag>
      {!checked ? (
        <div>
          <CheckIcon />
        </div>
      ) : (
        <Nothing />
      )}
    </Container>
  );
};

export default DiscountTargetList;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  height: 25px;
  &:hover {
    cursor: pointer;
  }
`;
const CheckIcon = styled(BsCheckLg)`
  color: ${({ theme }) => theme.color.purple_02};
  width: 30px;
`;
const Nothing = styled.div`
  width: 30px;
`;
const Tag = styled.div`
  width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.color.grey_01};
`;
