export interface ITimeZone {
  id: number;
  countryName: string;
  cityName: string;
  gmt: string;
  gmtWinter: string;
}

export type TTimeZoneForm = Partial<Omit<ITimeZone, 'id'>>;
