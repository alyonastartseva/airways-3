export type SetPaginationDataCallback = (pageNumber: number) => void;

export type UseSetCurrentPageInPagination = (
  key: string,
  initialPage?: number
) => [number, (pageNumber: number | undefined) => void];
