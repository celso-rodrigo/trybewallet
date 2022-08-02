import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/header.css';
import logo from '../images/logo.png';

class Header extends Component {
  render() {
    const { userEmail, totalSpent } = this.props;
    let userEmailDisplay = userEmail;
    if (!userEmail) userEmailDisplay = 'sampleEmail@mail.com';

    return (
      <header className="header">
        <div className="logo">
          <img src={ logo } alt="Logo do site." />
          <h1 className="login-title">TrybeWallet</h1>
        </div>
        <div className="total-text">
          <p>
            {'Total: '}
            <span data-testid="total-field" className="total-value">
              {/* O display sempre mostra a soma de todas as despesas, mas
               apenas com dois números após o ponto. Em caso de remoção de uma
               dispesa muito grande podem haver pequenas inconsistencias e
               fazer com que o resultado seja, por exemplo, "-0.00001" e
               isso resultara em "-0.00". Para corrigir esse problema qualquer
              valor menor 0.00 será arredondado para 0.00. */}
              {totalSpent <= 0.00
                ? (0).toFixed(2)
                : totalSpent.toFixed(2)}
            </span>
            <span
              data-testid="header-currency-field"
              className="total-currency"
            >
              {' (BRL)'}
            </span>
          </p>
        </div>
        <p data-testid="email-field" className="header-email">{userEmailDisplay}</p>
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
