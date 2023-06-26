import { FieldValues } from 'react-hook-form';

import { IDestination } from './destination.interfaces';
import { IAircraft } from './aircraft.interfaces';

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

export interface IFlight {
  aircraft: IAircraft;
  arrivalDateTime: string;
  code: string;
  departureDateTime: string;
  flightStatus: TFlightsStatus;
  from: IDestination;
  to: IDestination;
  id: number;

  //**  TODO: add below fields:
  /* seats: IFlightSeat[]
  /* booking: IBooking[]
  /* Ticket: ITicket[]
  */
}

export interface IFlightPresentation {
  aircraftId?: number;
  airportFrom?: string;
  airportTo?: string;
  arrivalDateTime?: string;
  code?: string;
  departureDateTime?: string;
  flightStatus?: TFlightsStatus;
  id: number;
}
