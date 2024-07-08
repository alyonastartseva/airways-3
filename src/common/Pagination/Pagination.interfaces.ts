export interface IPagination {
  pageIndex: number;
  totalPages?: number;
  setPaginationData: (pageNumber: number) => void;
}
export interface IPaginationBooking {
  totalPages: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (pageIndex: number) => void;
}
