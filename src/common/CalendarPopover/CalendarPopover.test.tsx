import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { CalendarPopover } from './index';

describe('Calendar component', () => {
  it('Popover Header not completed', () => {
    const props = {
      children: '<div>Hello</div>',
      startDate: null,
      endDate: null,
      select: vi.fn(),
    };

    render(<CalendarPopover {...props} />);
    expect(screen.getByText('Date selection is completed')).toBeInTheDocument();
    expect(screen.getByText('Date selection is completed')).toHaveStyle(
      'color: blackAlpha.300'
    );
  }),
    it('Popover Header  completed', () => {
      const props = {
        children: '<div>Hello</div>',
        startDate: new Date(),
        endDate: new Date(),
        select: vi.fn(),
      };

      render(<CalendarPopover {...props} />);
      expect(
        screen.getByText('Date selection is completed')
      ).toBeInTheDocument();
      expect(screen.getByText('Date selection is completed')).toHaveStyle(
        'color: rgb(110,150,210)'
      );
    }),
    it('render popover', () => {
      const props = {
        children: <button>Hello</button>,
        startDate: null,
        endDate: null,
        select: vi.fn(),
      };

      render(<CalendarPopover {...props} />);

      expect(screen.getByTestId('close')).toBeInTheDocument();
      expect(screen.getByText('ok')).toBeInTheDocument();
      expect(screen.getByTestId('popover-content')).toBeInTheDocument();
    });
});
