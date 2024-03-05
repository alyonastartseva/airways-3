import { FieldValues } from 'react-hook-form';

export interface IDestination {
  id: number;
  airportCode?: string;
  airportName?: string;
  cityName?: string;
  timezone?: string;
  countryName?: string;
}

export interface IDestinationPost extends FieldValues {
  countryName?: string;
  cityName?: string;
  airportName?: string;
  airportCode?: string;
  timezone?: string;
}
