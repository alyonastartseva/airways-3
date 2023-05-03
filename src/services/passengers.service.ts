import { adminInstance } from '@/services/axios.service';
import ERoutes from '@/services/endpoints.service';
import {
  FormPassengersGet,
  Passenger,
  FormPassengersPost,
} from '@/interfaces/search.interfaces';

const passengersAPI = {
  getPassengers: async () => {
    return await adminInstance
      .get<FormPassengersGet>(ERoutes.PASSENGERS)
      .then((response) => response.data);
  },

  postPassengers: async (data: FormPassengersPost) => {
    return await adminInstance.post<Passenger>(ERoutes.PASSENGERS, data);
  },

  deletePassengers: async (id: number | undefined) => {
    if (id) {
      return await adminInstance.delete<Passenger>(ERoutes.PASSENGERS + id);
    }
  },
  patchPassengers: async (data: Passenger | null) => {
    if (data) {
      const { id, ...rest } = data;
      return await adminInstance.put<Passenger>(ERoutes.PASSENGERS + id, rest);
    }
  },
};

export const {
  getPassengers,
  postPassengers,
  deletePassengers,
  patchPassengers,
} = passengersAPI;
