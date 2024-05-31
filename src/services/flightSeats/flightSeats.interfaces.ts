import { FieldValues } from 'react-hook-form';

import { ISort } from '@interfaces/api-interfaces';
import { ISeatCategory } from '@interfaces/seat.interfaces';
import { IFlightSeatsPresentation } from '@/interfaces/flightsSeats.interfaces';

import { ISeat } from '../seat/seat.interfaces';

export interface IFlightSeatsQuery {
  content: IFlightSeat[];
  pageable: string;
  totalElements: number;
  totalPages: number;
  last: boolean;
  sort: ISort;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}

export interface IFlightSeat {
  id: number;
  fare: number;
  isRegistered: boolean;
  isSold: boolean;
  isBooked?: boolean;
  flightId: number;
  seat: Seat;
  category: ISeatCategory;
}

export interface Seat {
  id: number;
  seatNumber: string;
  isNearEmergencyExit: boolean;
  isLockedBack: boolean;
  category: string;
  aircraftId: number;
}

export interface IFlightSeatsPostFormFields
  extends FieldValues,
    Omit<IFlightSeatsPresentation, 'fare' | 'airportTo'> {
  from?: string; // stringyfied IDestination
  to?: string; // stringyfied IDestination
}
