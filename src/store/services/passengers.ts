import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseURL as baseUrl } from '@/services/axios.service';
import { ERoutes } from '@/services/constants';
import { ITEMS_PER_PAGE } from '@/constants/constants';
import { FormPassengersGet } from '@/services/passengers/passengers.interfaces';
import { IFormPassenger } from '@/interfaces/passenger.interfaces';
import { mapPassengersFormData } from '@/services/passengers/form-passengers.utils';
import { IPassenger } from '@/interfaces/search.interfaces';

interface GetPassengersArgs {
  page: number;
  size?: number;
}

export const passengersApi = createApi({
  reducerPath: 'passengeresApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Passenger'],
  endpoints: (builder) => ({
    getPassangers: builder.query<FormPassengersGet, GetPassengersArgs>({
      query: ({ page, size = ITEMS_PER_PAGE }) =>
        `${ERoutes.PASSENGERS}?page=${page}&size=${size}`,
      providesTags: ['Passenger'],
    }),
    addPassenger: builder.mutation({
      query: (body: IFormPassenger) => ({
        url: ERoutes.PASSENGERS,
        method: 'POST',
        body: mapPassengersFormData(body),
      }),
      invalidatesTags: ['Passenger'],
    }),
    deletePassenger: builder.mutation<IPassenger, number>({
      query: (id) => ({
        url: `${ERoutes.PASSENGERS}${id}`,
        method: 'DELETE',
      }),
    }),
    patchPassenger: builder.mutation<IPassenger, IPassenger>({
      query: ({ id, ...body }) => ({
        url: `${ERoutes.PASSENGERS}${id}`,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const {
  useGetPassangersQuery,
  useAddPassengerMutation,
  useDeletePassengerMutation,
  usePatchPassengerMutation,
} = passengersApi;
