import { AddCheckDiscount } from '@src/types/itemList';
import { FETCH_DISCOUNT_INFO } from '../action/discountAction';

const initialState: AddCheckDiscount[] = [];

const discountReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DISCOUNT_INFO:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
export default discountReducer;
