import { AxiosResponse } from 'axios';

import { ITEMS_PER_PAGE } from '@/constants';
import { adminInstance, ERoutes } from '@/services';
import { IFlight, IFlightPost, IFlightPresentation } from '@/interfaces';

import { IFlightsUpdate, IListResponse } from './flights.interfaces';

interface IFlightsApi {
  getFlights: (
    pageIndex?: number,
    size?: number
  ) => Promise<IListResponse<Required<IFlightPresentation>> | undefined>;
  postFlight: (data: IFlightPost) => Promise<AxiosResponse<IFlight, any>>;
  deleteFlight: (
    id: number | undefined
  ) => Promise<AxiosResponse<IFlightPresentation> | undefined>;
  updateFlight: (
    data: IFlightsUpdate | null
  ) => Promise<AxiosResponse<IFlight> | undefined>;
}

const flightsAPI: IFlightsApi = {
  getFlights: async (pageIndex?: number, size = ITEMS_PER_PAGE) => {
    return await adminInstance
      .get<
        IListResponse<Required<IFlightPresentation>>
      >(`${ERoutes.FLIGHTS}?page=${pageIndex ?? '0'}&size=${size}`)
      .then((response) => response.data);
  },

  postFlight: async (data: IFlightPost) => {
    return await adminInstance.post<IFlight>(ERoutes.FLIGHTS, data);
  },

  deleteFlight: async (id: number | undefined) => {
    if (id) {
      return await adminInstance.delete<IFlight>(`${ERoutes.FLIGHTS}/${id}`);
    }
  },

  updateFlight: async (data: IFlightsUpdate | null) => {
    if (!data) return;
    const { id, ...body } = data;
    return await adminInstance.patch<IFlight>(`${ERoutes.FLIGHTS}/${id}`, body);
  },
};

export const { getFlights, postFlight, deleteFlight, updateFlight } =
  flightsAPI;
