export const LOGIN_USER = 'LOGIN_USER';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const SET_EXPENSES = 'SET_EXPENSES';
export const UPDATE_TOTAL_SPENT = 'UPDATE_TOTAL_SPENT';

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

export const updateTotalSpent = (totalSpenses) => ({
  type: UPDATE_TOTAL_SPENT,
  totalSpenses,
});
