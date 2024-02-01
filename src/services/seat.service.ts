import { AxiosResponse } from 'axios';

import { adminInstance } from '@/services/axios.service';
import ERoutes from '@/services/endpoints.service';
import { ISeat, ISeatPost, ISeatForm } from '@/interfaces/seat.interfaces';
import { mapSeatFormData } from '@/utils/form-seat.utils';

interface ISeatApi {
  getSeat: (
    id: number,
    size: number,
    page: number
  ) => Promise<ISeat[] | undefined>;
  postSeat: (data: ISeatPost) => Promise<AxiosResponse<ISeatPost, Error>>;
  deleteSeat: (
    id: number | undefined
  ) => Promise<AxiosResponse<ISeat> | undefined>;
  patchSeat: (
    data: ISeatPost | null
  ) => Promise<AxiosResponse<ISeatPost, any> | undefined>;
}

const seatAPI: ISeatApi = {
  getSeat: async (id: number, size: number, page: number) => {
    if (id > 0) {
      return await adminInstance
        .get<ISeat[]>(
          `${ERoutes.SEAT}?page=${page}&size=${size}&aircraftId=${id}`
        )
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

  patchSeat: async (data) => {
    if (data) {
      const { id, ...rest } = data;
      let categoryPatch = '';
      if (typeof rest.category === 'object') categoryPatch = rest.category;
      else categoryPatch = rest.category;

      const patchObj = {
        aircraftId: rest.aircraftId,
        category: categoryPatch,
        isLockedBack: rest.isLockedBack,
        isNearEmergencyExit: rest.isNearEmergencyExit,
        seatNumber: rest.seatNumber,
      };
      return await adminInstance.patch<ISeatPost>(ERoutes.SEAT + id, patchObj);
    }
  },
};

export const { getSeat, postSeat, deleteSeat, patchSeat } = seatAPI;
