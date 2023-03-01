import { IAirplane } from '@/interfaces/plane.interfaces';
import { IDestination } from '@interfaces/search.interfaces';

export const sortDestinations = (
  destinations: IDestination[]
): IDestination[] => {
  return destinations.sort((a, b) => a.id - b.id);
};

export const sortAirplanes = (airplanes: IAirplane[]): IAirplane[] => {
  return airplanes.sort((a, b) => a.id - b.id);
};
