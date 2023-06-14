import { render, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import CalendarMain, { PropsCalendar } from './CalendarMain';

const defaultProps: PropsCalendar = {
  startDate: null,
  endDate: null,
  select: () => {},
  calendarFormat: 1,
};

describe('CalendarMain', () => {
  it('should render without errors', () => {
    const { container } = render(<CalendarMain {...defaultProps} />);

    expect(container).toBeTruthy();
  });

  it('should open popover when input is clicked', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <CalendarMain {...defaultProps} />
    );

    const input = getByPlaceholderText('Дата поездки');
    fireEvent.click(input);

    const popover = getByTestId('popover-content');
    expect(popover).toBeInTheDocument();
  });

  it('should select a departure date and a return date', () => {
    const selectMock = vi.fn();

    const { getByPlaceholderText, getByText } = render(
      <CalendarMain {...defaultProps} select={selectMock} />
    );

    const input = getByPlaceholderText('Дата поездки');
    fireEvent.click(input);

    const departureDate = getByText('1');
    fireEvent.click(departureDate);

    const returnDate = getByText('15');
    fireEvent.click(returnDate);

    expect(selectMock).toHaveBeenCalledTimes(2);
  });

  it('should disable previous month button when current date is in the past', () => {
    const { getByPlaceholderText, getByLabelText } = render(
      <CalendarMain {...defaultProps} />
    );

    const input = getByPlaceholderText('Дата поездки');
    fireEvent.click(input);

    const previousMonthButton = getByLabelText('Предыдущий месяц');
    expect(previousMonthButton).toBeDisabled();
  });

  it('should navigate to the next month when next month button is clicked', () => {
    const { getByPlaceholderText, getByLabelText, getByTestId } = render(
      <CalendarMain {...defaultProps} />
    );

    const input = getByPlaceholderText('Дата поездки');
    fireEvent.click(input);

    const nextMonthButton = getByLabelText('Следующий месяц');
    fireEvent.click(nextMonthButton);

    const heading = getByTestId('heading');
    expect(heading).toHaveTextContent('Июль');
  });
});
