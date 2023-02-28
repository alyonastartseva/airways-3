import { describe, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

import ButtonAddAdmin from './ButtonAddAdmin';

describe('ButtonAddAdmin test', () => {
  it('ButtonAddAdmin render', () => {
    const click = vi.fn();
    const name = 'Button component';
    const screen = render(<ButtonAddAdmin name={name} onClick={click} />);
    expect(screen.getByText(name)).toBeInTheDocument();
  });

  it('ButtonAddAdmin click', () => {
    const click = vi.fn();
    const name = 'Button component';
    const screen = render(<ButtonAddAdmin name={name} onClick={click} />);
    const button = screen.getByText(name);

    fireEvent.click(button);
    expect(click).toHaveBeenCalled();
  });
});
