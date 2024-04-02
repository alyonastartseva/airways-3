import { FieldValues } from 'react-hook-form';

import { bookingStatuses } from '@constants/constants';

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

export type TBookingStatus = (typeof bookingStatuses)[number];
