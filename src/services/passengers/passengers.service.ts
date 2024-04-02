import { adminInstance } from '@/services/axios.service';
import { ERoutes } from '@/services/constants';
import { IPassenger, FormPassengersPost } from '@/interfaces/search.interfaces';
import { FormPassengersGet } from '@/services/passengers/passengers.interfaces';
import { IFormPassengers } from '@/interfaces/passenger.interfaces';
import { mapPassengersFormData } from '@/utils/form-passengers.utils';
import { ITEMS_PER_PAGE } from '@constants/constants';

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
