import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencies, setExpenses, updateTotalSpent } from '../redux/actions';

const alimetacao = 'Alimentação';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimetacao,
      description: '',
      id: 0,
      exchangeRates: {},
    };
  }

  componentDidMount() {
    this.loadCurrencies();
  }

  fetchCurrencies = async () => {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const fetchApi = await fetch(url);
    const response = await fetchApi.json();
    const currencyToRemove = 'USDT';
    delete response[currencyToRemove];
    return response;
  };

  loadCurrencies = async () => {
    const { dispatchCurrencies } = this.props;
    const response = await this.fetchCurrencies();
    const currencies = Object.keys(response);
    dispatchCurrencies(currencies);
  };

  handleInputs = (input, target) => {
    const inputValue = target.value;
    this.setState({
      [input]: inputValue,
    });
  }

  clearState = async () => {
    this.setState((prev) => ({
      id: prev.id + 1,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimetacao,
      description: '',
    }));
  };

  getExchangeRates = async () => {
    const exchangeRates = await this.fetchCurrencies();
    this.setState({ exchangeRates });
  };

  calculateTotalValue = () => {
    const { dispatchTotal } = this.props;
    const { value, currency, exchangeRates } = this.state;
    const multiplier = exchangeRates[currency].ask;
    const total = value * multiplier;
    dispatchTotal(total);
  }

  updateExpenses = async () => {
    const { dispatchExpenses } = this.props;
    await this.getExchangeRates();
    dispatchExpenses(this.state);
    this.calculateTotalValue();
    await this.clearState();
  };

  render() {
    const { allCurrencies, editing } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    return (
      <form>
        <label htmlFor="value-input">
          <p>Valor</p>
          <input
            type="number"
            id="value-input"
            value={ value }
            data-testid="value-input"
            onChange={
              ({ target }) => this.handleInputs('value', target)
            }
          />
        </label>

        <label htmlFor="description-input">
          <p>Descrição</p>
          <input
            type="text"
            id="description-input"
            value={ description }
            data-testid="description-input"
            onChange={
              ({ target }) => this.handleInputs('description', target)
            }
          />
        </label>

        <label htmlFor="currency-select">
          <p>Moeda</p>
          <select
            type="number"
            id="currency-select"
            name="currency-select"
            value={ currency }
            data-testid="currency-input"
            onChange={
              ({ target }) => this.handleInputs('currency', target)
            }
          >
            {allCurrencies
            && allCurrencies.map((currCurrency) => (
              <option
                name="currency-select"
                key={ `${currCurrency}-urrency-select` }
              >
                {currCurrency}
              </option>))}
          </select>
        </label>

        <label htmlFor="method-select">
          <p>Método de pagamento</p>
          <select
            type="number"
            id="method-select"
            name="method-select"
            value={ method }
            data-testid="method-input"
            onChange={
              ({ target }) => this.handleInputs('method', target)
            }
          >
            <option name="method-select">Dinheiro</option>
            <option name="method-select">Cartão de crédito</option>
            <option name="method-select">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag-select">
          <p>Categoria</p>
          <select
            type="number"
            id="tag-select"
            name="tag-select"
            value={ tag }
            data-testid="tag-input"
            onChange={
              ({ target }) => this.handleInputs('tag', target)
            }
          >
            <option name="tag-select">{alimetacao}</option>
            <option name="tag-select">Lazer</option>
            <option name="tag-select">Trabalho</option>
            <option name="tag-select">Transporte</option>
            <option name="tag-select">Saúde</option>
          </select>
        </label>

        {editing
          ? (
            <button
              type="button"
              data-testid="edit-btn"
              // onClick={ () => this.editExpense(editingId) }
            >
              Editar despesa
            </button>)

          : (
            <button
              type="button"
              onClick={ this.updateExpenses }
            >
              Adicionar despesa
            </button>
          )}
      </form>

    );
  }
}

WalletForm.propTypes = {
  dispatchCurrencies: PropTypes.func.isRequired,
  dispatchExpenses: PropTypes.func.isRequired,
  dispatchTotal: PropTypes.func.isRequired,
  allCurrencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  editing: PropTypes.bool.isRequired,
  // editingId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  allCurrencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencies: (currencies) => dispatch(getCurrencies(currencies)),
  dispatchExpenses: (expenses) => dispatch(setExpenses(expenses)),
  dispatchTotal: (totalSpenses) => dispatch(updateTotalSpent(totalSpenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
