import { AxiosResponse } from 'axios';

import { adminInstance } from '@/services/axios.service';
import ERoutes from '@/services/endpoints.service';
import {
  ISeat,
  ISeatPost,
  ISeatForm,
  ISeatContent,
} from '@/interfaces/seat.interfaces';
import { mapSeatFormData } from '@/utils/form-seat.utils';

interface ISeatApi {
  getSeat: (id: number) => Promise<ISeatContent | undefined>;
  postSeat: (data: ISeatPost) => Promise<AxiosResponse<ISeatPost, Error>>;
  deleteSeat: (
    id: number | undefined
  ) => Promise<AxiosResponse<ISeat> | undefined>;
}

const seatAPI: ISeatApi = {
  getSeat: async (id: number) => {
    if (id > 0 && id <= 10) {
      return await adminInstance
        .get<ISeatContent>(`${ERoutes.SEAT}aircraft/${id}`)
        .then((response) => response.data);
    }
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
