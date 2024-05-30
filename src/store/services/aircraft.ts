import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseURL as baseUrl } from '@/services/axios.service';
import { ERoutes } from '@/services/constants';
import { ITEMS_PER_PAGE } from '@/constants/constants';
import { IAircraftsGet } from '@/services/aircraft/aircraft.interfaces';
import { IAircraft, IAircraftPost } from '@/interfaces/aircraft.interfaces';

interface GetAircraftArgs {
  page: number;
  size?: number;
}

export const aircraftApi = createApi({
  reducerPath: 'aircraftApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    headers: { 'Content-Type': 'application/json' },
  }),
  tagTypes: ['Aircraft'],
  endpoints: (builder) => ({
    getAircraft: builder.query<IAircraftsGet, GetAircraftArgs>({
      query: ({ page, size = ITEMS_PER_PAGE }) =>
        `${ERoutes.AIRCRAFT}?page=${page}&size=${size}`,
      providesTags: ['Aircraft'],
    }),
    getAircraftById: builder.query<IAircraft, number>({
      query: (id) => `${ERoutes.AIRCRAFT}${id}`,
    }),
    addAicraft: builder.mutation<IAircraft, IAircraftPost>({
      query: (body) => ({
        url: ERoutes.AIRCRAFT,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Aircraft'],
    }),
    deleteAircraft: builder.mutation<IAircraft, number>({
      query: (id) => ({
        url: `${ERoutes.AIRCRAFT}${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Aircraft'],
    }),
    patchAircraft: builder.mutation<IAircraft, IAircraft>({
      query: ({ id, ...body }) => ({
        url: `${ERoutes.AIRCRAFT}${id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Aircraft'],
    }),
  }),
});

export const {
  useAddAicraftMutation,
  useDeleteAircraftMutation,
  useGetAircraftByIdQuery,
  useGetAircraftQuery,
  usePatchAircraftMutation,
} = aircraftApi;
