export interface IPagination<Data> {
  data: Data[] | undefined;
  pageIndex: number;
  totalPages?: number;
  setPaginationData: (pageNumber: number) => void;
}

export type SetPaginationDataCallback = (pageNumber: number) => void;

export type UseSetCurrentPageInPagination = (
  key: string
) => [pageIndex: number, setPaginationData: SetPaginationDataCallback];
