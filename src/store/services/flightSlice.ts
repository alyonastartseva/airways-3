import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ERoutes } from '@/services';
import { getQueryString } from '@/utils/get-query-string.utils';
import { IGetQuery, IGetQueryArgs } from '@/interfaces/api-interfaces';
import { IFlightPost, IFlightPresentation } from '@/interfaces';

import { baseURL as baseUrl } from '../../services/axios.service';

export const flightSlice = createApi({
  reducerPath: 'flightApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Flights'],
  endpoints: (builder) => ({
    getFlights: builder.query<IGetQuery<IFlightPresentation>, IGetQueryArgs>({
      query: (query) => `${ERoutes.FLIGHTS}${getQueryString(query)}`,
      providesTags: ['Flights'],
    }),
    addFlight: builder.mutation<IFlightPost, IFlightPresentation>({
      query: (body) => ({
        url: `${ERoutes.FLIGHTS}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Flights'],
    }),
    deleteFlight: builder.mutation<number, number | undefined>({
      query: (id) => ({
        url: `${ERoutes.FLIGHTS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Flights'],
    }),
    patchFlight: builder.mutation<IFlightPresentation, IFlightPresentation>({
      query: (flight) => ({
        url: `${ERoutes.FLIGHTS}/${flight.id}`,
        method: 'PATCH',
        body: flight,
      }),
      invalidatesTags: ['Flights'],
    }),
  }),
});

export const {
  useGetFlightsQuery,
  useDeleteFlightMutation,
  usePatchFlightMutation,
  useAddFlightMutation,
} = flightSlice;
