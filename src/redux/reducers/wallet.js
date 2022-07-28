import { SET_CURRENCIES, SET_EXPENSES } from '../actions';

const INITIAL_STATE = () => ({
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
});

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
      expenses: state.expenses ? [action.expenses, ...state.expenses] : [action.expenses],
    };
  default:
    return state;
  }
};

export default wallet;
