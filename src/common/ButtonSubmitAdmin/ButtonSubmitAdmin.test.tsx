import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import ButtonSubmitAdmin from './ButtonSubmitAdmin';

describe('ButtonSubmitAdmin test', () => {
  it('ButtonSubmitAdmin render', () => {
    render(<ButtonSubmitAdmin />);
    expect(screen.getByText('Сохранить')).toBeInTheDocument();
  });
});
