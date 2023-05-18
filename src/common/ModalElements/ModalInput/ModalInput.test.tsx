import { describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import ModalInput from './ModalInput';

const label = 'test';
const fieldName = 'test';

vi.mock('react-hook-form', () => {
  return {
    useFormContext: vi.fn().mockReturnValue({
      register: vi.fn(),
      formState: { errors: {} },
      watch: () => vi.fn(),
      control: vi.fn(),
    }),
  };
});

describe('ModalInput test', () => {
  it('ModalInput render', () => {
    const rules = {
      required: 'test',
      minLength: { value: 1, message: 'Минимум 1 символ' },
    };

    render(<ModalInput label={label} fieldName={fieldName} rules={rules} />);

    expect(screen.getByLabelText('modal-input')).toBeInTheDocument();
  });
});
