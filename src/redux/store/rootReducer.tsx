import { combineReducers } from 'redux';
import cartReducer from '../reducers/cartReducer';
import discountReducer from '../reducers/discountReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  discount: discountReducer,
});

export default rootReducer;
