import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

import { baseURL as baseUrl } from '@/services/axios.service';
import { ERoutes } from '@/services/constants';
import { ITEMS_PER_PAGE } from '@/constants/constants';
import {
  IAircraft,
  IAircraftPost,
  IAircraftsGet,
} from '@/interfaces/aircraft.interfaces';
import { IGetQueryArgs } from '@/interfaces/api-interfaces';
import { TFormAirplanesValues } from '@/common/ModalElements/FormAirplanes/form-airplanes.interfaces';
import { mapSeatFormData } from '@/utils/aircraft.utils';

export const aircraftApi = createApi({
  reducerPath: 'aircraftApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    headers: { 'Content-Type': 'application/json' },
  }),
  tagTypes: ['Aircraft'],
  endpoints: (builder) => ({
    getAircraft: builder.query<IAircraftsGet, IGetQueryArgs | void>({
      query: (
        { page = 0, size = ITEMS_PER_PAGE } = { page: 0, size: ITEMS_PER_PAGE }
      ) => `${ERoutes.AIRCRAFT}?page=${page}&size=${size}`,
      providesTags: ['Aircraft'],
    }),
    getAircraftById: builder.query<IAircraft, number>({
      query: (id) => `${ERoutes.AIRCRAFT}${id}`,
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
                body: mapSeatFormData(seatWithID),
              });

              if (result.error) return { error: result.error };
            }

        return { data: undefined };
      },
    }),
    deleteAircraft: builder.mutation<IAircraft, number>({
      query: (id) => ({
        url: `${ERoutes.AIRCRAFT}${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Aircraft'],
    }),
    patchAircraft: builder.mutation<IAircraft, IAircraft>({
      query: ({ id, ...body }) => ({
        url: `${ERoutes.AIRCRAFT}${id}`,
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
