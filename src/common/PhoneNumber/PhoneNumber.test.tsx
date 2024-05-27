import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import { PhoneNumber } from './index';

describe('PhoneNumber test', () => {
  it('PhoneNumber renders correctly', () => {
    render(<PhoneNumber />);
    expect(screen.getByTestId('phoneNumber')).toBeInTheDocument();
    expect(screen.getByText('+8 800 785 58 96')).toBeInTheDocument();
  });
});
