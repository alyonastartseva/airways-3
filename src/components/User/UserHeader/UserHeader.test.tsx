import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { BrowserRouter, Router } from 'react-router-dom';
import { afterEach, describe, expect } from 'vitest';

import { UserHeader } from './index';

const Component = () => (
  <BrowserRouter>
    <UserHeader />
  </BrowserRouter>
);

afterEach(cleanup);

describe('UserHeader test', () => {
  it('UserHeader render', () => {
    render(<Component />);

    expect(screen.getByText(/UX AIR/)).toBeInTheDocument();
    expect(screen.getByText(/sign-in/i)).toBeInTheDocument();
  });

  it('UserHeader select language popover', () => {
    render(<Component />);

    userEvent.click(screen.getByText(/SWITZERLAND - EN - CHF/));

    expect(screen.getByText(/Select a language/i)).toBeInTheDocument();
  });

  it('UserHeader sign-in', async () => {
    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <UserHeader />
      </Router>
    );

    await userEvent.click(screen.getByTestId('sign-in-button'));
    expect(history.location.pathname).toBe('/admin');
  });
});
