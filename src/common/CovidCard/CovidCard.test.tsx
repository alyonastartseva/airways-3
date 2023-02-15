import { render, screen } from '@testing-library/react';
import { describe, test } from 'vitest';

import { CovidCard } from './index';

describe('Covid card test', () => {
  test('Covid cards renders', () => {
    render(<CovidCard />);
    expect(screen.getByText(/Dear Passengers,/)).toBeInTheDocument();
    expect(
      screen.getByText(/We recommend that you review our/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Travel Regulations Page/)).toBeInTheDocument();
    expect(
      screen.getByText(
        /for all updates and recent developments of country-specific travel restrictions and travel requirements due to/
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/COVID-19/)).toBeInTheDocument();
  });
});
