import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import HeaderAdmin from './HeaderAdmin';

describe('HeaderAdmin test', () => {
  it('HeaderAdmin render', () => {
    const heading = 'test';
    const modal = <div>hello</div>;
    render(<HeaderAdmin heading={heading} modal={modal} />);

    expect(screen.getByText(heading)).toBeInTheDocument();
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});
