import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseURL } from '../../services/axios.service';
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getAircraft: builder.query({
      query: ({ page }) => `aircraft?page=${page}`,
    }),
    getFlights: builder.query({
      query: (page) => `flights?page=${page}`,
    }),
    deleteFlight: builder.mutation({
      query: (id) => ({
        url: `flights/${id}`,
        method: 'DELETE',
      }),
    }),
    patchFlight: builder.mutation({
      query: (flight) => ({
        url: `flights/${flight.id}`,
        method: 'PATCH',
        body: flight,
      }),
    }),
  }),
});

export const {
  useGetAircraftQuery,
  useGetFlightsQuery,
  useDeleteFlightMutation,
  usePatchFlightMutation,
} = apiSlice;
