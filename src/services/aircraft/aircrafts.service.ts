import { ITEMS_PER_PAGE } from '@/constants/constants';
import { adminInstance } from '@/services/axios.service';
import { ERoutes } from '@/services/constants';
import { IAircraft, IAircraftPost } from '@interfaces/aircraft.interfaces';

import { IAircraftsGet } from './aircraft.interfaces';

const aircraftsAPI = {
  getAircrafts: async (page?: number, size = ITEMS_PER_PAGE) => {
    const slug = `?page=${String(page)}&size=${size}`;
    const url = `${ERoutes.AIRCRAFT}${page || page === 0 ? slug : ''}`;

    return await adminInstance
      .get<IAircraftsGet>(url)
      .then((response) => response.data);
  },

  getAircraftById: async (id: number) => {
    return adminInstance
      .get<IAircraft>(ERoutes.AIRCRAFT + id)
      .then((response) => response.data);
  },

  postAircraft: async (data: IAircraftPost) => {
    return await adminInstance.post<IAircraftPost>(ERoutes.AIRCRAFT, data);
  },

  deleteAircraft: async (id: number | undefined) => {
    if (id) {
      return await adminInstance.delete<IAircraft>(ERoutes.AIRCRAFT + id);
    }
  },

  patchAircraft: async (data: IAircraft | null) => {
    if (data) {
      const { id, ...rest } = data;
      return await adminInstance.patch<IAircraft>(ERoutes.AIRCRAFT + id, rest);
    }
  },
};

export const {
  getAircrafts,
  postAircraft,
  deleteAircraft,
  patchAircraft,
  getAircraftById,
} = aircraftsAPI;
