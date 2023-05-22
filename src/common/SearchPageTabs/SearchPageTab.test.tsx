import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { QueryClient, QueryClientProvider } from 'react-query';

import { PlaneTabIcon } from '@common/icons';

import SearchPageTabs from './SearchPageTabs';

describe('SearchPageTabs component', () => {
  it('renders tabs', () => {
    const tabs = [
      { label: 'flights', icon: PlaneTabIcon },
      { label: 'check-in' },
      { label: 'manage booking' },
    ];

    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <SearchPageTabs />
      </QueryClientProvider>
    );
    expect(screen.getByText(/flights/)).toBeInTheDocument();
    expect(screen.getByText(/check-in/)).toBeInTheDocument();
    expect(screen.getByText(/manage booking/)).toBeInTheDocument();
  });
});
