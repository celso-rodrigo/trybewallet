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
              {totalSpent.toFixed(2)}
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
