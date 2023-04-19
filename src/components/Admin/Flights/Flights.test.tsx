import { render, screen, renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, vi } from 'vitest';
import { QueryClientProvider, QueryClient } from 'react-query';

import useFlightsQuery from '@/hooks/useFlightsQuery';
import { IFlights } from '@/interfaces/flights.interfaces';

import Flights from './Flights';

describe('Flights', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('useFlightsQuery should work correct', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: any) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(() => useFlightsQuery(), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it('Flights render table data', async () => {
    const testData: IFlights[] = [
      {
        id: 1,
        code: 'VKOOMS',
        from: {
          id: 1,
          airportCode: 'VKO',
          airportName: 'Внуково',
          cityName: 'Москва',
          timezone: 'Россия',
          countryName: 'GMT +3',
        },
        to: {
          id: 4,
          airportCode: 'OMS',
          airportName: 'Омск',
          cityName: 'Омск',
          timezone: 'Россия',
          countryName: 'GMT +6',
        },
        departureDateTime: '2023-03-29T06:03:26.367205',
        arrivalDateTime: '2023-03-29T06:03:26.367205',
        aircraftId: 1,
        flightStatus: 'ON_TIME',
      },
    ];
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ data: testData });
    data.useMutation = vi.fn().mockReturnValue({});

    render(<Flights />);
    expect(data.useQuery).toBeCalledTimes(1);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Код(Рейс)')).toBeInTheDocument();
    expect(screen.getByText('Город откуда')).toBeInTheDocument();
    expect(screen.getByText('Город куда')).toBeInTheDocument();
    expect(screen.getByText('Дата отбытия')).toBeInTheDocument();
    expect(screen.getByText('Дата прибытия')).toBeInTheDocument();
    expect(screen.getByText('Модель самолета')).toBeInTheDocument();
    expect(screen.getByText('Статус')).toBeInTheDocument();
  });

  it('Flights render spinner', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ isLoading: true });
    data.useMutation = vi.fn().mockReturnValue({});

    render(<Flights />);
    expect(data.useQuery).toBeCalledTimes(1);
    expect(screen.getAllByText('Loading...')).toHaveLength(2);
  });

  it('Flights render alert', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({});
    data.useMutation = vi.fn().mockReturnValue({});

    render(<Flights />);
    expect(data.useQuery).toBeCalledTimes(1);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
