import { IDestination } from '@/interfaces';

import { ISeatCategoryType } from './seat.interfaces';

export type TDestQuery = Omit<IDestination, 'id'>;

export interface ISearchData {
  departureDate: string;
  airportFrom: string;
  numberOfPassengers: number | null;
  returnDate?: string;
  airportTo: string;
  categoryOfSeats: ISeatCategoryType;
  directFlightsOnly: boolean;
  tripType: string;
}
