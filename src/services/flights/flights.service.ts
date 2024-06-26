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
      >(ERoutes.GET_FLIGHTS + `?page=${pageIndex?+pageIndex+1:''}&size=${size}`)
      .then((response) => response.data);
  },

  postFlight: async (data) => {
    // console.log(data);
    // return fetch('http://92.118.114.29:8080/api/flights', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     "id": 2727,
    //     "code": "string",
    //     "airportFrom": "AAQ",
    //     "airportTo": "AAQ",
    //     "departureDateTime": "2024-06-26T17:00:32.925Z",
    //     "arrivalDateTime": "2024-06-27T17:00:32.925Z",
    //     "aircraftId": 7,
    //     "flightStatus": "DELAYED"
    //   }),
    // }).then((res) => {
    //   console.log(res)
    //   return res.json()
    // }).then((res) => {
    //   console.log(res)
    //   return res
    // })
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
