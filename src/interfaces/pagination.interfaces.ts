export type SetPaginationDataCallback = (pageNumber: number) => void;

export type UseSetCurrentPageInPagination = (
  key: string
) => [number, (pageNumber: number | undefined) => void];
