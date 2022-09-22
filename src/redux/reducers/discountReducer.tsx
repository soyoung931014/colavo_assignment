import { AddCheckDiscount } from '@src/types/itemList';
import { APPLY_DISCOUNT, FETCH_DISCOUNT_INFO } from '../action/discountAction';

const initialState: AddCheckDiscount[] = [];

const discountReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DISCOUNT_INFO:
      return [...state, ...action.payload];
    case APPLY_DISCOUNT:
      return [...action.payload];
    default:
      return state;
  }
};
export default discountReducer;
