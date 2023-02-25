export const FETCH_DISCOUNT_INFO = 'FETCH_DISCOUNT_INFO';
export const APPLY_DISCOUNT = 'APPLY_DISCOUNT';
export const DELETE_DISCOUNT = 'DELETE_DISCOUNT';

export const fetchDiscountInfo = data => {
  return {
    type: 'FETCH_DISCOUNT_INFO',
    payload: data,
  };
};
export const applyDiscount = data => {
  return {
    type: 'APPLY_DISCOUNT',
    payload: data,
  };
};

export const deleteDiscount = data => {
  return {
    type: 'DELETE_DISCOUNT',
    payload: data,
  };
};
