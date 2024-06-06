import { adminInstance, ERoutes } from '@/services';
import { ITimeZone, TTimeZoneForm } from '@/interfaces';

import { ITimezoneGet } from './timeZones.interfaces';

const timezonesAPI = {
  getTimezones: async (page: number, size: number) => {
    return await adminInstance
      .get<ITimezoneGet>(ERoutes.TIMEZONES + `?page=${page}&size=${size}`)
      .then((response) => response.data);
  },

  deleteTimezones: async (id: number | undefined) => {
    if (id) {
      return await adminInstance.delete<ITimeZone>(ERoutes.TIMEZONES + id);
    }
  },

  patchTimezones: async (data: ITimeZone | null) => {
    if (data) {
      const { id, ...rest } = data;
      return await adminInstance.patch<ITimeZone>(ERoutes.TIMEZONES + id, rest);
    }
  },

  postTimezones: async (data: TTimeZoneForm) => {
    return await adminInstance.post<TTimeZoneForm>(ERoutes.TIMEZONES, data);
  },
};

export const { getTimezones, deleteTimezones, patchTimezones, postTimezones } =
  timezonesAPI;
