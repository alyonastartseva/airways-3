import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, vi } from 'vitest';

import { Users } from './index';

afterEach(cleanup);

describe('Users', () => {
  it('Test component info rendered to the page', () => {
    const { container } = render(<Users />);
    expect(container.querySelector('h4')).toBeInTheDocument();
    expect(container.querySelector('h4')).toHaveTextContent('Пользователи');
  });

  it('Test component table with data rendered to the page', () => {
    vi.mock('react-query', () => {
      const testData = [
        {
          firstName: 'testName',
          id: 3,
          roles: [{ id: 2, name: 'ROLE_PASSENGER' }],
        },
      ];
      return {
        useQuery: vi.fn().mockReturnValue({ data: testData }),
      };
    });

    const { container } = render(<Users />);
    expect(container.querySelector('table')).toBeInTheDocument();
    expect(screen.getByText('testName')).toBeInTheDocument();
  });
});
