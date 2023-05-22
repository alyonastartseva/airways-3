import { describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import PageNotFound from './PageNotFound';

const Page = () => (
  <BrowserRouter>
    <PageNotFound />
  </BrowserRouter>
);

describe('PageNotFound test', () => {
  it('PageNotFound', () => {
    render(<Page />);

    expect(screen.getByText(/Страница не найдена!/)).toBeInTheDocument;
  });
  it('PageNotFound navigate test', () => {
    vi.mock('@/hooks/useAuth', () => ({
      isAdmin: false,
    }));

    render(<Page />);

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(global.window.location.pathname).toContain('/');
  });
});
