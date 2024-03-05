export interface IPagination<Data> {
  data: Data[] | undefined;
  pageIndex: number;
  totalPages?: number;
  setPaginationData: (pageNumber: number) => void;
}
