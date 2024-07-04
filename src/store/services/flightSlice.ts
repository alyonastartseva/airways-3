import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseURL } from '../../services/axios.service';

export const flightSlice = createApi({
  reducerPath: 'flightApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getFlights: builder.query({
      query: ({ page, size }) => `flights?page=${page}&size=${size}`,
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
  useGetFlightsQuery,
  useDeleteFlightMutation,
  usePatchFlightMutation,
} = flightSlice;
