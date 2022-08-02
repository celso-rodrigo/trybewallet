import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpenseTable from './ExpenseTable';
import '../styles/table.css';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (

      <table className="expenses-table">
        <thead>
          <tr>
            <th>
              <p>Descrição:</p>
            </th>
            <th>
              <p>Tag:</p>
            </th>
            <th>
              <p>Método de pagamento:</p>
            </th>
            <th>
              <p>Valor:</p>
            </th>
            <th>
              <p>Moeda:</p>
            </th>
            <th>
              <p>Câmbio utilizado:</p>
            </th>
            <th>
              <p>Valor convertido:</p>
            </th>
            <th>
              <p>Moeda de conversão:</p>
            </th>
            <th>
              <p>Editar/Excluir</p>
            </th>
          </tr>
        </thead>
        <tbody>

          {expenses.map((expense) => (
            <ExpenseTable expense={ expense } key={ expense.id } />
          ))}
        </tbody>
        {/* { editing
          ? <h1>Editando...</h1>
          : (
            <>
            </>
          )} */}
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  // editing: PropTypes.bool.isRequired,
};

Table.defaultProps = {
  expenses: [],
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editing: state.wallet.editor,
});

export default connect(mapStateToProps)(Table);
