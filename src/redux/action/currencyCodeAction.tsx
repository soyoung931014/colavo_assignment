export const FETCH_CURRENCY_CODE = 'FETCH_CURRENCY_CODE';

export const fetchCurrencyCode = data => {
  return {
    type: 'FETCH_CURRENCY_CODE',
    payload: data,
  };
};
