import { TSeatCategory } from '@interfaces/seat.interfaces';

export interface IBooking {
  id: number;
  bookingNumber: string;
  bookingData: string;
  passengerId: number;
  flightId: number;
  categoryType: TSeatCategory;
}
