import { AddCheckItem } from '@src/types/itemList';
import {
  DELETE_CART,
  FETCH_CART_INFO,
  SAVE_CART,
  UPDATE_CART,
} from '../action/cartAction';

const initialState: AddCheckItem[] = [];

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART_INFO:
      return [...state, ...action.payload];
    case SAVE_CART:
      return [...state, ...action.payload];
    case UPDATE_CART:
      return [...action.payload];
    case DELETE_CART:
      return [...action.payload];
    default:
      return state;
  }
};
export default cartReducer;
