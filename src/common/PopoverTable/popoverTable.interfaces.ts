import { IFlightPresentation } from '@/interfaces/flights.interfaces';
import {
  useDeleteAircraftMutation,
  useDeleteDestinationMutation,
  useDeletePassengerMutation,
} from '@/store/services';

export interface IPopoverTable<Data extends IFlightPresentation> {
  row: Data;
  index: number;
  id: number | undefined;
  hasDetailsButton?: boolean;
  handleEditRow(row?: Data | null, index?: number): void;
  deleteRow:
    | ReturnType<typeof useDeletePassengerMutation>[0]
    | ReturnType<typeof useDeleteAircraftMutation>[0]
    | ReturnType<typeof useDeleteDestinationMutation>[0];
  setPaginationIndex?: (pageNumber: number) => void;
  indexPage?: number; // текущий индекс
  numberElem?: number; // общее кол-во элементов на страннице
}
