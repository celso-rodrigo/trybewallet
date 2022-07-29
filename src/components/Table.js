import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpenseTable from './ExpenseTable';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição:</th>
            <th>Tag:</th>
            <th>Método de pagamento:</th>
            <th>Valor:</th>
            <th>Moeda:</th>
            <th>Câmbio utilizado:</th>
            <th>Valor convertido:</th>
            <th>Moeda de conversão:</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <ExpenseTable expense={ expense } key={ expense.id } />
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.string),
};

Table.defaultProps = {
  expenses: {},
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
