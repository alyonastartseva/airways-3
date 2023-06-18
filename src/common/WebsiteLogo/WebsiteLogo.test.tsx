import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import WebsiteLogo from './WebsiteLogo';

describe('WebsiteLogo test', () => {
  it('WebsiteLogo renders correctly', () => {
    render(<WebsiteLogo />);
    expect(screen.getByTestId('logoImage')).toBeInTheDocument();
    expect(screen.getByText('Air Alien')).toBeInTheDocument();
  });
});
