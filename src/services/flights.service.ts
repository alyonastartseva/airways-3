import { AxiosResponse } from 'axios';

import { adminInstance } from '@/services/axios.service';
import ERoutes from '@/services/endpoints.service';
import {
  IFlight,
  IFlightPost,
  IFlightPresentation,
  IFlightsUpdate,
} from '@/interfaces/flights.interfaces';
import { IListResponse } from '@/interfaces/response.interfaces';
import { ITEMS_PER_PAGE } from '@/constants/constants';
interface IFlightsApi {
  getFlights: (
    pageIndex?: number
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
  getFlights: async (pageIndex?: number) => {
    return await adminInstance
      .get<IListResponse<Required<IFlightPresentation>>>(
        ERoutes.GET_FLIGHTS +
          `?page=${String(pageIndex)}&size=${ITEMS_PER_PAGE}`
      )
      .then((response) => response.data);
  },


  postFlight: async (data) => {
    return await adminInstance.post<IFlight>(ERoutes.FLIGHTS, data);
  },

  deleteFlight: async (id: number | undefined) => {
    if (id) {
      return await adminInstance.delete<IFlight>(ERoutes.FLIGHTS + id);
    }
  },
  updateFlight: async (data) => {
    if (!data) return;
    const { id, ...body } = data;
    return await adminInstance.patch<IFlight>(ERoutes.FLIGHTS + id, body);
  },
};


export const { getFlights, postFlight, deleteFlight, updateFlight } =
  flightsAPI;
