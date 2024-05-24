import { IFlightPresentation } from '@/interfaces';

export type DataToType = {
  airportFrom: string;
  airportTo: string;
  arrivalDateTime: string;
  cityFrom: string;
  cityTo: string;
  departureDateTime: string;
  flightSeatId: number;
  flightTime: string;
};

export interface ISearchRadioData {
  departFlight: IFlightPresentation[];
  returnFlight?: IFlightPresentation[];
}
