import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseURL as baseUrl } from '@/services/axios.service';
import { ERoutes } from '@/services';
import {
  IFormBooking,
  FormBookingPost,
  BookingResponse,
  IBooking,
} from '@/interfaces/booking.interfaces';
import { IGetQueryArgs } from '@/interfaces/api-interfaces';
import { getQueryString } from '@/utils/get-query-string.utils';

const mapBookingFormData = (data: IFormBooking): FormBookingPost => {
  const { bookingStatus, ...dataRest } = data;
  return {
    ...dataRest,
    status: bookingStatus,
  };
};

export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    headers: { 'Content-Type': 'application/json' },
  }),
  tagTypes: ['Booking'],
  endpoints: (builder) => ({
    getBookings: builder.query<BookingResponse, IGetQueryArgs>({
      query: (query) => `${ERoutes.BOOKINGS}${getQueryString(query)}`,
      providesTags: ['Booking'],
    }),
    getBookingById: builder.query<BookingResponse, number>({
      query: (id) => `${ERoutes.BOOKINGS}/${id}`,
      providesTags: ['Booking'],
    }),
    addBooking: builder.mutation<BookingResponse, IFormBooking>({
      query: (body) => ({
        url: ERoutes.BOOKINGS,
        method: 'POST',
        body: mapBookingFormData(body),
      }),
      invalidatesTags: ['Booking'],
    }),
    deleteBooking: builder.mutation<void, number>({
      query: (id) => ({
        url: `${ERoutes.BOOKINGS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Booking'],
    }),
    patchBooking: builder.mutation<BookingResponse, IBooking>({
      query: ({ id, ...body }) => ({
        url: `${ERoutes.BOOKINGS}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Booking'],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useGetBookingByIdQuery,
  useAddBookingMutation,
  useDeleteBookingMutation,
  usePatchBookingMutation,
} = bookingApi;
