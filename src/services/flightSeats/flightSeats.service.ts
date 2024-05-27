import { adminInstance, ERoutes } from '@/services';
import { ISeats } from '@/interfaces/flightsSeats.interfaces';

import { IFlightSeatsQuery } from './flightSeats.interfaces';

const flightSeatsAPI = {
  getFlightsSeats: async (pageIndex?: number, size?: number) => {
    return await adminInstance
      .get<IFlightSeatsQuery>(
        `${ERoutes.FLIGHT_SEATS}?page=${pageIndex}&size=${size}`
      )
      .then((response) => response.data);
  },

  deleteFlightSeats: async (id: number | undefined) => {
    if (id) {
      return adminInstance.delete<ISeats>(ERoutes.FLIGHT_SEATS + id);
    }
  },
};

export const { getFlightsSeats, deleteFlightSeats } = flightSeatsAPI;
