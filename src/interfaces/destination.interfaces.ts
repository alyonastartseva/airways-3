export interface IDestination {
  id: number;
  airportCode?: string;
  airportName?: string;
  cityName?: string;
  timezone?: string;
  countryName?: string;
}

export type IDestinationPost = {
  countryName?: string;
  cityName?: string;
  airportName?: string;
  airportCode?: string;
  timezone?: string;
};
