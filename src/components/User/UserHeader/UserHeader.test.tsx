import { describe, it } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { UserHeader } from './index';

describe('UserHeader test', () => {
  it('UserHeader renders correctly', async () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <UserHeader />
      </Router>
    );
    const profileIcon = screen.getByTestId('profileIcon');
    const userName = screen.getByTestId('userName');
    const menuBtn = screen.getByTestId('menuBtn');
    expect(profileIcon).toBeInTheDocument();
    expect(userName).toBeInTheDocument();
    expect(menuBtn).toBeInTheDocument();

    await userEvent.click(menuBtn);
    expect(screen.getAllByText('Option placeholder')).toHaveLength(2);
    expect(screen.getByText('Выход')).toBeInTheDocument();
  });
  it('exit button returns to search page', async () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <UserHeader />
      </Router>
    );

    await userEvent.click(screen.getByTestId('menuBtn'));
    await userEvent.click(screen.getByText('Выход'));
    const pathname = history.location.pathname;
    expect(pathname === '/' || pathname === '/search').toBeTruthy();
  });
  //Изменить ссылку на страницу профиля пользователя, когда та будет доступна
  it('User profile button redirect to user profile', async () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <UserHeader />
      </Router>
    );

    await userEvent.click(screen.getByTestId('userProfileLink'));
    const pathname = history.location.pathname;
    expect(pathname === '/' || pathname === '/search').toBeTruthy();
  });
});
