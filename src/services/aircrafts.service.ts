import { adminInstance } from '@/services/axios.service';
import ERoutes from '@/services/endpoints.service';
import { IAircraft, IAircraftPost } from '@interfaces/aircraft.interfaces';

const aircraftsAPI = {
  getAircrafts: async () => {
    return await adminInstance
      .get<IAircraft[]>(ERoutes.AIRCRAFT)
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
