import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from '@styles/theme';
import GlobalStyle from '@styles/GlobalStyle';
import Router from '@routes/Router';
import axios from 'axios';
import { Discount, fetchProps, HairList, Item } from './types/itemList';
import { connect } from 'react-redux';
import { fetchCartInfo } from './redux/action/cartAction';
import { fetchDiscountInfo } from './redux/action/discountAction';

const App = ({ fetchCartInfo, fetchDiscountInfo }: fetchProps) => {
  console.log(fetchCartInfo);
  useEffect(() => {
    fetchPriceList();
  }, []);

  const fetchPriceList = async () => {
    try {
      await axios
        .get(
          'https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData',
        )
        .then(res => {
          const { items, discounts, currency_code }: HairList = res.data;
          console.log(res.data, 'resdata');
          const itemArray = Object.values(items);
          const discountArray = Object.values(discounts);
          const newItemArray = addId(itemArray);
          const newDiscountArray = addId(discountArray);
          fetchCartInfo(newItemArray);
          fetchDiscountInfo(newDiscountArray);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const addId = (array: Item[] | Discount[]) => {
    return array.map((el, idx) => {
      return { id: idx, check: false, ...el };
    });
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    fetchCartInfo: newItemArray => dispatch(fetchCartInfo(newItemArray)),
    fetchDiscountInfo: newDiscountArray =>
      dispatch(fetchDiscountInfo(newDiscountArray)),
  };
};

export default connect(null, mapDispatchToProps)(App);
