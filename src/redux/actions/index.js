export const LOGIN_USER = 'LOGIN_USER';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export const LoginUser = (email) => ({
  type: LOGIN_USER,
  email,
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});
