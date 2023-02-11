import { TPlane } from '@/interfaces/plane.interfaces';
import { TPerson } from '@/interfaces/person.interfaces';

import { IDestination } from './search.interfaces';

export interface IPagination {
  data: TPlane[] | TPerson[] | IDestination[];
  pageSize: number;
  pageIndex: number;
  setPaginationData: (pageNumber: number) => void;
}
