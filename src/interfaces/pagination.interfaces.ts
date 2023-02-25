export interface IPagination<Data> {
  data: Data[] | undefined;
  pageSize: number;
  pageIndex: number;
  setPaginationData: (pageNumber: number) => void;
}
