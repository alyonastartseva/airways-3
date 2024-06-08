import { IGetQuery } from './api-interfaces';

export interface ITimeZone {
  id: number;
  countryName: string;
  cityName: string;
  gmt: string;
  gmtWinter: string;
}

export type TTimeZoneForm = Partial<Omit<ITimeZone, 'id'>>;

export type ITimezoneGet = IGetQuery<ITimeZone>;
