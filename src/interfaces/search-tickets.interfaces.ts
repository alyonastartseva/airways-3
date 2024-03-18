import { IDestination } from '@interfaces/destination.interfaces';
import { TSeatCategory } from '@interfaces/seat.interfaces';

export type TDestQuery = Omit<IDestination, 'id'>;

export interface ISearchData {
  departureDate: string;
  airportFrom: string;
  numberOfPassengers: number;
  returnDate?: string;
  airportTo: string;
  categoryOfSeats: TSeatCategory;
}
