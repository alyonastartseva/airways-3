import { IAircraft } from '@interfaces/aircraft.interfaces';
import { IDestination } from '@interfaces/destination.interfaces';

export const sortDestinations = (
  destinations: IDestination[]
): IDestination[] => {
  return destinations.sort((a, b) => a.id - b.id);
};

export const sortAirplanes = (airplanes: IAircraft[]): IAircraft[] => {
  return airplanes.sort((a, b) => a.id - b.id);
};
