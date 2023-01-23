import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { afterEach, beforeEach, describe, expect, vi } from 'vitest';

import { LoginAdminForm } from '@components/LoginAdminForm';

const queryClient = new QueryClient();
beforeEach(() => {
  render(
    <QueryClientProvider client={queryClient}>
      <LoginAdminForm />
    </QueryClientProvider>
  );
});
afterEach(() => {
  vi.restoreAllMocks();
  cleanup();
});

describe('Admin login form', () => {
  it('Test render component', () => {
    expect(screen.getByTestId('modal-open')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('modal-open'));
    const modal = screen.getByTestId('modal');
    const closeButton = screen.getByTestId('modal-close');
    expect(modal).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(screen.getByTestId('modal-open')).toBeInTheDocument();
  });

  it('Test query login', () => {
    vi.mock('react-query', async () => {
      const actual = await vi.importActual(
        '/node_modules/react-query/lib/index.js'
      );
      const testData = [
        {
          accessToken: 'string',
          refreshToken: 'string',
          type: 'Bearer',
        },
      ];
      return {
        // eslint-disable-next-line @typescript-eslint/ban-types
        ...(actual as Object),
        useQuery: vi.fn().mockReturnValue({ data: testData }),
      };
    });
  });
});
