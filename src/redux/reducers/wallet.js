import { SET_CURRENCIES, SET_EXPENSES, UPDATE_TOTAL_SPENT } from '../actions';

const INITIAL_STATE = {
  totalSpenses: 0,
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case SET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case UPDATE_TOTAL_SPENT:
    return {
      ...state,
      totalSpenses: state.totalSpenses + action.totalSpenses,
    };
  default:
    return state;
  }
};

export default wallet;
