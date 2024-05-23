import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseURL as baseUrl } from '@/services/axios.service';
import { ERoutes } from '@/services/constants';
import { ITEMS_PER_PAGE } from '@/constants/constants';
import { FormPassengersGet } from '@/services/passengers/passengers.interfaces';

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
      query: () => '',
    }),
  }),
});

export const { useGetPassangersQuery } = passengersApi;
