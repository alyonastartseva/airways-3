import { TPerson } from './person.interfaces';
import { TPlane } from './plane.interfaces';
import { IDestination } from './search.interfaces';

export type TData = TPlane | TPerson | IDestination;

export interface IPagination<Data> {
  data: Data[];
  pageSize: number;
  pageIndex: number;
  setPaginationData: (pageNumber: number) => void;
}
