import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseURL as baseUrl } from '@/services/axios.service';
import { ERoutes } from '@/services';
import { IGetQueryArgs } from '@/interfaces/api-interfaces';
import { getQueryString } from '@/utils/get-query-string.utils';
import {
  IFSOne,
  IFSQuery,
  IFlightSeatsPost,
} from '@/interfaces/flightsSeats.interfaces';
import { mapFlightSeatFormData } from '@/utils/flightSeats.utils';

interface GetSeatsArgs extends IGetQueryArgs {
  page: number;
}

export const flightSeatsApi = createApi({
  reducerPath: 'flightSeatsApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    headers: { 'Content-Type': 'application/json' },
  }),

  tagTypes: ['flight-seats'],
  endpoints: (builder) => ({
    getFlightSeats: builder.query<IFSQuery, GetSeatsArgs>({
      query: (query) => `${ERoutes.FLIGHT_SEATS}${getQueryString(query)}`,
      providesTags: ['flight-seats'],
    }),

    addFlightSeats: builder.mutation<IFlightSeatsPost, IFlightSeatsPost>({
      query: (body) => ({
        url: ERoutes.FLIGHT_SEATS,
        method: 'POST',
        body: mapFlightSeatFormData(body),
      }),
      invalidatesTags: ['flight-seats'],
    }),

    deleteFlightSeats: builder.mutation<IFlightSeatsPost, number>({
      query: (id) => ({
        url: `${ERoutes.FLIGHT_SEATS}${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['flight-seats'],
    }),
    patchFlightSeats: builder.mutation<IFSOne, IFSOne>({
      query: ({ id, ...body }) => ({
        url: `${ERoutes.FLIGHT_SEATS}${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['flight-seats'],
    }),
  }),
});

export const {
  useAddFlightSeatsMutation,
  useDeleteFlightSeatsMutation,
  useGetFlightSeatsQuery,
  usePatchFlightSeatsMutation,
} = flightSeatsApi;
