import { AddCheckItem } from '@src/types/itemList';
import { FETCH_CART_INFO, SAVE_CART } from '../action/cartAction';

const initialState: AddCheckItem[] = [];

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART_INFO:
      return [...state, ...action.payload];
    case SAVE_CART:
      return [...action.payload];

    default:
      return state;
  }
};
export default cartReducer;
