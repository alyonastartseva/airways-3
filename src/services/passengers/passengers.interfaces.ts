import { IPassenger, ISort } from '@/interfaces';

export interface FormPassengersGet {
  content: IPassenger[];
  totalPages: number;
  pageable: {
    sort: ISort;
    pageNumber: number;
    pageSize: number;
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  last: boolean;
  totalElements: number;
  first: boolean;
  sort: ISort;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}
