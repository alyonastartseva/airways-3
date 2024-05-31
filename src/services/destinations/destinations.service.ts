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

const destinationsAPI = {
  getDestinationsByPage: async (pageIndex: number, size = ITEMS_PER_PAGE) => {
    return await adminInstance
      .get<IDestinationGet>(
        ERoutes.DESTINATION + `?page=${String(pageIndex)}&size=${size}`
      )
      .then((response) => {
        if (response.status === NO_CONTENT) return response.data;
        return response.data;
      });
  },

  getDestinationsByParams: async (query: IDestinationData) => {
    const url = `${ERoutes.DESTINATION}${getQueryString(query)}`;

    return await adminInstance.get<IDestinationGet>(url).then((response) => {
      if (response.status === NO_CONTENT) return response.data;
      return response.data;
    });
  },

  getDestinations: async () => {
    return await adminInstance
      .get<IDestinationGet>(ERoutes.DESTINATION)
      .then((response) => response.data);
  },

  patchDestinations: async (data: IDestination | null) => {
    if (data) {
      const { id, ...rest } = data;

      return await adminInstance.patch<IDestination>(
        ERoutes.DESTINATION + id,
        rest
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
