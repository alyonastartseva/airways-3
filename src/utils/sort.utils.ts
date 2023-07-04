import { IAircraft } from '@interfaces/aircraft.interfaces';
import { IDestination } from '@interfaces/destination.interfaces';
import { ISeat } from '@interfaces/seat.interfaces';
import { ITickets } from '@/interfaces/tickets.interface';

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

export const ticketsSort = (tickets: ITickets[]): ITickets[] => {
  return tickets.sort((a, b) => a.id - b.id);
};