import { IGetQuery, IBooking, IFormBooking } from '@/interfaces';
import { adminInstance, ERoutes } from '@/services';

const bookingAPI = {
  getBookings: async (page: number, size: number) => {
    return await adminInstance
      .get<IGetQuery<IBooking>>(ERoutes.BOOKINGS + `?page=${page}&size=${size}`)
      .then((response) => response.data);
  },

  postBooking: async (data: IFormBooking) => {
    return await adminInstance.post<IFormBooking>(ERoutes.BOOKINGS, data);
  },

  deleteBooking: async (id: number | undefined) => {
    if (id) {
      return await adminInstance.delete<IBooking>(ERoutes.BOOKINGS + id);
    }
  },

  patchBooking: async (data: IBooking | null) => {
    if (data) {
      return await adminInstance.patch(ERoutes.BOOKINGS + data.id, data);
    }
  },
};

export const { getBookings, deleteBooking, postBooking, patchBooking } =
  bookingAPI;
