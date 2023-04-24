import { IDestination } from './destination.interfaces';

export type TFlightsStatus =
  | 'DELAYED'
  | 'DEPARTED'
  | 'CANCELED'
  | 'COMPLETED'
  | 'ARRIVED'
  | 'ON_TIME';

export type IFlightsPost = {
  code: string;
  from: IDestination;
  to: IDestination;
  departureDateTime: string;
  arrivalDateTime: string;
  aircraftId: number;
  flightStatus: TFlightsStatus;
};

export interface IFlights extends IFlightsPost {
  id: number;
}
