import { FieldValues } from 'react-hook-form';

import { IDestination, IAircraft } from '@/interfaces';

export type TFlightsStatus =
  | 'DELAYED'
  | 'DEPARTED'
  | 'CANCELED'
  | 'COMPLETED'
  | 'ARRIVED'
  | 'ON_TIME';

export interface IFlight {
  aircraft?: IAircraft;
  arrivalDateTime: string;
  code: string;
  departureDateTime: string;
  flightStatus: TFlightsStatus;
  from: IDestination;
  to: IDestination;
  id: number;
  aircraftId?: number;
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
  id?: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IFlightPost extends Omit<IFlightPresentation, 'id'> {}

export interface IFlightPostFormFields
  extends FieldValues,
    Omit<IFlightPost, 'airportFrom' | 'airportTo'> {
  from?: string; // stringyfied IDestination
  to?: string; // stringyfied IDestination
}
