import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import {
  renderWithRedux,
  renderWithRouterAndRedux,
} from '../../tests/helpers/renderWith';
import Login from '../Login';
import App from '../../App';

describe('Tests of Login component', () => {
  const validEmail = 'test@work.com';
  const vallidPassword = 'validPassword';
  const invalidEmail = '!!!';
  const invallidPassword = '!!!';

  it('Should have the correct pathname:', () => {
    renderWithRedux(<Login />);
    const expectedPathName = window.location.pathname;
    expect(expectedPathName).toBe('/');
  });

  it('Should only enable login button with a valid email and password:', () => {
    renderWithRedux(<Login />);
    const loginInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByRole('button');

    expect(loginButton).toBeDisabled();
    userEvent.type(loginInput, invalidEmail);
    userEvent.type(passwordInput, invallidPassword);
    expect(loginButton).toBeDisabled();
    userEvent.type(loginInput, validEmail);
    userEvent.type(passwordInput, vallidPassword);
    expect(loginButton).toBeEnabled();
    userEvent.type(loginInput, invalidEmail);
    expect(loginButton).toBeDisabled();
  });

  it('', () => {
    renderWithRouterAndRedux(<App />);
    const expectedPathName = window.location.pathname;
    const loginInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByRole('button');

    userEvent.type(loginInput, validEmail);
    userEvent.type(passwordInput, vallidPassword);
    userEvent.click(loginButton);

    expect(expectedPathName).toBe('/');
  });
});
