import React, { useState } from 'react';
import styled from 'styled-components';
import { BsCheckLg } from 'react-icons/bs';
const DiscountTargetList = ({ item, id }: any) => {
  //console.log(item.id, 'id');
  console.log(item, id);

  const [checked, setChecked] = useState<boolean>(false);
  const checkedHandler = () => {
    setChecked(!checked);
  };

  return (
    <Container onClick={checkedHandler}>
      <div>{item}</div>
      {!checked ? (
        <div>
          <CheckIcon />
        </div>
      ) : null}
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
`;
