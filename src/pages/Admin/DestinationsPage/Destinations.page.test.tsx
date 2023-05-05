import { afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { DestinationsPage } from '@pages/Admin/DestinationsPage/index';
import { LoginAdminForm } from '@components/LoginAdminForm';

describe('DestinationsPage renders', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });
  it('renders AdminLogin if there is no access', async () => {
    const queryClient = new QueryClient();

    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({});

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/destinations']}>
          <Routes>
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/admin" element={<LoginAdminForm />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
    expect(screen.getByText('Forgot password?')).toBeInTheDocument();
  });
  it('renders DestinationsPage if it has access', async () => {
    localStorage.setItem('adminToken', 'ljksdf');

    const queryClient = new QueryClient();

    const testData = [
      {
        id: 1,
        airportCode: 'VVO',
        airportName: 'Кневичи',
        countryName: 'Россия',
        timezone: 'GMT +10',
      },
    ];
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ data: testData });
    data.useMutation = vi.fn().mockReturnValue({});

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/destinations']}>
          <Routes>
            <Route path="/destinations" element={<DestinationsPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
    expect(screen.getByText('VVO')).toBeInTheDocument();
    expect(screen.getByText('Кневичи')).toBeInTheDocument();
    expect(screen.getByText('Россия')).toBeInTheDocument();
  });
});