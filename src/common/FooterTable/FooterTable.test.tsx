import { describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import FooterTable from './FooterTable';

describe('FooterTable test', () => {
  it('FooterTable renders with button group and pagination', () => {
    const editableRowIndex = 10;
    const pageIndex = 10;
    const pageSize = 10;
    const onPatch = vi.fn();
    const onCancel = vi.fn();
    const setPaginationData = vi.fn();
    render(
      <FooterTable
        data={[]}
        editableRowIndex={editableRowIndex}
        pageSize={pageSize}
        pageIndex={pageIndex}
        patchRow={onPatch}
        cancelEditing={onCancel}
        setPaginationData={setPaginationData}
      />
    );

    expect(screen.getByText('Сохранить')).toBeInTheDocument();
    expect(screen.getByText('Отменить')).toBeInTheDocument();
    expect(screen.queryAllByRole('button')).toBeDefined();
  });

  it('FooterTable renders without button group and pagination', () => {
    const editableRowIndex = null;
    const pageIndex = 10;
    const pageSize = 10;
    const onPatch = vi.fn();
    const onCancel = vi.fn();
    const setPaginationData = vi.fn();
    render(
      <FooterTable
        data={undefined}
        editableRowIndex={editableRowIndex}
        pageSize={pageSize}
        pageIndex={pageIndex}
        patchRow={onPatch}
        cancelEditing={onCancel}
        setPaginationData={setPaginationData}
      />
    );

    expect(screen.queryByText('Сохранить')).not.toBeInTheDocument();
    expect(screen.queryByText('Отменить')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('FooterTable renders without button group but with pagination', () => {
    const editableRowIndex = null;
    const pageIndex = 10;
    const pageSize = 10;
    const onPatch = vi.fn();
    const onCancel = vi.fn();
    const setPaginationData = vi.fn();
    render(
      <FooterTable
        data={[]}
        editableRowIndex={editableRowIndex}
        pageSize={pageSize}
        pageIndex={pageIndex}
        patchRow={onPatch}
        cancelEditing={onCancel}
        setPaginationData={setPaginationData}
      />
    );

    expect(screen.queryByText('Сохранить')).not.toBeInTheDocument();
    expect(screen.queryByText('Отменить')).not.toBeInTheDocument();
    expect(screen.queryAllByRole('button')).toBeDefined();
  });
});
