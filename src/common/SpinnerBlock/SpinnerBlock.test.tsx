import { describe, vi } from 'vitest';
import { render } from '@testing-library/react';

import SpinnerBlock from './SpinnerBlock';

vi.mock('@chakra-ui/react', () => ({
  Flex: ({ children }: React.PropsWithChildren) => (
    <div>Flex component {children}</div>
  ),
  Spinner: () => <div>Spinner component</div>,
}));

describe('Spinner test', () => {
  it('Spinner renders', () => {
    const screen = render(<SpinnerBlock />);
    expect(screen.getByText('Flex component')).toBeInTheDocument();
    expect(screen.getByText('Spinner component')).toBeInTheDocument();
  });
});
