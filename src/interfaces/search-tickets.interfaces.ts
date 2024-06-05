import { IDestination, TSeatCategory } from '@/interfaces';

export type TDestQuery = Omit<IDestination, 'id'>;

export interface ISearchData {
  departureDate: string;
  airportFrom: string;
  numberOfPassengers: number | null;
  returnDate?: string;
  airportTo: string;
  categoryOfSeats: TSeatCategory;
  directFlightsOnly: boolean;
  tripType: string;
}
