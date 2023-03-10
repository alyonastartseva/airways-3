import { axiosInstance } from '@services/axios';
import ERoutes from '@services/endpoints';
import {
  FormPassengers,
  FormPassengersPost,
} from '@/interfaces/search.interfaces';

const passengersAPI = {
  getPassengers: async () => {
    return await axiosInstance
      .get<FormPassengers[]>(ERoutes.PASSENGERS)
      .then((response) => response.data);
  },

  postPassengers: async (data: FormPassengersPost) => {
    return await axiosInstance.post<FormPassengers>(ERoutes.PASSENGERS, data);
  },

  deletePassengers: async (id: number | undefined) => {
    if (id) {
      return await axiosInstance.delete<FormPassengers>(
        ERoutes.PASSENGERS + id
      );
    }
  },
  patchPassengers: async (data: FormPassengers | null) => {
    if (data) {
      const { id, ...rest } = data;
      return await axiosInstance.patch<FormPassengers>(
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
