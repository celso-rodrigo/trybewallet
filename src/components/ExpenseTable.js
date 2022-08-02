import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense } from '../redux/actions';

class ExpenseTable extends Component {
  render() {
    const { expense, deleteExpense } = this.props;
    const usedExchange = expense.exchangeRates[expense.currency].name;
    const usedExchangeValue = Number(expense.exchangeRates[expense.currency].ask);
    const convertedValue = Number(expense.value * usedExchangeValue);
    const expenseValue = Number(expense.value);

    return (
      <tr>
        <td>
          <p>{expense.description}</p>
        </td>
        <td>
          <p>{expense.tag}</p>
        </td>
        <td>
          <p>{expense.method}</p>
        </td>
        <td>
          <p>{expenseValue.toFixed(2)}</p>
        </td>
        <td>
          <p>{usedExchange}</p>
        </td>
        <td>
          <p>{usedExchangeValue.toFixed(2)}</p>
        </td>
        <td>
          <p>{convertedValue.toFixed(2)}</p>
        </td>
        <td>Real</td>
        <td>
          <div className="button-container">
            <button
              type="button"
              data-testid="edit-btn"
              className="edit-button"
              // onClick={ () => edditingExpense(expense.id) }
            >
              Editar
            </button>
            <button
              type="button"
              data-testid="delete-btn"
              className="delete-button"
              onClick={ () => deleteExpense(expense.id, convertedValue) }
            >
              Excluir
            </button>
          </div>
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
  // edditingExpense: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id, removeAmount) => dispatch(removeExpense(id, removeAmount)),
  // edditingExpense: (idToEdit) => dispatch(editExpense(idToEdit)),
});

export default connect(null, mapDispatchToProps)(ExpenseTable);
