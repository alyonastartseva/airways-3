import { axiosInstance } from '@services/axios';
import ERoutes from '@services/endpoints';
import {
  IDestination,
  IDestinationPost,
} from '@interfaces/destination.interfaces';

const destinationsAPI = {
  getDestinations: async () => {
    return await axiosInstance
      .get<IDestination[]>(ERoutes.DESTINATION)
      .then((response) => response.data);
  },

  patchDestinations: async (data: IDestination | null) => {
    if (data) {
      const { id, ...rest } = data;
      return await axiosInstance.patch<IDestination>(
        ERoutes.DESTINATION + id,
        rest
      );
    }
  },

  deleteDestination: async (id: number | undefined) => {
    if (id) {
      return await axiosInstance.delete<IDestination>(ERoutes.DESTINATION + id);
    }
  },

  postDestinations: async (data: IDestinationPost) => {
    return await axiosInstance.post<IDestinationPost>(
      ERoutes.DESTINATION,
      data
    );
  },
};

export const {
  getDestinations,
  patchDestinations,
  postDestinations,
  deleteDestination,
} = destinationsAPI;
