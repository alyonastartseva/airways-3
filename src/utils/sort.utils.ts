import { IAircraft } from '@interfaces/aircraft.interfaces';
import { IDestination } from '@interfaces/destination.interfaces';
import { ISeat } from '@interfaces/seat.interfaces';

export const sortDestinations = (
  destinations: IDestination[]
): IDestination[] => {
  return destinations.sort((a, b) => a.id - b.id);
};

export const sortAirplanes = (airplanes: IAircraft[]): IAircraft[] => {
  return airplanes.sort((a, b) => a.id - b.id);
};

export const sortSeat = (seat: ISeat[]): ISeat[] => {
  return seat.sort((a, b) => a.id - b.id);
};
