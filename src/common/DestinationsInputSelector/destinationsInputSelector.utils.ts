import { IDestinationGet } from '@/interfaces/destination.interfaces';

export const normalizeDestinations = (destinations: IDestinationGet) => {
  const { content, last, number } = destinations;
  const airports =
    (destinations &&
      content.map((item) => ({
        code: item.airportCode,
        name: item.airportName,
      }))) ||
    null;
  return {
    airports,
    last: typeof last === 'boolean' ? last : true,
    number: typeof number === 'number' ? number : 0,
  };
};
