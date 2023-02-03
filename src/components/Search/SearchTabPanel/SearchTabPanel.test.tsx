import '@testing-library/jest-dom';

import { describe, vi } from 'vitest';

describe('SearchTabPanel test', () => {
  it('Test SearchTabPanel', () => {
    vi.mock('react-query', () => {
      const testData = [
        {
          departFlight: [
            {
              aircraft: {
                aircraftNumber: 'string',
                flightRange: 0,
                id: 0,
                model: 'string',
                modelYear: 0,
                seatSet: [
                  {
                    category: {
                      categoryType: 'BUSINESS',
                      id: 0,
                    },
                    id: 0,
                    isLockedBack: true,
                    isNearEmergencyExit: true,
                    seatNumber: 'string',
                  },
                ],
              },
              arrivalDateTime: '2023-01-29T14:34:05.601Z',
              code: 'string',
              departureDateTime: '2023-01-29T14:34:05.601Z',
              flightStatus: 'ARRIVED',
              from: {
                airportCode: 'AAQ',
                airportName: 'string',
                cityName: 'string',
                countryName: 'string',
                id: 0,
                timezone: 'string',
              },
              id: 0,
              to: {
                airportCode: 'AAQ',
                airportName: 'string',
                cityName: 'string',
                countryName: 'string',
                id: 0,
                timezone: 'string',
              },
            },
          ],
          id: 0,
          returnFlight: [
            {
              aircraft: {
                aircraftNumber: 'string',
                flightRange: 0,
                id: 0,
                model: 'string',
                modelYear: 0,
                seatSet: [
                  {
                    category: {
                      categoryType: 'BUSINESS',
                      id: 0,
                    },
                    id: 0,
                    isLockedBack: true,
                    isNearEmergencyExit: true,
                    seatNumber: 'string',
                  },
                ],
              },
              arrivalDateTime: '2023-01-29T14:34:05.601Z',
              code: 'string',
              departureDateTime: '2023-01-29T14:34:05.601Z',
              flightStatus: 'ARRIVED',
              from: {
                airportCode: 'AAQ',
                airportName: 'string',
                cityName: 'string',
                countryName: 'string',
                id: 0,
                timezone: 'string',
              },
              id: 0,
              to: {
                airportCode: 'AAQ',
                airportName: 'string',
                cityName: 'string',
                countryName: 'string',
                id: 0,
                timezone: 'string',
              },
            },
          ],
          search: {
            departureDate: '2023-01-29',
            from: {
              airportCode: 'AAQ',
              airportName: 'string',
              cityName: 'string',
              countryName: 'string',
              id: 0,
              timezone: 'string',
            },
            id: 0,
            numberOfPassengers: 0,
            returnDate: '2023-01-29',
            to: {
              airportCode: 'AAQ',
              airportName: 'string',
              cityName: 'string',
              countryName: 'string',
              id: 0,
              timezone: 'string',
            },
          },
        },
      ];
      return {
        useQuery: vi.fn().mockReturnValue({ data: testData }),
      };
    });
  });
});
