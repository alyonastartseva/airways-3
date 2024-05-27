import { adminInstance } from '@services/axios.service';
import {
  IFlightSeat,
  IFlightSeatsQuery,
} from '@services/flightSeats/flightSeats.interfaces';
import { ERoutes } from '@services/constants';
import { ISeats } from '@/interfaces/flightsSeats.interfaces';

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
