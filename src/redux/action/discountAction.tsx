export const FETCH_DISCOUNT_INFO = 'FETCH_DISCOUNT_INFO';

export const fetchDiscountInfo = data => {
  return {
    type: 'FETCH_DISCOUNT_INFO',
    payload: data,
  };
};
