import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import { FlexCell } from './index';

describe('FlexCell test', () => {
  it('FlexCell render', () => {
    const padding = 16;
    const value = 'test';
    render(<FlexCell padding={padding} value={value} />);

    expect(screen.getByText(value)).toBeInTheDocument();
  });

  it('FlexCell padding', () => {
    const padding = 16;
    const value = 'test';
    render(<FlexCell padding={padding} value={value} />);

    const cell = screen.getByText(value);
    const styles = getComputedStyle(cell);

    expect(styles.paddingLeft).toBe(`${padding / 16}rem`);
  });
});
