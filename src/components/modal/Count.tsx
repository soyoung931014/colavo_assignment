import React, { useState } from 'react';
import styled from 'styled-components';

export interface CountProps {
  name: string;
  count: number;
  id?: number;
}
const Count = ({ name, count, id }: CountProps) => {
  const [total, setTotal] = useState(count);
  const handleChangeCount = e => {
    setTotal(e.target.value);
  };
  return (
    <>
      <BackGround>
        <Container>
          <div>
            <Div>
              <Writing onChange={handleChangeCount} value={total}></Writing>
              <Text>갯수 입력</Text>
            </Div>
            <ButtonWrapper>
              <Div>
                <Button Delete onClick={() => console.log('삭제')}>
                  삭제
                </Button>
              </Div>
              <Div>
                <Button onClick={() => console.log('확인')}>확인</Button>
              </Div>
            </ButtonWrapper>
          </div>
        </Container>
      </BackGround>
    </>
  );
};

export default Count;

const ButtonWrapper = styled.div`
  display: flex;
`;
const Text = styled.div`
  color: ${({ theme }) => theme.color.grey_02};
  font-size: 14px;
  margin-left: 75px;
  margin-top: 10px;
`;
const Div = styled.div``;
const BackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(238, 238, 238, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  width: 300px;
  height: 200px;
  background: #ffffff;
  box-shadow: 0px 4px 15px 3px rgba(220, 220, 220, 0.5);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Writing = styled.input`
  border-bottom: 2px solid ${({ theme }) => theme.color.grey_02};
  margin-left: 30px;
  color: ${({ theme }) => theme.color.grey_02};
`;

const Button = styled.button<{ Delete?: boolean }>`
  color: ${({ theme }) => theme.color.purple_02};
  font-size: 20px;
  font-weight: 500;
  border-radius: 5px;
  padding: 8px 35px;
  position: relative;
  top: 30px;
  margin-right: ${props => (props.Delete ? '10px' : '0')};
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.color.purple_02};
    color: ${({ theme }) => theme.color.grey_02};
  }
`;
