import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { afterEach, beforeEach, describe, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

import { LoginAdminForm } from '@components/LoginAdminForm';

const queryClient = new QueryClient();
beforeEach(() => {
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LoginAdminForm />
      </BrowserRouter>
    </QueryClientProvider>
  );
});

afterEach(() => {
  vi.restoreAllMocks();
  cleanup();
});

describe('Admin login form', () => {
  it('Test render component', () => {
    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();
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
