import React from 'react';
import { screen } from '@testing-library/react';
import {
  renderWithRedux,
  renderWithRouterAndRedux,
} from '../tests/helpers/renderWith';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import Header from '../components/Header';
import mockData from './helpers/mockData';

describe('Tests of Wallet component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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

  it('Should display the user email and total expenses when load:', () => {
    renderWithRedux(<Header />, {
      initialState: {
        user : {
          email: 'teste@teste.com',
        },
        wallet: {
          totalSpenses: 0,
        },
      }
    });

    expect(screen.getByText('teste@teste.com')).toBeDefined();
    expect(screen.getByText('0.00')).toBeDefined();

  });

  it('Should display typed info after pressing the button:', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData)
      }))

    renderWithRedux(<Wallet />);
    const submitButton = screen.getByRole('button');
    const valueInput = screen.getByTestId('value-input');
    const descInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    userEvent.selectOptions(tagInput, 'Lazer'); 
    userEvent.selectOptions(methodInput, 'Cartão de crédito'); 
    userEvent.type(valueInput, '10');
    userEvent.type(descInput, 'Exemplo de descrição');
    userEvent.click(submitButton);
  
    const expectedUrl = 'https://economia.awesomeapi.com.br/json/all';
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(expectedUrl);
    await screen.findByText('Exemplo de descrição');
    await screen.findAllByText('Lazer');
    await screen.findAllByText('Cartão de crédito');
    await screen.findByText('10.00');
  });

    it('Should delete an expense after clicking the delete button:', async () => {
    global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData)
    }))

    renderWithRedux(<Wallet />);
    const submitButton = screen.getByRole('button');
    const descInput = screen.getByTestId('description-input');

    userEvent.type(descInput, 'Exemplo de descrição');
    expect(screen.queryByRole('button', { name: 'Editar' })).toBe(null);
    expect(screen.queryByRole('button', { name: 'Excluir' })).toBe(null);
    userEvent.click(submitButton);
    expect(fetch).toHaveBeenCalled();
    await screen.findByText('Exemplo de descrição');
    expect(screen.queryByRole('button', { name: 'Excluir' })).toBeDefined();
    const deleteButton = screen.queryByRole('button', { name: 'Excluir' });
    expect(deleteButton).toBeDefined();
    userEvent.click(deleteButton);
    expect(screen.queryByRole('button', { name: 'Editar' })).toBe(null);
    expect(screen.queryByRole('button', { name: 'Excluir' })).toBe(null);
  });
});
