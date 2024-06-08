export interface ISort {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

export interface IGetQuery<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  pageable: {
    sort: ISort;
    pageNumber: number;
    pageSize: number;
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  last: boolean;
  first: boolean;
  sort: ISort;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}

export interface IGetQueryArgs {
  page?: number;
  size?: number;
}
