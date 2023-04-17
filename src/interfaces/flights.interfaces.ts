import { IDestination } from './destination.interfaces';

type TFlightsStatus =
  | 'DELAYED'
  | 'DEPARTED'
  | 'CANCELED'
  | 'COMPLETED'
  | 'ARRIVED'
  | 'ON_TIME';

export interface IFlights {
  aircraftId: number | string;
  arrivalDateTime: string; // 2023-04-10T12:50:09.491Z
  code: string;
  departureDateTime: string;
  flightStatus: TFlightsStatus;
  id: number;
  from: IDestination;
  to: IDestination;
}

export type TFlightsPost = Omit<IFlights, 'id'>;
