export const FETCH_CART_INFO = 'FETCH_CART_INFO';
export const DELETE_CART = 'DELETE_CART';

export const fetchCartInfo = data => {
  return {
    type: 'FETCH_CART_INFO',
    payload: data,
  };
};

export const deleteCart = () => {
  return {
    type: 'DELETE_CART',
  };
};
