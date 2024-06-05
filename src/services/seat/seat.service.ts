import { AxiosResponse } from 'axios';

import { adminInstance, ERoutes } from '@/services';
import { ISeatPost, ISeatForm } from '@/interfaces';
import { ITEMS_PER_PAGE } from '@/constants';

import { ISeat } from './seat.interfaces';

interface ISeatApi {
  getSeat: (id: number, page: number) => Promise<ISeat | undefined>;
  postSeat: (data: ISeatPost) => Promise<AxiosResponse<ISeatPost, Error>>;
  deleteSeat: (
    id: number | undefined
  ) => Promise<AxiosResponse<ISeatPost> | undefined>;
  patchSeat: (
    data: ISeatPost | null
  ) => Promise<AxiosResponse<ISeatPost, any> | undefined>;
}

const mapSeatFormData = (data: ISeatForm): ISeatPost => {
  const {
    aircraftId,
    category,
    id,
    isLockedBack,
    isNearEmergencyExit,
    seatNumber,
  } = data;

  const seatPostData: ISeatPost = {
    aircraftId: aircraftId || 0,
    category: category || 'ECONOMY',
    id: id || 0,
    isLockedBack: isLockedBack || false,
    isNearEmergencyExit: isNearEmergencyExit || false,
    seatNumber: seatNumber || '',
  };

  return seatPostData;
};

const seatAPI: ISeatApi = {
  getSeat: async (id: number, page: number) => {
    return await adminInstance
      .get<ISeat>(
        `${ERoutes.SEAT}?page=${page}&size=${ITEMS_PER_PAGE}&aircraftId=${id}`
      )
      .then((response) => response.data);
  },

  postSeat: async (data: ISeatForm) => {
    const editedData: ISeatForm = mapSeatFormData(data);
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
