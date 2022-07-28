export const LOGIN_USER = 'LOGIN_USER';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const SET_EXPENSES = 'SET_EXPENSES';

export const LoginUser = (email) => ({
  type: LOGIN_USER,
  email,
});

export const getCurrencies = (currencies) => ({
  type: SET_CURRENCIES,
  currencies,
});

export const setExpenses = (expenses) => ({
  type: SET_EXPENSES,
  expenses,
});
