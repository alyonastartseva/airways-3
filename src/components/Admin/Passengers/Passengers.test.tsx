import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, vi } from 'vitest';

import Passengers from './Passengers';

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
        passport: {
          gender: 'male',
          serialNumberPassport: '00000000',
          passportIssuingDate: '21020202',
        },
        firstName: 'Иван',
        lastName: 'Иванов',
        middleName: 'Иванович',
      },
    ];
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

  it('Destinations render spinner', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ isLoading: true });
    data.useMutation = vi.fn().mockReturnValue({});

    render(<Passengers />);
    expect(data.useQuery).toBeCalledTimes(1);
    expect(screen.getAllByText('Loading...')).toHaveLength(2);
  });

  it('Destinations render alert', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({});
    data.useMutation = vi.fn().mockReturnValue({});

    render(<Passengers />);
    expect(data.useQuery).toBeCalledTimes(1);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
