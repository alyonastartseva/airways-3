import { describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import ModalInput from './ModalInput';

describe('ModalInput test', () => {
  it('ModalInput render', () => {
    const label = 'test';
    const fieldName = 'test';
    const rules = {
      required: 'Введите название города',
      minLength: { value: 1, message: 'Минимум 1 символ' },
      maxLength: { value: 21, message: 'Максимум 21 символов' },
    };
    const register = vi.fn();

    render(
      <ModalInput
        label={label}
        fieldName={fieldName}
        rules={rules}
        register={register}
      />
    );

    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });
});
