import { AxiosResponse } from 'axios';
import { UseMutateFunction } from 'react-query';

import { IFlightPresentation } from '@/interfaces/flights.interfaces';
import {
  useDeleteAircraftMutation,
  useDeleteDestinationMutation,
  useDeletePassengerMutation,
  useDeleteSeatMutation,
  useDeleteTimezoneMutation,
} from '@/store/services';

interface IPopoverTable<Data extends IFlightPresentation> {
  row: Data;
  index: number;
  id: number | undefined;
  hasDetailsButton?: boolean;
  handleEditRow(row?: Data | null, index?: number): void;
  deleteRow:
    | ReturnType<typeof useDeletePassengerMutation>[0]
    | ReturnType<typeof useDeleteAircraftMutation>[0]
    | ReturnType<typeof useDeleteSeatMutation>[0]
    | ReturnType<typeof useDeleteDestinationMutation>[0]
    | ReturnType<typeof useDeleteTimezoneMutation>[0]
    | UseMutateFunction<
        AxiosResponse<Data, any> | undefined,
        unknown,
        number | undefined,
        unknown
      >;
  setPaginationIndex?: (pageNumber: number) => void;
  indexPage?: number; // текущий индекс
  numberElem?: number; // общее кол-во элементов на страннице
}

interface RouteData {
  model?: string;
  id?: number;
}

export type { IPopoverTable, RouteData };
