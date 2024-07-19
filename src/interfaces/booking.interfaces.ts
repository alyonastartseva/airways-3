import { FieldValues } from 'react-hook-form';

import { bookingStatuses } from '@/constants';

export interface IBooking {
  id: number;
  bookingDate: string;
  passengerId: number;
  flightSeatId: number;
  bookingStatus: TBookingStatus;
}

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

export interface BookingResponse {
  id: number;
  passengerId: number;
  bookingDate: string;
  bookingStatus: TBookingStatus;
  flightSeatId: number;
  flightId: number;
}
