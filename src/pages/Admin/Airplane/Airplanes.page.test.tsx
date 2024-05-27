import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { AirplanesPage } from './index';

vi.mock('react-query');

describe('Airplanes page tests', () => {
  const testData = {
    content: [
      {
        id: 1,
        model: 'Superjet 100',
        aircraftNumber: '1337',
        modelYear: '2000',
        flightRange: '3804',
      },
    ],
  };

  it('airplane page renders correctly', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ data: testData });
    data.useMutation = vi.fn().mockReturnValue({ mutate: vi.fn() });
    render(<AirplanesPage />);
    expect(data.useQuery).toBeCalled();
    expect(screen.getByText(/Самолеты/i)).toBeInTheDocument();
    expect(screen.getByText(/Superjet 100/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '>>' })).toBeInTheDocument();
  });

  it('Airplanes page render spinner', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ isLoading: true });
    data.useMutation = vi.fn().mockReturnValue({});

    render(<AirplanesPage />);
    expect(data.useQuery).toBeCalledTimes(1);
    expect(screen.getAllByText('Loading...')).toHaveLength(2);
  });

  it('Airplanes page render alert', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({});
    data.useMutation = vi.fn().mockReturnValue({});

    render(<AirplanesPage />);
    expect(data.useQuery).toBeCalledTimes(1);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
