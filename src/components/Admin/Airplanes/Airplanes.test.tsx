import { render, screen } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

import Airplanes from './Airplanes';

vi.mock('react-query');

describe('Airplanes', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('Airplanes render table data', async () => {
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

    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ data: testData });
    data.useMutation = vi.fn().mockReturnValue({});

    render(
      <BrowserRouter>
        <Airplanes />
      </BrowserRouter>
    );
    expect(data.useQuery).toBeCalledTimes(1);
    expect(screen.getByText('Superjet 100')).toBeInTheDocument();
    expect(screen.getByText('1337')).toBeInTheDocument();
    expect(screen.getByText('2000')).toBeInTheDocument();
    expect(screen.getByText('3804')).toBeInTheDocument();
  });

  it('Airplanes render spinner', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({ isLoading: true });
    data.useMutation = vi.fn().mockReturnValue({});

    render(<Airplanes />);
    expect(data.useQuery).toBeCalledTimes(1);
    expect(screen.getAllByText('Loading...')).toHaveLength(2);
  });

  it('Airplanes render alert', async () => {
    const data = await import('react-query');
    data.useQuery = vi.fn().mockReturnValue({});
    data.useMutation = vi.fn().mockReturnValue({});

    render(<Airplanes />);
    expect(data.useQuery).toBeCalledTimes(1);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
