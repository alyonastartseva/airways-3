import '@testing-library/jest-dom';
import { describe, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

import { days, months, years } from '@utils/form-data.utils';

import { SelectField } from './index';

const monthsOptions = months.map((i) => (
  <option data-testid="select-option" value={i + 1} key={i + 1}>
    {new Date(0, i + 1, 0).toLocaleDateString('en', { month: 'long' })}
  </option>
));

const yearsOptions = years.map((year) => (
  <option
    data-testid="select-option"
    style={{ marginLeft: '2rem' }}
    key={year}
    value={year}
  >
    {year}
  </option>
));
const daysOptions = days.map((i) => (
  <option style={{ marginLeft: '2rem' }} key={i} value={i + 1}>
    {i + 1}
  </option>
));
vi.mock('@chakra-ui/react', () => ({
  Box: ({ children }: React.PropsWithChildren) => (
    <div>Box Component {children}</div>
  ),
  FormLabel: () => <div>FormLabel Component</div>,
  Select: ({ children }: React.PropsWithChildren) => (
    <div>Select Component {children}</div>
  ),
  Text: () => <div>Text Component</div>,
}));
describe('SelectField test', () => {
  it('Render Test and Props Test and Days Prop test', () => {
    vi.mock('react-hook-form', () => ({
      useFormContext: () => ({
        formState: () => vi.fn,
        register: () => vi.fn,
      }),
    }));
    const screen = render(
      <SelectField
        name={'Day'}
        label={'Day'}
        options={daysOptions}
        data-testid="select-option"
      />
    );
    expect(screen.getByText('Box Component')).toBeDefined();
    expect(screen.getByText('FormLabel Component')).toBeDefined();
    const selectBtn = screen.getByText('Select Component');
    expect(screen.getByText('Select Component')).toBeDefined();
    fireEvent.change(selectBtn);
    expect(screen.getAllByText('1' && '31'));
  });
  it('Props Test on Month', () => {
    const screen = render(
      <SelectField
        name={'months'}
        label={'months'}
        options={monthsOptions}
        // data-testid="select-option"
      />
    );
    const selectBtn = screen.getByText('Select Component');
    expect(screen.getByText('Select Component')).toBeDefined();
    fireEvent.change(selectBtn);
    expect(screen.getAllByText('January' && 'December'));
  });
  it('Props Test on Years', () => {
    const screen = render(
      <SelectField
        name={'years'}
        label={'years'}
        options={yearsOptions}
        // data-testid="select-option"
      />
    );
    const selectBtn = screen.getByText('Select Component');
    expect(screen.getByText('Select Component')).toBeDefined();
    fireEvent.change(selectBtn);
    expect(screen.getAllByText('1953' && '2023'));
  });
});
