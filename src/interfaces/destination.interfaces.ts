import { FieldValues } from 'react-hook-form';

import { IGetQuery, IGetQueryArgs } from './api-interfaces';

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

export interface IDestinationList {
  code?: string;
  name?: string;
}

export interface IDestinationData extends IGetQueryArgs {
  cityName?: string;
  countryName?: string;
  timezone?: string;
}

export type IDestinationGet = IGetQuery<IDestination>;
