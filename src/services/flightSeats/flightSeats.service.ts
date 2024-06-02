import { Axios, AxiosResponse } from 'axios';

import { adminInstance, ERoutes } from '@/services';
import { IFlightSeats } from '@/interfaces/flightsSeats.interfaces';
import { ITEMS_PER_PAGE } from '@/constants';

import { IListResponse } from '../flights/flights.interfaces';

import {
  IFlightSeat,
  IFlightSeatPost,
  IFlightSeatsQuery,
} from './flightSeats.interfaces';

interface IFlightSeatsApi {
  getFlightsSeats: (
    pageIndex: number,
    size: number
  ) => Promise<IListResponse<Required<IFlightSeats>>>;

  deleteFlightSeats: (
    id: number | undefined
  ) => Promise<AxiosResponse<IFlightSeats> | undefined>;

  postFlightSeats: (
    data: IFlightSeatPost
  ) => Promise<AxiosResponse<IFlightSeatPost, any>>;
}

const flightSeatsAPI: IFlightSeatsApi = {
  getFlightsSeats: async (pageIndex, size = ITEMS_PER_PAGE) => {
    return await adminInstance
      .get<IListResponse<Required<IFlightSeats>>>(
        `${ERoutes.FLIGHT_SEATS}?page=${pageIndex}&size=${size}`
      )
      .then((response) => response.data);
  },

  deleteFlightSeats: async (id) => {
    if (id) {
      return adminInstance.delete<IFlightSeats>(ERoutes.FLIGHT_SEATS + id);
    }
  },

  postFlightSeats: async (data) => {
    return await adminInstance.post<IFlightSeatPost>(
      ERoutes.FLIGHT_SEATS,
      data
    );
  },
};

export const { getFlightsSeats, deleteFlightSeats, postFlightSeats } =
  flightSeatsAPI;
