import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import UserInput from './UserInput';
vi.mock('@chakra-ui/react', () => ({
  Input: () => <div>input Component</div>,
  FormLabel: () => <div>FormLabel Component </div>,
}));
describe('SelectField test', () => {
  it('Render Test and Props Test', async () => {
    vi.mock('react-hook-form', () => ({
      useForm: () => ({
        register: () => vi.fn,
      }),
    }));
    const register = vi.fn();
    render(<UserInput name="Имя" regValue="firstname" register={register} />);
    expect(screen.getByText('input Component')).toBeDefined();
    expect(screen.getByText('FormLabel Component')).toBeDefined();
  });
});
