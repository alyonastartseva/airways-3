import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import { ModalForm } from './index';

describe('ModalForm test', () => {
  it('ModalForm render', () => {
    const modal = <div>hello</div>;
    render(<ModalForm modal={modal} />);

    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});
