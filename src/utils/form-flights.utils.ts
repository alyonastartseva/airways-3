import { IDestination } from '@/interfaces/destination.interfaces';
import {
  IFlightPost,
  IFlightPostFormFields,
} from '@/interfaces/flights.interfaces';

export const mapFlightFormToRequestData = (
  formData: IFlightPostFormFields
): IFlightPost => {
  const airportFrom = (JSON.parse(formData.from || '') as IDestination)
    .airportCode;
  const airportTo = (JSON.parse(formData.to || '') as IDestination).airportCode;
  return { airportFrom, airportTo, ...formData } as IFlightPost;
};
