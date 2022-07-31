import React from 'react';
import { screen } from '@testing-library/react';
import {
  renderWithRedux,
  renderWithRouterAndRedux,
} from '../../tests/helpers/renderWith';
import Wallet from '../Wallet';

describe('Tests of Wallet component', () => {
  it('Should display the user email and totalSpenses', () => {
    const expectedEmail = 'teste@work.com';
    renderWithRouterAndRedux(<Wallet />, {
      initialPath: '/carteira',
      initialState: {
        user: { email: expectedEmail },
        wallet: { totalSpenses: 0 },
      },
    });

    const displayEmail = screen.getByText(expectedEmail);
    const displayMoney = screen.getByText('0.00');

    expect(displayEmail && displayMoney).toBeDefined();
  });

  it('Should display a table with all the spenses info:', () => {
    renderWithRedux(<Wallet />);
    expect(screen.getByRole('table')).toBeDefined();
    const headers = [
      'Descrição:',
      'Tag:',
      'Método de pagamento:',
      'Valor:',
      'Moeda:',
      'Câmbio utilizado:',
      'Valor convertido:',
      'Moeda de conversão:',
      'Editar/Excluir',
    ];

    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeDefined();
    });
  });
});
