interface IFooterTable<Data> {
  data: Data[] | undefined;
  editableRowIndex: number | null;
  pageIndex: number;
  totalPages?: number;
  cancelEditing(): void;
  patchRow(): void;
  setPaginationData(pageNumber: number): void;
}

export type { IFooterTable };
