import { describe, it } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import { AdminHeader } from './index';

describe('AdminHeader', () => {
  it('AdminHeader renders correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <AdminHeader />
      </Router>
    );
    const exitBtn = screen.getByText('Выход');
    const logoText = screen.getByText('UX AIR');
    const paxTab = screen.getByText('Пассажиры');
    expect(exitBtn).toBeInTheDocument();
    expect(logoText).toBeInTheDocument();
    expect(paxTab).toBeInTheDocument();
  });
  it('exit button returns to search page', async () => {
    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <AdminHeader />
      </Router>
    );

    await userEvent.click(screen.getByText(/Выход/i));
    expect(history.location.pathname).toBe('/search');
  });
});
