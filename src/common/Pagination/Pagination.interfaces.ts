export interface IPagination {
  pageIndex: number;
  totalPages?: number;
  setPaginationData: (pageNumber: number) => void;
}
