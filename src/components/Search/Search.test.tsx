import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { describe, it } from 'vitest';

import Search from './Search';

describe('Search component', () => {
  it('renders without crashing', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Search />
      </QueryClientProvider>
    );
  });

  it('renders all the elements', async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <Search />
      </QueryClientProvider>
    );

    // Check if the search page tabs are present
    expect(screen.getByText(/Flights/)).toBeInTheDocument();

    // Check if the COVID card is present
    expect(screen.getByText(/COVID-19/)).toBeInTheDocument();

    // Check if the article cards are present
    expect(await screen.findAllByText(/Discover/)).toHaveLength(2);
    expect(screen.getByText(/Holiday destinations/)).toBeInTheDocument();
    expect(screen.getByText(/Our best offers/)).toBeInTheDocument();
    expect(screen.getByText(/Additional services/)).toBeInTheDocument();

    // Check if the social icons are present
    expect(screen.getByTestId('facebook')).toBeInTheDocument();
    expect(screen.getByTestId('twitter')).toBeInTheDocument();
    expect(screen.getByTestId('linkedin')).toBeInTheDocument();
    expect(screen.getByTestId('instagram')).toBeInTheDocument();
    expect(screen.getByTestId('youtube')).toBeInTheDocument();

    // Check if the feedback button is present
    expect(
      screen.getByRole('button', { name: /feedback/i })
    ).toBeInTheDocument();
  });
});
