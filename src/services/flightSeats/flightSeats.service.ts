import { adminInstance } from '@services/axios.service';
import { IFlightSeatsQuery } from '@services/flightSeats/flightSeats.interfaces';
import { ERoutes } from '@services/constants';

const flightSeatsAPI = {
  getFlightsSeats: async () => {
    return await adminInstance
      .get<IFlightSeatsQuery>(ERoutes.FLIGHT_SEATS)
      .then((response) => response.data);
  },
};

export const { getFlightsSeats } = flightSeatsAPI;
