import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LoginUser } from '../redux/actions';
import '../styles/general.css';
import '../styles/login.css';
import logo from '../images/logo.png';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      invalidLogin: true,
      invalidPassword: true,
    };
  }

  checkLogin = ({ target: { value } }) => {
    // Qualquer palavra + "@" + Qualquer palavra + "." + Qualquer 2 ou 3 letras.
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const invalid = value.match(pattern) === null;
    this.setState({
      email: value,
      invalidLogin: invalid,
    });
  };

  checkPassword = ({ target: { value } }) => {
    const minLength = 6;
    const maxLength = 40;
    const invalidPasswordLength = !(value.length >= minLength
      && value.length <= maxLength);
    this.setState({
      invalidPassword: invalidPasswordLength,
    });
  };

  loginSite = () => {
    const { dispatchEmail, history } = this.props;
    const { email } = this.state;
    dispatchEmail(email);
    history.push('/carteira');
  }

  render() {
    const { invalidLogin, invalidPassword } = this.state;

    return (
      <div className="form-container">
        <img src={ logo } alt="Logo do site." className="logo" />
        <h1 className="login-title">TrybeWallet</h1>
        <form className="login-form">
          <input
            type="email"
            placeholder="Email"
            data-testid="email-input"
            onChange={ this.checkLogin }
            maxLength="30"
          />

          <input
            type="password"
            placeholder="Password"
            data-testid="password-input"
            onChange={ this.checkPassword }
            maxLength="30"
          />

          <button
            type="button"
            disabled={ invalidLogin || invalidPassword }
            onClick={ this.loginSite }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatchEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (email) => dispatch(LoginUser(email)),
});

export default connect(null, mapDispatchToProps)(Login);
