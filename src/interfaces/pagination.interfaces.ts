import { TPlane } from '@/interfaces/plane.interfaces';
import { TPerson } from '@/interfaces/person.interfaces';

export interface IPagination {
  data: TPlane[] | TPerson[];
  pageSize: number;
  pageIndex: number;
  setPaginationData: (pageNumber: number) => void;
}
