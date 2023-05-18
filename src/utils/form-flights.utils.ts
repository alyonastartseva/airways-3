import { IDestination } from '@/interfaces/destination.interfaces';
import { IFlightsForm, IFlightsPost } from '@/interfaces/flights.interfaces';

export const mapFlightsFormData = (data: IFlightsForm): IFlightsPost => {
  const { fromCityName, toCityName, ...dataRest } = data;

  const fromInfo: IDestination = JSON.parse(`${fromCityName}`);
  const toInfo: IDestination = JSON.parse(`${toCityName}`);

  const from = { from: fromInfo };
  const to = { to: toInfo };

  return Object.assign({}, from, to, dataRest);
};
