import { render, screen, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, vi } from 'vitest';

import { Passengers } from './index';

vi.mock('react-query');

describe('Passengers', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('usePassengersQuery is working correct', async () => {
    const testData = {
      content: [
        {
          id: 1,
          passport: {
            gender: 'male',
            serialNumberPassport: '00000000',
            passportIssuingDate: '21020202',
          },
          firstName: 'Иван',
          lastName: 'Иванов',
          middleName: 'Иванович',
        },
      ],
    };

    const usePassengersQuery = vi.fn().mockReturnValue({ data: testData });

    const { result } = renderHook(() => usePassengersQuery());
    expect(result.current.data).toBeDefined();
  });

  it('Passengers render table data', async () => {
    const testData = {
      content: [
        {
          id: 1,
          passport: {
            gender: 'male',
            serialNumberPassport: '00000000',
            passportIssuingDate: '21020202',
          },
          firstName: 'Иван',
          lastName: 'Иванов',
          middleName: 'Иванович',
        },
      ],
    };

    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ data: testData });
    data.useMutation = vi.fn().mockReturnValue({});

    render(<Passengers />);
    expect(data.useQuery).toBeCalledTimes(1);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Имя, Фамилия, Отчество')).toBeInTheDocument();
    expect(screen.getByText('Пол')).toBeInTheDocument();
    expect(screen.getByText('Телефон')).toBeInTheDocument();
    expect(screen.getByText('Дата рождения')).toBeInTheDocument();
    expect(screen.getByText('Серийный номер')).toBeInTheDocument();
    expect(screen.getByText('Гражданство')).toBeInTheDocument();
    expect(screen.getByText('Дата выдачи паспорта')).toBeInTheDocument();
  });

  it('Passengers render spinner', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ isLoading: true });
    data.useMutation = vi.fn().mockReturnValue({});

    render(<Passengers />);
    expect(data.useQuery).toBeCalledTimes(1);
    expect(screen.getAllByText('Loading...')).toHaveLength(2);
  });

  it('Passengers render alert', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({});
    data.useMutation = vi.fn().mockReturnValue({});

    render(<Passengers />);
    expect(data.useQuery).toBeCalledTimes(1);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
