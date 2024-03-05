export type SetPaginationDataCallback = (pageNumber: number) => void;

export type UseSetCurrentPageInPagination = (
  key: string
) => [pageIndex: number, setPaginationData: SetPaginationDataCallback];
