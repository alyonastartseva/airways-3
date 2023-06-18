import { describe, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import * as useAuth from '@/hooks/useAuth';

import { Header } from './index';

describe('Header', () => {
  it('Header renders correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <Header />
      </Router>
    );

    const logo = screen.getByTestId('websiteLogo');
    const signInBtn = screen.getByText('Вход');
    const toMainPageBtn = screen.getByText('На главную');
    expect(logo).toBeInTheDocument();
    expect(signInBtn).toBeInTheDocument();
    expect(toMainPageBtn).toBeInTheDocument();
  });
  it('Header redirect correctly', async () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <Header />
      </Router>
    );

    const signInBtn = screen.getByText('Вход');
    const toMainPageBtn = screen.getByText('На главную');

    expect(signInBtn).toBeInTheDocument();
    expect(toMainPageBtn).toBeInTheDocument();

    await userEvent.click(signInBtn);
    expect(history.location.pathname === '/admin').toBeTruthy();

    await userEvent.click(toMainPageBtn);
    expect(
      history.location.pathname === '/' ||
        history.location.pathname === '/search'
    ).toBeTruthy();
  });
  //убрать скип, когда появится функция получения токена пользователя
  it.skip('UserHeader renders correctly', () => {
    const history = createMemoryHistory();

    const spy = vi.spyOn(useAuth, 'useAuth');
    spy.mockReturnValue({ isAdmin: true, setIsAdmin: () => {} });

    render(
      <Router location={history.location} navigator={history}>
        <Header />
      </Router>
    );

    const logo = screen.getByTestId('websiteLogo');
    const userHeader = screen.getByTestId('userHeader');

    expect(logo).toBeInTheDocument();
    expect(userHeader).toBeInTheDocument();
  });
  it('AdminHeader renders correctly', () => {
    const history = createMemoryHistory();

    const spy = vi.spyOn(useAuth, 'useAuth');
    spy.mockReturnValue({ isAdmin: true, setIsAdmin: () => {} });

    render(
      <Router location={history.location} navigator={history}>
        <Header />
      </Router>
    );

    const logo = screen.getByTestId('websiteLogo');
    const adminHeader = screen.getByTestId('adminHeader');

    expect(logo).toBeInTheDocument();
    expect(adminHeader).toBeInTheDocument();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
});
