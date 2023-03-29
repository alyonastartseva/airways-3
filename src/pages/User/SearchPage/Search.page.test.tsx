import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import SearchPage from './Search.page';

describe('Search component', () => {
  it('renders without crashing', () => {
    render(<SearchPage />);
  });

  it('renders all the elements', () => {
    render(<SearchPage />);

    // Check if the background image is present
    expect(
      screen.getByRole('img', { name: /search-page-bg/i })
    ).toBeInTheDocument();

    // Check if the search page tabs are present
    expect(screen.getByText(/Flights/i)).toBeInTheDocument();
    expect(screen.getByText(/Hotels/i)).toBeInTheDocument();

    // Check if the COVID card is present
    expect(screen.getByText(/COVID-19/i)).toBeInTheDocument();

    // Check if the article cards are present
    expect(screen.getByText(/Discover/i)).toBeInTheDocument();
    expect(screen.getByText(/Holiday destinations/i)).toBeInTheDocument();
    expect(screen.getByText(/Our best offers/i)).toBeInTheDocument();
    expect(screen.getByText(/Additional services/i)).toBeInTheDocument();

    // Check if the social icons are present
    expect(screen.getByRole('img', { name: /facebook/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /twitter/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /linkedin/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /instagram/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /youtube/i })).toBeInTheDocument();

    // Check if the feedback button is present
    expect(
      screen.getByRole('button', { name: /feedback/i })
    ).toBeInTheDocument();
  });
});
