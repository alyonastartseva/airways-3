import { render, screen } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';

import { Airplane } from './index';

vi.mock('react-query');

describe('Airplane', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('Airplane render table data', async () => {
    const testData = [
      {
        aircraftId: 1,
        category: {
          categoryType: 'BUSINESS',
          categoryId: 2,
        },
        id: 3,
        isLockedBack: true,
        isNearEmergencyExit: false,
        seatNumber: '1B',
      },
    ];
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ data: testData });
    data.useMutation = vi.fn().mockReturnValue({});

    render(<Airplane />);
    expect(data.useQuery).toBeCalledTimes(1);
    expect(screen.getByText('Superjet 100')).toBeInTheDocument();
    expect(screen.getByText('1337')).toBeInTheDocument();
    expect(screen.getByText('2000')).toBeInTheDocument();
    expect(screen.getByText('3804')).toBeInTheDocument();
  });

  it('Airplane render spinner', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ isLoading: true });
    data.useMutation = vi.fn().mockReturnValue({});

    render(<Airplane />);
    expect(data.useQuery).toBeCalledTimes(1);
    expect(screen.getAllByText('Loading...')).toHaveLength(2);
  });

  it('Airplane render alert', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({});
    data.useMutation = vi.fn().mockReturnValue({});

    render(<Airplane />);
    expect(data.useQuery).toBeCalledTimes(1);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
