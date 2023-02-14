export interface IPagination<Data> {
  data: Data[];
  pageSize: number;
  pageIndex: number;
  setPaginationData: (pageNumber: number) => void;
}
