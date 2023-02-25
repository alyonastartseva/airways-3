import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import HeadingAdmin from './HeadingAdmin';

describe('HeadingAdmin test', () => {
  it('HeadingAdmin render', () => {
    const name = 'test';
    render(<HeadingAdmin name={name} />);

    expect(screen.getByText(name)).toBeInTheDocument();
  });
});
