import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { vi, describe } from 'vitest';

import { AdminFooter } from './index';

vi.mock('@chakra-ui/react', () => ({
  Box: () => <div>Box Container</div>,
}));

describe('AdminFooter', () => {
  it('AdminFooter', () => {
    const screen = render(<AdminFooter />);
    expect(screen.getByText('Box Container')).toBeDefined();
  });
});
