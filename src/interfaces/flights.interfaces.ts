import { FieldValues } from 'react-hook-form';

import { IDestination } from './destination.interfaces';

export type TFlightsStatus =
  | 'DELAYED'
  | 'DEPARTED'
  | 'CANCELED'
  | 'COMPLETED'
  | 'ARRIVED'
  | 'ON_TIME';

export interface IFlightsPost {
  code?: string;
  from?: IDestination;
  to?: IDestination;
  departureDateTime?: string;
  arrivalDateTime?: string;
  aircraftId?: number;
  flightStatus?: TFlightsStatus;
}

export interface IFlights extends Required<IFlightsPost> {
  id: number;
}

export interface IFlightsGet {
  content: IFlights[];
}

export interface IFlightsForm extends FieldValues {
  code?: string;
  fromCityName?: string;
  toCityName?: string;
  departureDateTime?: string;
  arrivalDateTime?: string;
  aircraftId?: number;
  flightStatus?: TFlightsStatus;
}

export interface IFlightsUpdate extends Partial<IFlightsPost> {
  id: number;
}
