import { FieldValues } from 'react-hook-form';

import { bookingStatuses } from '@/constants';

export interface IFormBooking extends FieldValues {
  flightSeatId?: number;
  passengerId?: number;
  bookingStatus?: TBookingStatus;
}
export interface FormBookingPost {
  flightSeatId?: number;
  passengerId?: number;
  status?: TBookingStatus;
}
export type TBookingStatus = (typeof bookingStatuses)[number];

export interface IBooking {
  id: number;
  passengerId: number;
  bookingDate: string;
  bookingStatus: TBookingStatus;
  flightSeatId: number;
  flightId: number;
}

interface ISort {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
}

interface IPageable {
  paged: boolean;
  unpaged: boolean;
  pageNumber: number;
  pageSize: number;
  offset: number;
  sort: ISort[];
}

export interface BookingResponse {
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  numberOfElements: number;
  content: IBooking[];
  sort: ISort[];
  first: boolean;
  last: boolean;
  pageable: IPageable;
  empty: boolean;
}
