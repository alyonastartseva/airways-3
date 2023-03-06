import * as React from 'react';
import { vi, describe } from 'vitest';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { AdminHeader } from './index';

vi.mock('@chakra-ui/react', () => ({
  Box: ({ children }: React.PropsWithChildren) => (
    <div>{children} Box Component</div>
  ),
  Flex: ({ children }: React.PropsWithChildren) => (
    <div>{children} Flex Component</div>
  ),
  Image: () => <div>Image Component</div>,
  Text: () => <p>Text Component</p>,
}));

vi.mock('react-router-dom', () => ({
  Link: ({ children }: React.PropsWithChildren) => (
    <a href=".">{children}Link Component</a>
  ),
}));

describe('AdminHeader', () => {
  it('AdminHeader', () => {
    const screen = render(<AdminHeader />);
    expect(screen.getAllByText('Box Component')).toBeDefined();
    expect(screen.getAllByText('Flex Component')).toHaveLength(2);
    expect(screen.getByText('Image Component')).toBeDefined();
    expect(screen.getByText('Text Component')).toBeDefined();
    expect(screen.getByText('Link Component')).toBeDefined();
  });
});
