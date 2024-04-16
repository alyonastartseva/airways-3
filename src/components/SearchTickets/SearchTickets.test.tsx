import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect } from 'vitest';

import MainSearch from './SearchTickets';

describe('MainSearch', () => {
  test('renders correctly', () => {
    render(<MainSearch />);

    expect(screen.getByText('Найти билеты')).toBeInTheDocument();
    expect(screen.getByLabelText('Откуда')).toBeInTheDocument();
    expect(screen.getByLabelText('Куда')).toBeInTheDocument();
    expect(screen.getByLabelText('Количество пассажиров')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Искать билеты без пересадок')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Туда и обратно')).toBeInTheDocument();
    expect(screen.getByLabelText('В одну сторону')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Найти' })).toBeInTheDocument();
  });

  test('search button shows error if fields are empty', async () => {
    render(<MainSearch />);

    userEvent.click(screen.getByRole('button', { name: 'Найти' }));

    await waitFor(() => {
      expect(screen.getByTestId('alert-error')).toBeInTheDocument();
      expect(screen.getByText('Ошибка поиска')).toBeInTheDocument();
    });
  });

  test('reverse button calls handleReverse when clicked', () => {
    render(<MainSearch />);
    const reverseButton = screen.getByTestId('Reverse');

    userEvent.click(reverseButton);

    expect(screen.getByLabelText('Откуда')).toHaveValue('');
    expect(screen.getByLabelText('Куда')).toHaveValue('');
  });

  test('passenger input changes value and shows warning when invalid value is entered', () => {
    render(<MainSearch />);
    const passengerInput = screen.getByLabelText('Количество пассажиров');

    fireEvent.change(passengerInput, { target: { value: 0 } });

    expect(passengerInput).toHaveValue(0);
    expect(
      screen.getByText('Количество пассажиров должно быть больше 0')
    ).toBeInTheDocument();
  });
});
