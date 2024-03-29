import { IDestination } from '@/interfaces/destination.interfaces';
import {
  IFlightPost,
  IFlightPostFormFields,
} from '@/interfaces/flights.interfaces';

export const mapFlightFormToRequestData = (
  formData: IFlightPostFormFields
): IFlightPost => {
  const { from, to, ...rest } = formData;
  const airportFrom = (JSON.parse(from || '') as IDestination).airportCode;
  const airportTo = (JSON.parse(to || '') as IDestination).airportCode;

  return {
    id: 0,
    airportFrom,
    airportTo,
    ...rest,
  } as IFlightPost;
};
