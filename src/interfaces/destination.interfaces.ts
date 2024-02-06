import { FieldValues } from 'react-hook-form';

import { IGetQuery } from './api-interfaces';

export interface IDestination {
  id: number;
  airportCode?: string;
  airportName?: string;
  cityName?: string;
  timezone?: string;
  countryName?: string;
}

export type IDestinationGet = IGetQuery<IDestination>;

export interface IDestinationPost extends FieldValues {
  countryName?: string;
  cityName?: string;
  airportName?: string;
  airportCode?: string;
  timezone?: string;
}
