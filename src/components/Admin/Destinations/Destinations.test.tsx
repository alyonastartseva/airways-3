import { render, screen } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';

import Destinations from './Destinations';

describe('Destinations', () => {
  it('Destinations render table data', () => {
    vi.mock('react-query', async () => {
      const testData = {
        data: [
          {
            id: 1,
            airportCode: 'VVO',
            airportName: 'Кневичи',
            countryName: 'Россия',
            timezone: 'GMT +10',
          },
        ],
      };
      return {
        useQuery: vi.fn().mockReturnValue({ data: testData }),
        useMutation: vi.fn().mockReturnValue({}),
      };
    });

    render(<Destinations />);
    expect(screen.getByText('VVO')).toBeInTheDocument();
    expect(screen.getByText('Кневичи')).toBeInTheDocument();
    expect(screen.getByText('Россия')).toBeInTheDocument();
    expect(screen.getByText('GMT +10')).toBeInTheDocument();
  });
});
