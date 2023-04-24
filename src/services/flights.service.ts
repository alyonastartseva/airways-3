import { AxiosResponse } from 'axios';

import { adminInstance } from '@/services/axios.service';
import ERoutes from '@/services/endpoints.service';
import { IFlights, IFlightsPost } from '@/interfaces/flights.interfaces';

interface IFlightsApi {
  getFlights: () => Promise<IFlights[] | undefined>;
  postFlight: (
    data: IFlightsPost
  ) => Promise<AxiosResponse<IFlightsPost, Error>>;
  deleteFlight: (
    id: number | undefined
  ) => Promise<AxiosResponse<IFlights> | undefined>;
}

const flightsAPI: IFlightsApi = {
  getFlights: async () => {
    return await adminInstance
      .get<IFlights[]>(ERoutes.GET_FLIGHTS)
      .then((response) => response.data);
  },

  postFlight: async (data: IFlightsPost) => {
    return await adminInstance.post<IFlightsPost>(ERoutes.FLIGHTS, data);
  },

  deleteFlight: async (id: number | undefined) => {
    if (id) {
      return await adminInstance.delete<IFlights>(ERoutes.FLIGHTS + id);
    }
  },
};

export const { getFlights, postFlight, deleteFlight } = flightsAPI;
