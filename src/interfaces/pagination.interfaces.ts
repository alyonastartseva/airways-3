export interface IPagination<Data> {
  data: Data[] | undefined;
  pageSize: number;
  pageIndex: number;
  totalPages?: number;
  setPaginationData: (pageNumber: number) => void;
}
