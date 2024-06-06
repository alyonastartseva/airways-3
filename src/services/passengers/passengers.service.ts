import { IFormPassengers, IPassenger, FormPassengersPost } from '@/interfaces';
import { adminInstance, ERoutes } from '@/services';
import { ITEMS_PER_PAGE } from '@/constants';

import { mapPassengersFormData } from './form-passengers.utils';
import { FormPassengersGet } from './passengers.interfaces';

const passengersAPI = {
  getPassengers: async (page: number, size = ITEMS_PER_PAGE) => {
    return await adminInstance
      .get<FormPassengersGet>(ERoutes.PASSENGERS + `?page=${page}&size=${size}`)
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
      return await adminInstance.patch<IPassenger>(
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
