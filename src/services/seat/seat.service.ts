import { AxiosResponse } from 'axios';

import { adminInstance, ERoutes } from '@/services';
import { ISeatPost, ISeatForm } from '@/interfaces';
import { ITEMS_PER_PAGE } from '@/constants';
import { ISeat } from '@/interfaces/seat.interfaces';
import { mapFormData } from '@/utils/map-form-data.utils';

interface ISeatApi {
  getSeat: (id: number, page?: number) => Promise<ISeat | undefined>;
  postSeat: (data: ISeatPost) => Promise<AxiosResponse<ISeatPost, Error>>;
  deleteSeat: (
    id: number | undefined
  ) => Promise<AxiosResponse<ISeatPost> | undefined>;
  patchSeat: (
    data: ISeatPost | null
  ) => Promise<AxiosResponse<ISeatPost, any> | undefined>;
}

const seatAPI: ISeatApi = {
  getSeat: async (id: number, page?: number) => {
    if (!page) {
      return await adminInstance
        .get<ISeat>(`${ERoutes.SEAT}?aircraftId=${id}`)
        .then((response) => response.data);
    }
    return await adminInstance
      .get<ISeat>(
        `${ERoutes.SEAT}?page=${page}&size=${ITEMS_PER_PAGE}&aircraftId=${id}`
      )
      .then((response) => response.data);
  },

  postSeat: async (data: ISeatForm) => {
    const editedData: ISeatForm = mapFormData(data);
    editedData.aircraftId = Number(editedData.aircraftId);
    return await adminInstance.post<ISeatPost>(ERoutes.SEAT, editedData);
  },

  deleteSeat: async (id: number | undefined) => {
    if (id) {
      return await adminInstance.delete<ISeatPost>(ERoutes.SEAT + id);
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
