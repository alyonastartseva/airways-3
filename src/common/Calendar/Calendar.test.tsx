import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { format, addMonths, compareDesc } from 'date-fns';

import { Calendar, calendarHeadingFormat } from './index';

const props = {
  startDate: new Date(),
  endDate: new Date(),

  select: vi.fn(),
  calendarFormat: 2,
};

describe('Calendar component', () => {
  it('correct date/-s heading', () => {
    render(<Calendar {...props} />);

    // two headings are in the doc

    const formattedDateOne = format(props.startDate, calendarHeadingFormat);
    const formattedDateTwo = format(
      addMonths(props.startDate, 1),
      calendarHeadingFormat
    );
    expect(screen.getByText(formattedDateOne)).toBeInTheDocument();
    expect(screen.getByText(formattedDateTwo)).toBeInTheDocument();

    // no past dates
    expect(
      screen.queryByText(
        format(addMonths(new Date(), -1), calendarHeadingFormat)
      )
    ).toBeNull();

    // startDate  <= endDate &&  today <= startDate

    expect(
      compareDesc(new Date(props.startDate), new Date(props.endDate))
    ).not.toBe(-1);
    expect(
      compareDesc(new Date().setHours(0, 0, 0, 0), new Date(props.startDate))
    ).not.toBe(-1);
  }),
    it('switch date/-s buttons', () => {
      render(<Calendar {...props} />);

      let count = 0;
      const prevButton = screen.getByText('<');
      const nextButton = screen.getByText('>');
      expect(prevButton).toBeInTheDocument();
      expect(prevButton).toBeDisabled();
      expect(nextButton).toBeInTheDocument();

      fireEvent.click(nextButton);
      expect(
        screen.getByText(
          format(
            addMonths(props.startDate, (count += 1)),
            calendarHeadingFormat
          )
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          format(
            addMonths(props.startDate, (count += 1)),
            calendarHeadingFormat
          )
        )
      ).toBeInTheDocument();
      expect(prevButton).not.toBeDisabled();

      fireEvent.click(prevButton);
      expect(
        screen.getByText(
          format(
            addMonths(props.startDate, (count -= 1)),
            calendarHeadingFormat
          )
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          format(
            addMonths(props.startDate, (count -= 1)),
            calendarHeadingFormat
          )
        )
      ).toBeInTheDocument();
      expect(prevButton).toBeDisabled();

      fireEvent.click(prevButton);
      expect(
        screen.getByText(format(props.startDate, calendarHeadingFormat))
      ).toBeInTheDocument();
      expect(
        screen.getByText(format(props.startDate, calendarHeadingFormat))
      ).toBeInTheDocument();
      expect(prevButton).toBeDisabled();
    });

  it('calendar cells', () => {
    render(<Calendar {...props} />);

    const tables = screen.getAllByRole('table');
    expect(tables[0].getElementsByTagName('td')).toHaveLength(35);
    expect(tables[0].getElementsByTagName('th')).toHaveLength(7);
  });
});
