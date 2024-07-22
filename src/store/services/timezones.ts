import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseURL as baseUrl } from '@/services/axios.service';
import {
  ITimeZone,
  ITimezoneGet,
  TTimeZoneForm,
} from '@/interfaces/time-zone.interfaces';
import { ERoutes } from '@/services';
import { getQueryString } from '@/utils/get-query-string.utils';
import { IGetQueryArgs } from '@/interfaces/api-interfaces';

export const timezonesApi = createApi({
  reducerPath: 'timezonesApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    headers: { 'Content-Type': 'application/json' },
  }),
  tagTypes: ['Timezone'],
  endpoints: (builder) => ({
    getTimezones: builder.query<ITimezoneGet, IGetQueryArgs>({
      query: (query) => `${ERoutes.TIMEZONES}${getQueryString(query)}`,
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
        url: `${ERoutes.TIMEZONES}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Timezone'],
    }),
    patchTimezone: builder.mutation<ITimeZone, ITimeZone>({
      query: (body) => ({
        url: `${ERoutes.TIMEZONES}/${body.id}`,
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
