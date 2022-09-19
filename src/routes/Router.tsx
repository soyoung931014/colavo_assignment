import React from 'react';
import { Route, Routes } from 'react-router';

import MobileLayout from '@components/layout/MobileLayout';
import Checkout from '@pages/Checkout';

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
