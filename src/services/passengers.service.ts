import { adminInstance } from '@/services/axios.service';
import ERoutes from '@/services/endpoints.service';
import {
  FormPassengers,
  FormPassengersPost,
} from '@/interfaces/search.interfaces';

const passengersAPI = {
  getPassengers: async () => {
    return await adminInstance
      .get<FormPassengers[]>(ERoutes.PASSENGERS)
      .then((response) => response.data);
  },

  postPassengers: async (data: FormPassengersPost) => {
    return await adminInstance.post<FormPassengers>(ERoutes.PASSENGERS, data);
  },

  deletePassengers: async (id: number | undefined) => {
    if (id) {
      return await adminInstance.delete<FormPassengers>(
        ERoutes.PASSENGERS + id
      );
    }
  },
  patchPassengers: async (data: FormPassengers | null) => {
    if (data) {
      const { id, ...rest } = data;
      return await adminInstance.patch<FormPassengers>(
        ERoutes.PASSENGERS + id,
        rest
      );
    }
  },
};

export const {
  getPassengers,
  postPassengers,
  deletePassengers,
  patchPassengers,
} = passengersAPI;
