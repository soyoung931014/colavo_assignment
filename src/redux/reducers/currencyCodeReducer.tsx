import {
  fetchCurrencyCode,
  FETCH_CURRENCY_CODE,
} from '../action/currencyCodeAction';

const initialState = '';

const CurrencyCodeReducer = (
  state = initialState,
  action: fetchCurrencyCode,
) => {
  switch (action.type) {
    case FETCH_CURRENCY_CODE:
      return action.payload;
    default:
      return state;
  }
};
export default CurrencyCodeReducer;
