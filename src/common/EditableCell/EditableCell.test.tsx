import { describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { EditableCell } from '@common/EditableCell';

describe('EditableCell test', () => {
  it('EditableCell render as div', () => {
    const value = 'test';
    const index = 11;
    const id = 'airplane';
    const editableRowIndex = 10;
    const updateData = vi.fn();
    render(
      <EditableCell
        index={index}
        id={id}
        editableRowIndex={editableRowIndex}
        value={value}
        updateData={updateData}
      />
    );

    expect(screen.getByText(value)).toBeInTheDocument();
  });

  describe('EditableCell input', () => {
    it('EditableCell is input with same index and editableRowIndex', () => {
      const value = 'test';
      const index = 10;
      const id = 'airplane';
      const editableRowIndex = 10;
      const updateData = vi.fn();
      render(
        <EditableCell
          index={index}
          id={id}
          editableRowIndex={editableRowIndex}
          value={value}
          updateData={updateData}
        />
      );
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('EditableCell updateData', () => {
      const value = 'test';
      const index = 10;
      const id = 'airplane';
      const editableRowIndex = 10;
      const updateData = vi.fn();
      render(
        <EditableCell
          index={index}
          id={id}
          editableRowIndex={editableRowIndex}
          value={value}
          updateData={updateData}
        />
      );
      const input = screen.getByRole('textbox');

      fireEvent.click(input);
      fireEvent.blur(input);

      expect(updateData).toHaveBeenCalled();
    });

    it('EditableCell onChange', () => {
      const value = 'test';
      const index = 10;
      const id = 'airplane';
      const editableRowIndex = 10;
      const updateData = vi.fn();
      render(
        <EditableCell
          index={index}
          id={id}
          editableRowIndex={editableRowIndex}
          value={value}
          updateData={updateData}
        />
      );
      const input = screen.getByRole('textbox');

      fireEvent.change(input, { target: { value: 'hello' } });
      expect(screen.getByDisplayValue('hello')).toBeInTheDocument();
    });
  });
});
