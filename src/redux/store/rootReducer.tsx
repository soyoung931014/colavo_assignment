import { combineReducers } from '@reduxjs/toolkit';

import cartReducer from '../reducers/cartReducer';
import CurrencyCodeReducer from '../reducers/currencyCodeReducer';
import discountReducer from '../reducers/discountReducer';

export const rootReducer = combineReducers({
  selectedCart: cartReducer,
  selectedDiscount: discountReducer,
  currency_code: CurrencyCodeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
