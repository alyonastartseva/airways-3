import { FieldValues } from 'react-hook-form';

import { ISort } from '@interfaces/api-interfaces';
import { ISeatCategory } from '@interfaces/seat.interfaces';
import {
  IFlightSeats,
  IFlightSeatsPresentation,
} from '@/interfaces/flightsSeats.interfaces';

import { ISeat } from '../seat/seat.interfaces';

export interface IFlightSeatsQuery {
  content: IFlightSeats[];
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

export interface IFlightSeatPost {
  flightId: number;
  code: string;
  seat: { seatNumber: string; category: string };
  fare: number;
  isSold: boolean;
  isRegistered: boolean;
  isBooked: boolean;
}

export interface IFlightSeatForm extends FieldValues {
  code: string;
  id?: number;
  fare: number;
  isRegistered: boolean;
  isSold: boolean;
  isBooked: boolean;
  flightId: number;
  seat: { seatNumber: string; category: string };
}
