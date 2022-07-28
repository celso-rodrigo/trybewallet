import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { userEmail } = this.props;

    return (
      <header>
        <div>LOGO</div>
        <div>
          <p data-testid="email-field">{userEmail}</p>
          <p>
            Total:
            <span data-testid="total-field">0</span>
            <span data-testid="header-currency-field">(BRL)</span>
          </p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

export default connect(mapStateToProps)(Header);
