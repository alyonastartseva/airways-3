import { adminInstance } from '@/services/axios.service';
import ERoutes from '@/services/endpoints.service';
import {
  FormPassengersGet,
  IPassenger,
  FormPassengersPost,
} from '@/interfaces/search.interfaces';
import { IFormPassengers } from '@/interfaces/passenger.interfaces';
import { mapPassengersFormData } from '@/utils/form-passengers.utils';

const passengersAPI = {
  getPassengers: async (page: number) => {
    return await adminInstance
      .get<FormPassengersGet>(ERoutes.PASSENGERS, { params: { page: page } })
      .then((response) => response.data);
  },

  postPassengers: async (data: IFormPassengers) => {
    const editedData: FormPassengersPost = mapPassengersFormData(data);
    return await adminInstance.post<IPassenger>(ERoutes.PASSENGERS, editedData);
  },

  deletePassengers: async (id: number | undefined) => {
    if (id) {
      return await adminInstance.delete<IPassenger>(ERoutes.PASSENGERS + id);
    }
  },
  patchPassengers: async (data: IPassenger | null) => {
    if (data) {
      const { id, ...rest } = data;
      return await adminInstance.put<IPassenger>(ERoutes.PASSENGERS + id, rest);
    }
  },
};

export const {
  getPassengers,
  postPassengers,
  deletePassengers,
  patchPassengers,
} = passengersAPI;
