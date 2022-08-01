import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense, editExpense } from '../redux/actions';

class ExpenseTable extends Component {
  render() {
    const { expense, deleteExpense, edditingExpense } = this.props;
    const usedExchange = expense.exchangeRates[expense.currency].name;
    const usedExchangeValue = Number(expense.exchangeRates[expense.currency].ask);
    const convertedValue = Number(expense.value * usedExchangeValue);
    const expenseValue = Number(expense.value);

    return (
      <tr>
        <td>{expense.description}</td>
        <td>{expense.tag}</td>
        <td>{expense.method}</td>
        <td>{expenseValue.toFixed(2)}</td>
        <td>{usedExchange}</td>
        <td>{usedExchangeValue.toFixed(2)}</td>
        <td>{convertedValue.toFixed(2)}</td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="edit-btn"
            onClick={ () => edditingExpense(expense.id) }
          >
            Editar
          </button>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => deleteExpense(expense.id, convertedValue) }
          >
            Excluir
          </button>
        </td>
      </tr>
    );
  }
}

ExpenseTable.propTypes = {
  expense: PropTypes.shape({
    currency: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    exchangeRates: PropTypes.objectOf(
      PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
    ).isRequired,
    id: PropTypes.number.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  edditingExpense: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id, removeAmount) => dispatch(removeExpense(id, removeAmount)),
  edditingExpense: (idToEdit) => dispatch(editExpense(idToEdit)),
});

export default connect(null, mapDispatchToProps)(ExpenseTable);
