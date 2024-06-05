import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import { SpinnerBlock } from './index';

describe('Spinner test', () => {
  it('Spinner renders', () => {
    render(<SpinnerBlock />);
    expect(screen.getAllByText('Loading...')).toHaveLength(2);
  });
});
