import { describe, vi } from 'vitest';
import { render } from '@testing-library/react';

import { AlertMessage } from '@common/AlertMessage';

vi.mock('@chakra-ui/react', () => ({
  Flex: ({ children }: React.PropsWithChildren) => (
    <div>Flex component {children}</div>
  ),
  Alert: ({ children }: React.PropsWithChildren) => (
    <div>Alert component {children}</div>
  ),
  AlertIcon: () => <span>AlertIcon component</span>,
  AlertTitle: () => <div>AlertTitle component</div>,
  AlertDescription: () => <div>AlertDescription component</div>,
}));

describe('AlertMessage test', () => {
  it('AlertMessage renders', () => {
    const screen = render(<AlertMessage />);
    expect(screen.getByText('Flex component')).toBeInTheDocument();
    expect(screen.getByText('Alert component')).toBeInTheDocument();
    expect(screen.getByText('AlertIcon component')).toBeInTheDocument();
    expect(screen.getByText('AlertTitle component')).toBeInTheDocument();
    expect(screen.getByText('AlertDescription component')).toBeInTheDocument();
  });
});
