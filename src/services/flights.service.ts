import { AxiosResponse } from 'axios';

import { adminInstance } from '@/services/axios.service';
import ERoutes from '@/services/endpoints.service';
import {
  IFlightPresentation,
  IFlights,
  IFlightsForm,
  IFlightsPost,
  IFlightsUpdate,
} from '@/interfaces/flights.interfaces';
import { mapFlightsFormData } from '@/utils/form-flights.utils';
import { IListResponse } from '@/interfaces/response.intefaces';

interface IFlightsApi {
  getFlights: () => Promise<
    IListResponse<Required<IFlightPresentation>> | undefined
  >;
  postFlight: (data: IFlightsForm) => Promise<AxiosResponse<IFlights, any>>;
  deleteFlight: (
    id: number | undefined
  ) => Promise<AxiosResponse<IFlightPresentation> | undefined>;
  updateFlight: (
    data: IFlightsUpdate | null
  ) => Promise<AxiosResponse<IFlights> | undefined>;
}

const flightsAPI: IFlightsApi = {
  getFlights: async () => {
    return await adminInstance
      .get<IListResponse<Required<IFlightPresentation>>>(ERoutes.GET_FLIGHTS)
      .then((response) => response.data);
  },

  postFlight: async (data: IFlightsForm) => {
    const editedData: IFlightsPost = mapFlightsFormData(data);
    return await adminInstance.post<IFlights>(ERoutes.FLIGHTS, editedData);
  },

  deleteFlight: async (id: number | undefined) => {
    if (id) {
      return await adminInstance.delete<IFlights>(ERoutes.FLIGHTS + id);
    }
  },
  updateFlight: async (data) => {
    if (!data) return;
    const { id, ...body } = data;
    return await adminInstance.patch<IFlights>(ERoutes.FLIGHTS + id, body);
  },
};

export const { getFlights, postFlight, deleteFlight, updateFlight } =
  flightsAPI;
