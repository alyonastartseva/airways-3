export type SetPaginationDataCallback = (pageNumber: number) => void;

export type UseSetCurrentPageInPagination = (
  key: string,
  initialPage?: number
) => [pageIndex: number, setPaginationData: SetPaginationDataCallback];

export interface IPagination {
  totalPages: number;
  currentPage: number;
  pageSize: number;
  onPageChange: SetPaginationDataCallback;
}
