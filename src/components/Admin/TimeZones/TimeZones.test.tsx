import { render, screen, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, vi } from 'vitest';

import TimeZones from './TimeZones';

vi.mock('react-query');

describe('Timezones', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('useTimezonesQuery is working correct', async () => {
    const testData = {
      content: [
        {
          id: 1,
          countryName: 'Россия',
          cityName: 'Москва',
          gmt: 'GMT + 0',
          gmtWinter: 'GMT + 1',
        },
      ],
    };

    const useTimeZonesQuery = vi.fn().mockReturnValue({ data: testData });

    const { result } = renderHook(() => useTimeZonesQuery());
    expect(result.current.data).toBeDefined();
  });

  it('Timezones render table data', async () => {
    const testData = {
      content: [
        {
          id: 1,
          countryName: 'Россия',
          cityName: 'Москва',
          gmt: 'GMT + 0',
          gmtWinter: 'GMT + 1',
        },
      ],
    };

    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ data: testData });
    data.useMutation = vi.fn().mockReturnValue({});

    render(<TimeZones />);
    expect(data.useQuery).toBeCalledTimes(1);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Страна')).toBeInTheDocument();
    expect(screen.getByText('Город')).toBeInTheDocument();
    expect(
      screen.getByText('Среднее время по Гринвичу (GMT)')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Зимнее среднее время по Гринвичу (GMT)')
    ).toBeInTheDocument();
  });

  it('Timezones render spinner', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ isFetching: true });
    data.useMutation = vi.fn().mockReturnValue({});

    render(<TimeZones />);
    expect(data.useQuery).toBeCalledTimes(1);
    expect(screen.getAllByText('Loading...')).toHaveLength(2);
  });

  it('Timezones render alert', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ isError: true });
    data.useMutation = vi.fn().mockReturnValue({});

    render(<TimeZones />);
    expect(data.useQuery).toBeCalledTimes(1);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
