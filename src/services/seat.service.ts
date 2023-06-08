import { AxiosResponse } from 'axios';

import { adminInstance } from '@/services/axios.service';
import ERoutes from '@/services/endpoints.service';
import { ISeat, ISeatPost, ISeatForm } from '@/interfaces/seat.interfaces';
import { mapSeatFormData } from '@/utils/form-seat.utils';

interface ISeatApi {
  getSeat: () => Promise<ISeat[] | undefined>;
  postSeat: (data: ISeatPost) => Promise<AxiosResponse<ISeatPost, Error>>;
  deleteSeat: (
    id: number | undefined
  ) => Promise<AxiosResponse<ISeat> | undefined>;
}

const seatAPI: ISeatApi = {
  getSeat: async () => {
    return await adminInstance
      .get<ISeat[]>(ERoutes.SEAT)
      .then((response) => response.data);
  },

  postSeat: async (data: ISeatForm) => {
    const editedData: ISeatForm = mapSeatFormData(data);
    return await adminInstance.post<ISeatPost>(ERoutes.SEAT, editedData);
  },

  deleteSeat: async (id: number | undefined) => {
    if (id) {
      return await adminInstance.delete<ISeat>(ERoutes.SEAT + id);
    }
  },
};

export const { getSeat, postSeat, deleteSeat } = seatAPI;
