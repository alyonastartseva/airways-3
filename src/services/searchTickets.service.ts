import { clientInstance } from '@/services';
import { ISearchData } from '@/interfaces';

export const searchApi = {
  async postSearch({
    airportFrom,
    airportTo,
    departureDate,
    numberOfPassengers,
    categoryOfSeats,
    returnDate,
  }: ISearchData) {
    try {
      const response = await clientInstance.get(
        `/search?airportFrom=${airportFrom}&airportTo=${airportTo}&departureDate=${departureDate}&numberOfPassengers=${numberOfPassengers}&categoryOfSeats=${categoryOfSeats}&returnDate=${returnDate}`
      );
      return response.data;
    } catch (error) {
      return { error: 'Ошибка поиска' };
    }
  },
};
