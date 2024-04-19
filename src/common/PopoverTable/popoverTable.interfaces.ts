import { AxiosResponse } from 'axios';
import { UseMutateFunction } from 'react-query';

import { IFlightPresentation } from '@/interfaces/flights.interfaces';

export interface IPopoverTable<Data extends IFlightPresentation> {
  row: Data;
  index: number;
  id: number | undefined;
  hasDetailsButton?: boolean;
  handleEditRow(row?: Data | null, index?: number): void;
  deleteRow: UseMutateFunction<
    AxiosResponse<Data, any> | undefined,
    unknown,
    number | undefined,
    unknown
  >;
  setPaginationIndex?: (pageNumber: number) => void;
  indexPage?: number; // текущий индекс
  numberElem?: number; // общее кол-во элементов на страннице
}
