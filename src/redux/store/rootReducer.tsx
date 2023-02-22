import { combineReducers } from 'redux';
import cartReducer from '../reducers/cartReducer';
import CurrencyCodeReducer from '../reducers/currencyCodeReducer';
import discountReducer from '../reducers/discountReducer';

const rootReducer = combineReducers({
  selectedCart: cartReducer,
  discount: discountReducer,
  currency_code: CurrencyCodeReducer,
});

export default rootReducer;
