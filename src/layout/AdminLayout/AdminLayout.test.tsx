import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe } from 'vitest';

import { AdminLayout } from './index';

// vi.mock('@components/Admin/AdminFooter', () => ({
//     AdminFooter: () => <div>AdminFooter</div>,
// }));

// vi.mock('@components/Admin/AdminHeader', () => ({
//     AdminHeader: () => <div>AdminHeader</div>,
// }));
vi.mock('@chakra-ui/react', async () => {
  const actual: object = await vi.importActual('@chakra-ui/react');
  return {
    ...actual,
    Flex: ({ children }: React.PropsWithChildren) => (
      <div>Flex Container {children}</div>
    ),
  };
});

vi.mock('react-router-dom', async () => {
  const actual: object = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Outlet: () => <div>Outlet</div>,
  };
});

describe('AdminLayout', () => {
  it('AdminLayout', () => {
    render(
      <MemoryRouter>
        <AdminLayout />
      </MemoryRouter>
    );
    screen.debug();
    expect(screen.getAllByText('Flex Container')).toBeDefined();
    // expect(screen.getByText('AdminHeader')).toBeDefined();
    // expect(screen.getByText('AdminFooter')).toBeDefined();
    expect(screen.getByText('Outlet')).toBeDefined();
  });
});
