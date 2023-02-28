import { describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import PopoverTable from './PopoverTable';

describe('PopoverTable test', () => {
  it('PopoverTable renders', () => {
    const editRow = vi.fn();
    const deleteRow = vi.fn();
    const id = 1;
    const index = 1;
    const row = {};
    render(
      <PopoverTable
        handleEditRow={editRow}
        deleteDestination={deleteRow}
        id={id}
        index={index}
        row={row}
      />
    );
    expect(screen.getByText('Редактировать')).toBeInTheDocument();
    expect(screen.getByText('Удалить')).toBeInTheDocument();
  });

  it('PopoverTable edit button click', () => {
    const editRow = vi.fn();
    const deleteRow = vi.fn();
    const id = 1;
    const index = 1;
    const row = {};
    render(
      <PopoverTable
        handleEditRow={editRow}
        deleteDestination={deleteRow}
        id={id}
        index={index}
        row={row}
      />
    );
    const editButton = screen.getByText('Редактировать');
    fireEvent.click(editButton);
    expect(editRow).toHaveBeenCalled();
  });

  it('PopoverTable delete button click', () => {
    const editRow = vi.fn();
    const deleteRow = vi.fn();
    const id = 1;
    const index = 1;
    const row = {};
    render(
      <PopoverTable
        handleEditRow={editRow}
        deleteDestination={deleteRow}
        id={id}
        index={index}
        row={row}
      />
    );
    const deleteButton = screen.getByText('Удалить');
    fireEvent.click(deleteButton);
    expect(deleteRow).toHaveBeenCalled();
  });
});
