export const FETCH_CURRENCY_CODE = 'FETCH_CURRENCY_CODE' as const;

export const fetchCurrencyCode = (data: string) => {
  return {
    type: 'FETCH_CURRENCY_CODE',
    payload: data,
  };
};

export type fetchCurrencyCode = ReturnType<typeof fetchCurrencyCode>;
