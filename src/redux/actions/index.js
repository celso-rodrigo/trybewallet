export const LOGIN_USER = 'LOGIN_USER';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const SET_EXPENSES = 'SET_EXPENSES';
export const UPDATE_TOTAL_SPENT = 'UPDATE_TOTAL_SPENT';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
// export const EDIT_EXPENSE = 'EDIT_EXPENSE';
// export const UPDATE_EDITED_EXPENSE = 'UPDATE_EDITED_EXPENSE';

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

export const removeExpense = (id, removeAmount) => ({
  type: REMOVE_EXPENSE,
  id,
  removeAmount,
});

// export const editExpense = (idToEdit) => ({
//   type: EDIT_EXPENSE,
//   idToEdit,
// });

// export const updateEditedExpenses = (expenses, debit) => ({
//   type: UPDATE_EDITED_EXPENSE,
//   expenses,
//   debit,
// });
