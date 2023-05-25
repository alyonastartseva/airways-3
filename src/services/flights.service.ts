import { AxiosResponse } from 'axios';

import { adminInstance } from '@/services/axios.service';
import ERoutes from '@/services/endpoints.service';
import {
  IFlights,
  IFlightsForm,
  IFlightsGet,
  IFlightsPost,
} from '@/interfaces/flights.interfaces';
import { mapFlightsFormData } from '@/utils/form-flights.utils';

interface IFlightsApi {
  getFlights: () => Promise<IFlightsGet | undefined>;
  postFlight: (data: IFlightsForm) => Promise<AxiosResponse<IFlights, any>>;
  deleteFlight: (
    id: number | undefined
  ) => Promise<AxiosResponse<IFlights> | undefined>;
}

const flightsAPI: IFlightsApi = {
  getFlights: async () => {
    return await adminInstance
      .get<IFlightsGet>(ERoutes.GET_FLIGHTS)
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
};

export const { getFlights, postFlight, deleteFlight } = flightsAPI;
