import { adminInstance } from '@/services/axios.service';
import ERoutes from '@/services/endpoints.service';
import {
  IDestination,
  IDestinationGet,
  IDestinationPost,
} from '@interfaces/destination.interfaces';

const destinationsAPI = {
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
  getDestinations,
  patchDestinations,
  postDestinations,
  deleteDestination,
} = destinationsAPI;
