import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    this.fetchCurrencies();
  }

  fetchCurrencies = async () => {
    const { dispatchCurrencies } = this.props;
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const fetchApi = await fetch(url);
    const response = await fetchApi.json();
    const currencies = Object.keys(response).filter(
      (currency) => currency !== 'USDT',
    );
    dispatchCurrencies(currencies);
  };

  render() {
    const { allCurrencies } = this.props;

    return (
      <form>
        <label htmlFor="value-input">
          <p>Valor</p>
          <input type="number" id="value-input" data-testid="value-input" />
        </label>

        <label htmlFor="description-input">
          <p>Descrição</p>
          <input
            type="text"
            id="description-input"
            data-testid="description-input"
          />
        </label>

        <label htmlFor="currency-select">
          <p>Moeda</p>
          <select
            type="number"
            id="currency-select"
            name="currency-select"
            data-testid="currency-input"
          >
            {allCurrencies
            && allCurrencies.map((currency) => (
              <option
                name="currency-select"
                key={ `${currency}-urrency-select` }
              >
                {currency}
              </option>))}
          </select>
        </label>

        <label htmlFor="method-select">
          <p>Método de pagamento</p>
          <select
            type="number"
            id="method-select"
            name="method-select"
            data-testid="method-input"
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
            data-testid="tag-input"
          >
            <option name="tag-select">Alimentação</option>
            <option name="tag-select">Lazer</option>
            <option name="tag-select">Trabalho</option>
            <option name="tag-select">Transporte</option>
            <option name="tag-select">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatchCurrencies: PropTypes.func.isRequired,
  allCurrencies: PropTypes.arrayOf(PropTypes.string.isRequired),
};

WalletForm.defaultProps = {
  allCurrencies: [],
};

const mapStateToProps = (state) => ({
  allCurrencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencies: (currencies) => dispatch(getCurrencies(currencies)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
