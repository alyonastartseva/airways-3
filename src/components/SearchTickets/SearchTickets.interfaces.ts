import { IFlightPresentation } from '@/interfaces/flights.interfaces';

export interface ISearchRadioData {
  departFlight: IFlightPresentation[];
  returnFlight?: IFlightPresentation[];
}
