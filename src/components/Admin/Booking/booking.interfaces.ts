import { ISeatCategory } from '@/interfaces/flightsSeats.interfaces';

export interface IBooking {
  id: number;
  bookingNumber: string;
  bookingData: string;
  passengerId: number;
  flightId: number;
  categoryType: ISeatCategory;
}
