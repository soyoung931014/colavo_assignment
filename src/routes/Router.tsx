import MobileLayout from '@src/components/layout/MobileLayout';
import Checkout from '@src/pages/Checkout';
import React from 'react';
import { Route, Routes } from 'react-router';

function Router() {
  return (
    <Routes>
      <Route element={<MobileLayout />}>
        <Route path="/" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default Router;
