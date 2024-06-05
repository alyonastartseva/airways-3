import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseURL as baseUrl } from '@/services/axios.service';
import { ERoutes } from '@/services/constants';
import { ITEMS_PER_PAGE } from '@/constants/constants';
import {
  ITimeZone,
  ITimezoneGet,
  TTimeZoneForm,
} from '@/interfaces/time-zone.interfaces';

interface GetTimezonesArgs {
  page: number;
  size?: number;
}

export const timezonesApi = createApi({
  reducerPath: 'timezonesApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    headers: { 'Content-Type': 'application/json' },
  }),
  tagTypes: ['Timezone'],
  endpoints: (builder) => ({
    getTimezones: builder.query<ITimezoneGet, GetTimezonesArgs>({
      query: ({ page, size = ITEMS_PER_PAGE }) =>
        `${ERoutes.TIMEZONES}?page=${page}&size=${size}`,
      providesTags: ['Timezone'],
    }),
    addTimezone: builder.mutation<TTimeZoneForm, TTimeZoneForm>({
      query: (body) => ({
        url: ERoutes.TIMEZONES,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Timezone'],
    }),
    deleteTimezone: builder.mutation<ITimeZone, number>({
      query: (id) => ({
        url: `${ERoutes.TIMEZONES}${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Timezone'],
    }),
    patchTimezone: builder.mutation<ITimeZone, ITimeZone>({
      query: (body) => ({
        url: `${ERoutes.TIMEZONES}${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Timezone'],
    }),
  }),
});

export const {
  useAddTimezoneMutation,
  useDeleteTimezoneMutation,
  useGetTimezonesQuery,
  usePatchTimezoneMutation,
} = timezonesApi;
