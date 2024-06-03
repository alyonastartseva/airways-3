import { Axios, AxiosResponse } from 'axios';

import { adminInstance, ERoutes } from '@/services';
import { ITEMS_PER_PAGE } from '@/constants';
import {
  IFSForm,
  IFSOne,
  IFSpostField,
  TFormFlightSeats,
} from '@/interfaces/flightsSeats.interfaces';

import { IListResponse } from '../flights/flights.interfaces';

interface IFlightSeatsApi {
  getFlightsSeats: (
    pageIndex: number,
    size: number
  ) => Promise<IListResponse<Required<IFSOne>>>;

  deleteFlightSeats: (
    id: number | undefined
  ) => Promise<AxiosResponse<IFSOne> | undefined>;

  postFlightSeats: (
    data: TFormFlightSeats
  ) => Promise<AxiosResponse<TFormFlightSeats, any>>;
}

const flightSeatsAPI: IFlightSeatsApi = {
  getFlightsSeats: async (pageIndex, size = ITEMS_PER_PAGE) => {
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

  postFlightSeats: async (data: TFormFlightSeats) => {
    return await adminInstance.post<TFormFlightSeats>(
      ERoutes.FLIGHT_SEATS,
      data
    );
  },
};

export const { getFlightsSeats, deleteFlightSeats, postFlightSeats } =
  flightSeatsAPI;
