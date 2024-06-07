import { AxiosResponse } from 'axios';

import { adminInstance, ERoutes } from '@/services';
import { ITEMS_PER_PAGE } from '@/constants';
import {
  IFlightSeatsPost,
  IFSOne,
  TFormFlightSeats,
} from '@/interfaces/flightsSeats.interfaces';

import { IListResponse } from '../flights/flights.interfaces';

interface IFlightSeatsApi {
  getFlightsSeats: (
    pageIndex: number,
    size: number,
    flightId?: number
  ) => Promise<IListResponse<Required<IFSOne>>>;

  deleteFlightSeats: (
    id: number | undefined
  ) => Promise<AxiosResponse<IFSOne> | undefined>;

  postFlightSeats: (
    data: IFlightSeatsPost
  ) => Promise<AxiosResponse<IFlightSeatsPost, any>>;

  updateFlightSeats: (
    data: IFSOne | undefined
  ) => Promise<AxiosResponse<IFSOne> | undefined>;
}

const flightSeatsAPI: IFlightSeatsApi = {
  getFlightsSeats: async (
    pageIndex,
    size = ITEMS_PER_PAGE,
    flightId?: number
  ) => {
    if (flightId) {
      return await adminInstance
        .get<
          IListResponse<Required<IFSOne>>
        >(`${ERoutes.FLIGHT_SEATS}?flightId=${flightId}`)
        .then((response) => response.data);
    }
    return await adminInstance
      .get<
        IListResponse<Required<IFSOne>>
      >(`${ERoutes.FLIGHT_SEATS}?page=${pageIndex}&size=${size}`)
      .then((response) => response.data);
  },

  deleteFlightSeats: async (id) => {
    if (id) {
      return adminInstance.delete<IFSOne>(ERoutes.FLIGHT_SEATS + id);
    }
  },

  updateFlightSeats: async (data) => {
    if (!data) return;
    const { id, ...body } = data;
    return await adminInstance.patch<IFSOne>(ERoutes.FLIGHT_SEATS + id, body);
  },

  postFlightSeats: async (data: IFlightSeatsPost) => {
    return await adminInstance.post<IFlightSeatsPost>(
      ERoutes.FLIGHT_SEATS,
      data
    );
  },
};

export const {
  getFlightsSeats,
  deleteFlightSeats,
  postFlightSeats,
  updateFlightSeats,
} = flightSeatsAPI;
