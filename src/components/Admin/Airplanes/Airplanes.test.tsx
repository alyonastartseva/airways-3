import { render, screen } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';

import Airplanes from './Airplanes';

describe('Airplanes', () => {
  it('Airplanes render table data', () => {
    vi.mock('react-query', async () => {
      const testData = {
        data: [
          {
            id: 1,
            model: 'Superjet 100',
            aircraftNumber: '1337',
            modelYear: '2000',
            flightRange: '3804',
          },
        ],
      };
      return {
        useQuery: vi.fn().mockReturnValue({ data: testData }),
        useMutation: vi.fn().mockReturnValue({}),
      };
    });

    render(<Airplanes />);
    expect(screen.getByText('Superjet 100')).toBeInTheDocument();
    expect(screen.getByText('1337')).toBeInTheDocument();
    expect(screen.getByText('2000')).toBeInTheDocument();
    expect(screen.getByText('3804')).toBeInTheDocument();
  });
});
