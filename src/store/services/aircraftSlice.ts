import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseURL } from '../../services/axios.service';

export const aircraftSlice = createApi({
  reducerPath: 'aircraftApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getAircraft: builder.query({
      query: ({ page }) => `aircraft?page=${page}`,
    }),
  }),
});

export const { useGetAircraftQuery } = aircraftSlice;
