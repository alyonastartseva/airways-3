import { afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Layout } from '@/layout';
import { SearchPage } from '@pages/User/SearchPage/index';
import { PageNotFound } from '@common/PageNotFound';

describe('SearchPage renders', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });
  it('renders SearchPage if no URL', async () => {
    const queryClient = new QueryClient();

    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({});

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['', '/']}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<SearchPage />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
    expect(screen.getByText('UX AIR')).toBeInTheDocument();
    expect(screen.getByText('flights')).toBeInTheDocument();
    expect(screen.getByText('Search Flights')).toBeInTheDocument();
  });
  it('renders not SearchPage if not empty URL', async () => {
    const queryClient = new QueryClient();

    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({});

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/sdfg']}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<SearchPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
    expect(screen.getByText('UX AIR')).toBeInTheDocument();
    expect(screen.getByText('PAGE NOT FOUND')).toBeInTheDocument();
  });
});
