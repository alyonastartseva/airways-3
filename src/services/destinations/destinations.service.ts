import { ITEMS_PER_PAGE } from '@/constants/constants';
import { adminInstance } from '@/services/axios.service';
import { ERoutes } from '@/services/constants';
import { getQueryString } from '@/utils/get-query-string.utils';
import {
  IDestination,
  IDestinationData,
  IDestinationPost,
} from '@interfaces/destination.interfaces';

import { NO_CONTENT } from '../constants/server-codes.constants';

import { IDestinationGet } from './destinations.interfaces';

// временное решение, пока с бека не приходят необходимы свойства
const tempMapDestination = (data: IDestinationGet) => ({
  ...data,
  content: data.content.map((destination) => ({
    ...destination,
    countryName: '',
    cityName: '',
    airportName: '',
  })),
});

const destinationsAPI = {
  getDestinationsByPage: async (pageIndex: number, size = ITEMS_PER_PAGE) => {
    return await adminInstance
      .get<IDestinationGet>(
        ERoutes.DESTINATION + `?page=${String(pageIndex)}&size=${size}`
      )
      .then((response) => {
        if (response.status === NO_CONTENT) return response.data;
        return tempMapDestination(response.data);
      });
  },

  getDestinationsByParams: async (query: IDestinationData) => {
    const url = `${ERoutes.DESTINATION}${getQueryString(query)}`;

    return await adminInstance.get<IDestinationGet>(url).then((response) => {
      if (response.status === NO_CONTENT) return response.data;
      return tempMapDestination(response.data);
    });
  },

  getDestinations: async () => {
    return await adminInstance
      .get<IDestinationGet>(ERoutes.DESTINATION)
      .then((response) => tempMapDestination(response.data));
  },

  patchDestinations: async (data: IDestination | null) => {
    if (data) {
      const { id, ...rest } = data;
      // // TODO: удалить temp когда сервер будет принимать данные
      const temp = { airportCode: rest.airportCode, timezone: rest.timezone };
      return await adminInstance.patch<IDestination>(
        ERoutes.DESTINATION + id,
        // TODO: поменять на rest когда сервер будет принимать данные
        temp
      );
    }
  },

  deleteDestination: async (id: number | undefined) => {
    if (id) {
      return await adminInstance.delete<IDestination>(ERoutes.DESTINATION + id);
    }
  },

  postDestinations: async (data: IDestinationPost) => {
    return await adminInstance.post<IDestinationPost>(
      ERoutes.DESTINATION,
      data
    );
  },
};

export const {
  getDestinationsByPage,
  getDestinationsByParams,
  getDestinations,
  patchDestinations,
  postDestinations,
  deleteDestination,
} = destinationsAPI;
