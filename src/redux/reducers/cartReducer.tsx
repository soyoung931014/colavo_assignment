import { AddCheckItem } from '@src/types/itemList';
import {
  cartAction,
  DELETE_CART,
  SAVE_CART,
  UPDATE_CART,
} from '../action/cartAction';

const initialState: AddCheckItem[] = [];

const cartReducer = (state = initialState, action: cartAction) => {
  switch (action.type) {
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
