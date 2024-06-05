export type SetPaginationDataCallback = (pageNumber: number) => void;

export type UseSetCurrentPageInPagination = (
  key: string,
  initialPage?: number
) => [pageIndex: number, setPaginationData: SetPaginationDataCallback];
