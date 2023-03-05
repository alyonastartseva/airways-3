import { axiosInstance } from '@services/axios';
import ERoutes from '@services/endpoints';
import { IAircraft, IAircraftPost } from '@interfaces/aircraft.interfaces';

const aircraftsAPI = {
  getAircrafts: async () => {
    return await axiosInstance
      .get<IAircraft[]>(ERoutes.AIRCRAFT)
      .then((response) => response.data);
  },

  postAircraft: async (data: IAircraftPost) => {
    return await axiosInstance.post<IAircraftPost>(ERoutes.AIRCRAFT, data);
  },

  deleteAircraft: async (id: number | undefined) => {
    if (id) {
      return await axiosInstance.delete<IAircraft>(ERoutes.AIRCRAFT + id);
    }
  },

  patchAircraft: async (data: IAircraft | null) => {
    if (data) {
      const { id, ...rest } = data;
      return await axiosInstance.patch<IAircraft>(ERoutes.AIRCRAFT + id, rest);
    }
  },
};

export const { getAircrafts, postAircraft, deleteAircraft, patchAircraft } =
  aircraftsAPI;
