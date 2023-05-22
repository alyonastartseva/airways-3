import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { vi } from 'vitest';

import PassengersPage from './Passengers.page';

describe('PassengersPage component', () => {
  it('Passengers page render table data', async () => {
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

    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <PassengersPage />
      </QueryClientProvider>
    );

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
});
