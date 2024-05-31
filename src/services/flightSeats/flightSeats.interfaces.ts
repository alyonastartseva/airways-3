import { ISort, TSeatCategory } from '@/interfaces';

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
  category: TSeatCategory;
}

export interface Seat {
  id: number;
  seatNumber: string;
  isNearEmergencyExit: boolean;
  isLockedBack: boolean;
  category: string;
  aircraftId: number;
}