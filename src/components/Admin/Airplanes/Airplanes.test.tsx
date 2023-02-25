import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, vi } from 'vitest';

import { Airplanes } from './index';

afterEach(cleanup);

describe('Airplanes', () => {
  it('Test component info rendered to the page', () => {
    const { container } = render(<Airplanes />);
    expect(container.querySelector('h4')).toBeInTheDocument();
    expect(container.querySelector('h4')).toHaveTextContent('Самолеты');
  });

  it('Test component table with data rendered to the page', () => {
    vi.mock('react-query', () => {
      const testData = [
        {
          model: 'testName',
          aircraftNumber: 1234,
          id: 3,
        },
      ];
      return {
        useQuery: vi.fn().mockReturnValue({ data: testData }),
      };
    });

    const { container } = render(<Airplanes />);
    expect(container.querySelector('table')).toBeInTheDocument();
    expect(screen.getByText('testName')).toBeInTheDocument();
  });
});
