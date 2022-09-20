import React from 'react';
import styled from 'styled-components';
import { BsCheckLg } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import TitleBar from '../header/TitleBar';
import Button from '../button/Button';
const PriceList = (props: any) => {
  console.log(props, 'props');
  //itmeList, modalHandler
  const { modalHandler } = props;

  return (
    <Container>
      <HeaderWrapper>
        <TitleBar text="시술메뉴" />
      </HeaderWrapper>
      <ItemWrapper>
        <ItemList>
          <Item>
            <ItemTag>
              <Tag>여성컷</Tag>
              <EditIcon />
            </ItemTag>
            <Price>15,000원</Price>
          </Item>
          <BsCheckLg />
        </ItemList>
        <ItemList>
          <Item>
            <ItemTag>
              <Tag>여성컷</Tag>
              <EditIcon />
            </ItemTag>
            <Price>15,000원</Price>
          </Item>
          <BsCheckLg />
        </ItemList>
        <ItemList>
          <Item>
            <ItemTag>
              <Tag>여성컷</Tag>
              <EditIcon />
            </ItemTag>
            <Price>15,000원</Price>
          </Item>
          <BsCheckLg />
        </ItemList>
        <ItemList>
          <Item>
            <ItemTag>
              <Tag>여성컷</Tag>
              <EditIcon />
            </ItemTag>
            <Price>15,000원</Price>
          </Item>
          <BsCheckLg />
        </ItemList>
        <ItemList>
          <Item>
            <ItemTag>
              <Tag>여성컷</Tag>
              <EditIcon />
            </ItemTag>
            <Price>15,000원</Price>
          </Item>
          <BsCheckLg />
        </ItemList>
        <ItemList>
          <Item>
            <ItemTag>
              <Tag>여성컷</Tag>
              <EditIcon />
            </ItemTag>
            <Price>15,000원</Price>
          </Item>
          <BsCheckLg />
        </ItemList>
        <ItemList>
          <Item>
            <ItemTag>
              <Tag>여성컷</Tag>
              <EditIcon />
            </ItemTag>
            <Price>15,000원</Price>
          </Item>
          <BsCheckLg />
        </ItemList>
        <ItemList>
          <Item>
            <ItemTag>
              <Tag>여성컷</Tag>
              <EditIcon />
            </ItemTag>
            <Price>15,000원</Price>
          </Item>
          <BsCheckLg />
        </ItemList>
        <ItemList>
          <Item>
            <ItemTag>
              <Tag>여성컷</Tag>
              <EditIcon />
            </ItemTag>
            <Price>15,000원</Price>
          </Item>
          <BsCheckLg />
        </ItemList>
        <ItemList>
          <Item>
            <ItemTag>
              <Tag>여성컷</Tag>
              <EditIcon />
            </ItemTag>
            <Price>15,000원</Price>
          </Item>
          <BsCheckLg />
        </ItemList>
        <ItemList>
          <Item>
            <ItemTag>
              <Tag>여성컷</Tag>
              <EditIcon />
            </ItemTag>
            <Price>15,000원</Price>
          </Item>
          <BsCheckLg />
        </ItemList>
        <ItemList>
          <Item>
            <ItemTag>
              <Tag>여성컷</Tag>
              <EditIcon />
            </ItemTag>
            <Price>15,000원</Price>
          </Item>
          <BsCheckLg />
        </ItemList>{' '}
        <ItemList>
          <Item>
            <ItemTag>
              <Tag>여성컷</Tag>
              <EditIcon />
            </ItemTag>
            <Price>15,000원</Price>
          </Item>
          <BsCheckLg />
        </ItemList>
        <ItemList>
          <Item>
            <ItemTag>
              <Tag>여성컷</Tag>
              <EditIcon />
            </ItemTag>
            <Price>15,000원</Price>
          </Item>
          <BsCheckLg />
        </ItemList>
        <ItemList>
          <Item>
            <ItemTag>
              <Tag>여성컷</Tag>
              <EditIcon />
            </ItemTag>
            <Price>15,000원</Price>
          </Item>
          <BsCheckLg />
        </ItemList>
        <ItemList>
          <Item>
            <ItemTag>
              <Tag>여성컷</Tag>
              <EditIcon />
            </ItemTag>
            <Price>15,000원</Price>
          </Item>
          <BsCheckLg />
        </ItemList>
      </ItemWrapper>
      <ButtonWrapper>
        <Button
          text="서비스를 선택하세요(여러 개 가능)"
          buttonName="완료"
          modalHandler={modalHandler}
        />
      </ButtonWrapper>
    </Container>
  );
};

export default PriceList;
const ItemWrapper = styled.div`
  padding-top: 90px;
  padding-bottom: 90px;
`;
const Container = styled.div`
  border: solid red 2px;
`;
const HeaderWrapper = styled.div`
  position: fixed;
  height: 80px;
  width: 478px;
  background: #fff;
  z-index: 100;
`;
const ButtonWrapper = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  height: 140px;
  background: #fff;
  width: ${({ theme }) => theme.deviceSizes.mobile};
`;

const ItemList = styled.div`
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
