import { AddCheckDiscount } from '@src/types/itemList';

export const FETCH_DISCOUNT_INFO = 'FETCH_DISCOUNT_INFO' as const;
export const APPLY_DISCOUNT = 'APPLY_DISCOUNT' as const;
export const DELETE_DISCOUNT = 'DELETE_DISCOUNT' as const;

export const fetchDiscountInfo = (data: AddCheckDiscount[]) => {
  return {
    type: 'FETCH_DISCOUNT_INFO',
    payload: data,
  };
};
export const applyDiscount = (data: AddCheckDiscount[]) => {
  return {
    type: 'APPLY_DISCOUNT',
    payload: data,
  };
};

export const deleteDiscount = (data: AddCheckDiscount[]) => {
  return {
    type: 'DELETE_DISCOUNT',
    payload: data,
  };
};

export type discountAction =
  | ReturnType<typeof fetchDiscountInfo>
  | ReturnType<typeof applyDiscount>
  | ReturnType<typeof deleteDiscount>;
