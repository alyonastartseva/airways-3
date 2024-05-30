import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseURL as baseUrl } from '@/services/axios.service';
import { ERoutes } from '@/services/constants';
import { ITEMS_PER_PAGE } from '@/constants/constants';
import { IDestinationGet } from '@/services/destinations/destinations.interfaces';
import {
  IDestination,
  IDestinationPost,
} from '@/interfaces/destination.interfaces';

interface GetDestionationsArgs {
  page: number;
  size?: number;
}

export const destinationsApi = createApi({
  reducerPath: 'destinationsApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    headers: { 'Content-Type': 'application/json' },
  }),
  tagTypes: ['Destination'],
  endpoints: (builder) => ({
    getDestionations: builder.query<IDestinationGet, GetDestionationsArgs>({
      query: ({ page, size = ITEMS_PER_PAGE }) =>
        `${ERoutes.DESTINATION}?page=${page}&size=${size}`,
      providesTags: ['Destination'],
    }),
    addDestination: builder.mutation<IDestination, IDestinationPost>({
      query: (body) => ({
        url: ERoutes.DESTINATION,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Destination'],
    }),
    deleteDestination: builder.mutation<IDestination, number>({
      query: (id) => ({
        url: `${ERoutes.DESTINATION}${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Destination'],
    }),
    patchDestination: builder.mutation<IDestination, IDestination>({
      query: ({ id, ...body }) => ({
        url: `${ERoutes.DESTINATION}${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Destination'],
    }),
  }),
});

export const {
  useGetDestionationsQuery,
  useAddDestinationMutation,
  useDeleteDestinationMutation,
  usePatchDestinationMutation,
} = destinationsApi;
