import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

import { baseURL as baseUrl } from '@/services/axios.service';
import { ERoutes } from '@/services';
import {
  IAircraft,
  IAircraftPost,
  IAircraftsGet,
} from '@/interfaces/aircraft.interfaces';
import { IGetQueryArgs } from '@/interfaces/api-interfaces';
import { mapFormData } from '@/utils/map-form-data.utils';
import { getQueryString } from '@/utils/get-query-string.utils';
import { TFormAirplanesValues } from '@/components/FormAirplanes/form-airplanes.interfaces';

export const aircraftApi = createApi({
  reducerPath: 'aircraftApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    headers: { 'Content-Type': 'application/json' },
  }),
  tagTypes: ['Aircraft'],
  endpoints: (builder) => ({
    getAircraft: builder.query<IAircraftsGet, IGetQueryArgs | void>({
      query: (query) => `${ERoutes.AIRCRAFT}${getQueryString(query)}`,
      providesTags: ['Aircraft'],
    }),
    getAircraftById: builder.query<IAircraft, number>({
      query: (id) => `${ERoutes.AIRCRAFT}/${id}`,
    }),
    addAicraft: builder.mutation<IAircraft, IAircraftPost>({
      query: (body) => ({
        url: ERoutes.AIRCRAFT,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Aircraft'],
    }),
    addAircraftWithSeats: builder.mutation<void, TFormAirplanesValues>({
      queryFn: async (data, _queryApi, _extraOptions, baseQuery) => {
        const { seats, ...rest } = data;

        const responseAircraft = await baseQuery({
          url: ERoutes.AIRCRAFT,
          method: 'POST',
          body: rest,
        });

        if (responseAircraft.error) return { error: responseAircraft.error };

        const aircraftId = (
          responseAircraft as QueryReturnValue<IAircraft, unknown, unknown>
        ).data?.id;

        if (aircraftId)
          for (const seat of seats)
            if (aircraftId) {
              const seatWithID = { aircraftId, ...seat };

              const result = await baseQuery({
                url: ERoutes.SEAT,
                method: 'POST',
                body: mapFormData(seatWithID),
              });

              if (result.error) return { error: result.error };
            }

        return { data: undefined };
      },
    }),
    deleteAircraft: builder.mutation<IAircraft, number>({
      query: (id) => ({
        url: `${ERoutes.AIRCRAFT}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Aircraft'],
    }),
    patchAircraft: builder.mutation<IAircraft, IAircraft>({
      query: ({ id, ...body }) => ({
        url: `${ERoutes.AIRCRAFT}/${id}`,
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
  useAddAircraftWithSeatsMutation,
} = aircraftApi;
