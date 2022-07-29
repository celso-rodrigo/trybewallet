import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { userEmail, totalSpent } = this.props;

    return (
      <header>
        <div>LOGO</div>
        <div>
          <p data-testid="email-field">{userEmail}</p>
          <p>
            Total:
            <span data-testid="total-field">
              {/* O display sempre mostra a soma de todas as despesas, mas
               apenas com dois números após o ponto. Em caso de remoção de uma
               dispesa muito grande podem haver pequenas inconsistencias e
               fazer com que o resultado seja, por exemplo, "-0.00001" e
               isso resultara em "-0.00". Para corrigir esse problema qualquer
               valor menor 0.00 será arredondado para 0.00. */}
              {totalSpent < 0.00
                ? (0).toFixed(2)
                : totalSpent.toFixed(2)}
            </span>
            <span data-testid="header-currency-field">(BRL)</span>
          </p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  totalSpent: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  totalSpent: state.wallet.totalSpenses,
});

export default connect(mapStateToProps)(Header);
