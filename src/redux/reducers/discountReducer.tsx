import { AddCheckDiscount } from '@src/types/itemList';
import { APPLY_DISCOUNT, FETCH_DISCOUNT_INFO } from '../action/discountAction';

const initialState: AddCheckDiscount[] = [];

const discountReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DISCOUNT_INFO: // 장바구니 불러오는 액션인데 필요한가 싶다.
      return [...state, ...action.payload];
    case APPLY_DISCOUNT: // 장바구니 담는 액션
      return [...state, ...action.payload];
    default:
      return state;
  }
};
export default discountReducer;
