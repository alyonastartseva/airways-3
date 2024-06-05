import { adminInstance, ERoutes } from '@/services';

import { IFlightSeatsQuery } from './flightSeats.interfaces';

const flightSeatsAPI = {
  getFlightsSeats: async () => {
    return await adminInstance
      .get<IFlightSeatsQuery>(ERoutes.FLIGHT_SEATS)
      .then((response) => response.data);
  },
};

export const { getFlightsSeats } = flightSeatsAPI;
