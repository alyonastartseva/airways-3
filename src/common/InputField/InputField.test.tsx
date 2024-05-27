import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, vi } from 'vitest';

import { InputField } from './index';

describe('InputField test', () => {
  vi.mock('react-hook-form', () => ({
    useFormContext: () => ({
      formState: () => vi.fn,
      register: () => vi.fn,
    }),
  }));
  beforeEach(() => {
    render(<InputField name={'name'} label={'name'} />);
  });
  it('Render label text', () => {
    const labelText = screen.getByText('name');
    expect(labelText).toBeInTheDocument();
  });
  it('Render input element', () => {
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });
  it('Input element is empty', () => {
    const inputElement = screen.getByLabelText('name');
    expect(inputElement).toBeEmpty();
  });
});
