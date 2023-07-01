import { render, screen, renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, vi } from 'vitest';
import { QueryClientProvider, QueryClient } from 'react-query';

import { ITickets } from '@/interfaces/tickets.interface';

import Tickets from './Tickets';

vi.mock('react-query', async () => {
  const actual: object = await vi.importActual('react-query'); 

  const testData: ITickets[] = [
    {
      id: 1,
      ticketNumber: 'SD-2222',
      firstName: 'Пётр',
      lastName: 'Пётр',
      code: 'VKOOMS',
      departureDateTime: '2023-03-29T06:03:26.367205',
      arrivalDateTime: '2023-03-29T06:03:26.367205',
      flightId: '1'
    }
  ];

  return {
    ...actual,
    useMutation: vi.fn().mockReturnValue({ data: testData, isSuccess: true }),
    useQueryClient: vi.fn().mockReturnValue({}),
  };
});

describe('Tickets', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('useTicketQuery should work correct', async () => {
    const queryClient = new QueryClient();

    const testData: ITickets[] = [
      {
        id: 1,
        ticketNumber: 'SD-2222',
        firstName: 'Пётр',
        lastName: 'Пётр',
        code: 'VKOOMS',
        departureDateTime: '2023-03-29T06:03:26.367205',
        arrivalDateTime: '2023-03-29T06:03:26.367205',
        flightId: '1'
      },
    ];
    const useTicketsQuery = vi
      .fn()
      .mockReturnValue({ data: testData, isSuccess: true });

    const wrapper = ({ children }: any) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useTicketsQuery(), { wrapper });
    waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it('Flights render table data', async () => {
    const testDataRender: { content: ITickets[] } = {
      content: [
        {
          id: 1,
          ticketNumber: 'SD-2222',
          firstName: 'Пётр',
          lastName: 'Пётр',
          code: 'VKOOMS',
          departureDateTime: '2023-03-29T06:03:26.367205',
          arrivalDateTime: '2023-03-29T06:03:26.367205',
          flightId: '1'
        },
      ],
    };
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ data: testDataRender });
    data.useMutation = vi.fn().mockReturnValue({});

    render(<Tickets />);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('ФИО')).toBeInTheDocument();
    expect(screen.getByText('Номер билета')).toBeInTheDocument();
    expect(screen.getByText('Код')).toBeInTheDocument();
    expect(screen.getByText('Отлет')).toBeInTheDocument();
    expect(screen.getByText('Прилет')).toBeInTheDocument();
    expect(screen.getByText('Номер посадки')).toBeInTheDocument();  
  });
  
  it('Tickets render spinner', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ isLoading: true });
    data.useMutation = vi.fn().mockReturnValue({});

    render(<Tickets />);
    expect(screen.getAllByText('Loading...')).toHaveLength(2);
  });
  
  it('Tickets render alert', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({});
    data.useMutation = vi.fn().mockReturnValue({});

    render(<Tickets />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  }); 
});