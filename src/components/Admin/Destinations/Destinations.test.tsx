import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, vi } from 'vitest';

import Destinations from './Destinations';

vi.mock('react-query');

describe('Destinations', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('Destinations render table data', async () => {
    const testData = [
      {
        id: 1,
        airportCode: 'VVO',
        airportName: 'Кневичи',
        countryName: 'Россия',
        timezone: 'GMT +10',
      },
    ];
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ data: testData });
    data.useMutation = vi.fn().mockReturnValue({});

    render(<Destinations />);
    expect(data.useQuery).toBeCalledTimes(1);
    expect(screen.getByText('VVO')).toBeInTheDocument();
    expect(screen.getByText('Кневичи')).toBeInTheDocument();
    expect(screen.getByText('Россия')).toBeInTheDocument();
    expect(screen.getByText('GMT +10')).toBeInTheDocument();
  });

  it('Destinations render spinner', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ isLoading: true });
    data.useMutation = vi.fn().mockReturnValue({});

    render(<Destinations />);
    expect(data.useQuery).toBeCalledTimes(1);
    expect(screen.getAllByText('Loading...')).toHaveLength(2);
  });

  it('Destinations render alert', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({});
    data.useMutation = vi.fn().mockReturnValue({});

    render(<Destinations />);
    expect(data.useQuery).toBeCalledTimes(1);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
