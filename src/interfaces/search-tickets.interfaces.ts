import { IDestination } from '@interfaces/destination.interfaces';

import { IFlights } from './flights.interfaces';

export type TDestQuery = Omit<IDestination, 'id'>;

export interface ISearchData {
  departureDate: string;
  from: TDestQuery;
  numberOfPassengers: number;
  returnDate: string;
  to: TDestQuery;
}

export interface IDates {
  departureDate: Date | null;
  returnDate?: Date | null;
}

export interface ISearchRadioData {
  departFlight: IFlights[];
  returnFlight?: IFlights[];
}