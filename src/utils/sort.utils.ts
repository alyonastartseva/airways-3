import { IDestination } from '@interfaces/search.interfaces';

export const sortDestinations = (
  destinations: IDestination[]
): IDestination[] => {
  return destinations.sort((a, b) => a.id - b.id);
};
