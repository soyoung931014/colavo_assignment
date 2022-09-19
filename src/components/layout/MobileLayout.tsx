import React from 'react';
import { Outlet } from 'react-router';
import styled from 'styled-components';

export default function MobileLayout() {
  return (
    <Container>
      <Layout>
        <Outlet />
      </Layout>
    </Container>
  );
}
const Container = styled.div`
  background-color: #ccc;
`;
const Layout = styled.div`
  width: 480px;
  height: 100vh;
  background-color: white;
  border: 1px solid #ccc;
  margin: 0 auto;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
