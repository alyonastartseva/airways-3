import { adminInstance } from '@services/axios.service';
import { IFlightSeatsQuery } from '@services/flightSeats/flightSeats.interfaces';
import { ERoutes } from '@services/constants';

const flightSeatsAPI = {
  getFlightsSeats: async (pageIndex?: number, size?: number) => {
    return await adminInstance
      .get<IFlightSeatsQuery>(
        `${ERoutes.FLIGHT_SEATS}?page=${pageIndex}&size=${size}`
      )
      .then((response) => response.data);
  },
};

export const { getFlightsSeats } = flightSeatsAPI;
