import '@testing-library/jest-dom';
import { describe, vi } from 'vitest';
import { render } from '@testing-library/react';

import { IFromTo } from '@/interfaces';

import { DestinationInput } from './index';

const setDestinationTest = () => {
  return;
};

const fromToTest: IFromTo = {
  from: {
    airportCode: 'TST_1',
    airportName: 'testAirport_1',
    cityName: 'testCity_1',
    countryName: 'TestCountry_1',
    timezone: 'GMT +test_1',
  },
  to: {
    airportCode: 'TST_2',
    airportName: 'testAirport_2',
    cityName: 'testCity_2',
    countryName: 'TestCountry_2',
    timezone: 'GMT +test_2',
  },
};
describe('Destination input test', () => {
  it('Test component input with data rendered to the page', () => {
    vi.mock('react-query', () => {
      const testData = [
        {
          airportCode: 'TST_2',
          airportName: 'testAirport_2',
          cityName: 'testCity_2',
          countryName: 'TestCountry_2',
          timezone: 'GMT +test_2',
        },
      ];
      return {
        useQuery: vi.fn().mockReturnValue({ data: testData }),
      };
    });
    const container = render(
      <DestinationInput
        fromTo={fromToTest}
        fromOrTo={'testFrom'}
        onSetDestination={setDestinationTest}
      />
    );
    expect(container.getByText(/testFrom/i)).toBeInTheDocument();
    expect(container.getByText(/testAirport_2/i)).toBeInTheDocument();
  });
});
