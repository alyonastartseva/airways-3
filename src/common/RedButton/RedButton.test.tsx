import { vi } from 'vitest';

import { RedButton } from '@/common';
import { fireEvent, render, screen } from '@utils/test-utils';

describe('red button', () => {
  it('', () => {
    const click = vi.fn();
    const text = 'Click me';
    render(<RedButton text={text} clickHandler={click} />);
    const button = screen.getByText(text);
    fireEvent.click(button);
    expect(click).toHaveBeenCalled();
  });
});
