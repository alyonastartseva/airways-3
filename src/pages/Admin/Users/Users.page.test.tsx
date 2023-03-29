import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { afterEach, describe, expect, vi } from 'vitest';

import UsersPage from './Users.page';

vi.mock('react-query');
afterEach(cleanup);

describe('Users', () => {
  it('Test component info rendered to the page', async () => {
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
        isLoading: vi.fn().mockReturnValue({}),
      };
    });
    render(
      <BrowserRouter>
        <UsersPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/Пользователи/i)).toBeInTheDocument();
  });

  //   it('Test component table with data rendered to the page', () => {
  //     vi.mock('react-query', () => {
  //       const testData = [
  //         {
  //           firstName: 'testName',
  //           id: 3,
  //           roles: [{ id: 2, name: 'ROLE_PASSENGER' }],
  //         },
  //       ];
  //       return {
  //         useQuery: vi.fn().mockReturnValue({ data: testData }),
  //       };
  //     });

  //     const { container } = render(
  //       <BrowserRouter>
  //         <UsersPage />
  //       </BrowserRouter>
  //     );
  //     expect(container.querySelector('table')).toBeInTheDocument();
  //     expect(screen.getByText('testName')).toBeInTheDocument();
  //   });
});
