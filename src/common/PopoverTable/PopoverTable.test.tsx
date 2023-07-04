import { describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import PopoverTable from './PopoverTable';

describe('PopoverTable test', () => {
  it('PopoverTable renders', () => {
    const editRow = vi.fn();
    const deleteRow = vi.fn();
    const id = 1;
    const index = 1;
    const row = {};
    render(
      <MemoryRouter>
        <PopoverTable
          handleEditRow={editRow}
          deleteRow={deleteRow}
          id={id}
          index={index}
          row={row}
        />
      </MemoryRouter>
    );
    expect(screen.getByText('Редактировать')).toBeInTheDocument();
    expect(screen.getByText('Удалить')).toBeInTheDocument();
    expect(screen.getByText('Подробности')).toBeInTheDocument();
  });

  it('PopoverTable edit button click', () => {
    const editRow = vi.fn();
    const deleteRow = vi.fn();
    const id = 1;
    const index = 1;
    const row = {};
    render(
      <MemoryRouter>
        <PopoverTable
          handleEditRow={editRow}
          deleteRow={deleteRow}
          id={id}
          index={index}
          row={row}
        />
      </MemoryRouter>
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
      <MemoryRouter>
        <PopoverTable
          handleEditRow={editRow}
          deleteRow={deleteRow}
          id={id}
          index={index}
          row={row}
        />
      </MemoryRouter>
    );
    const deleteButton = screen.getByText('Удалить');
    fireEvent.click(deleteButton);
    expect(deleteRow).toHaveBeenCalled();
  });

  it('PopoverTable details button click', () => {
    const editRow = vi.fn();
    const deleteRow = vi.fn();
    const id = 1;
    const index = 1;
    const row = {};
    render(
      <MemoryRouter>
        <PopoverTable
          handleEditRow={editRow}
          deleteRow={deleteRow}
          id={id}
          index={index}
          row={row}
        />
      </MemoryRouter>
    );
    const detailsButton = screen.getByText('Подробности');

    fireEvent.click(detailsButton);
  });
});
