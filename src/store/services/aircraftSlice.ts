import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ERoutes } from '@/services';

import { baseURL } from '../../services/axios.service';

export const aircraftSlice = createApi({
  reducerPath: 'aircraftApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getAircraft: builder.query({
      query: ({ page }) => `${ERoutes.AIRCRAFT}?page=${page}`,
    }),
  }),
});

export const { useGetAircraftQuery } = aircraftSlice;
