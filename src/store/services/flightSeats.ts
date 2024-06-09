import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseURL as baseUrl } from '@/services/axios.service';
import { ERoutes } from '@/services';
import { IGetQueryArgs } from '@/interfaces/api-interfaces';
import { getQueryString } from '@/utils/get-query-string.utils';
import {
  IFlightSeatBase,
  IFlightSeatsPost,
} from '@/interfaces/flightsSeats.interfaces';
import { mapFlightSeatFormData } from '@/utils/flightSeats.utils';

interface GetSeatsArgs extends IGetQueryArgs {
  id: number;
}

const formatPatchBody = (data: IFlightSeatsPost) => {
  const { id, ...rest } = data;
  let categoryPatch = '';

  if (typeof rest.category === 'object') categoryPatch = rest.category;
  else categoryPatch = rest.category;

  return data;
};

export const flightSeatsApi = createApi({
  reducerPath: 'flightSeatsApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    headers: { 'Content-Type': 'application/json' },
  }),

  tagTypes: ['flight-Seats'],
  endpoints: (builder) => ({
    getFlightSeats: builder.query<IFlightSeatBase, GetSeatsArgs>({
      query: (query) => `${ERoutes.SEAT}${getQueryString(query)}`,
      providesTags: ['flight-Seats'],
    }),

    addFlightSeats: builder.mutation<IFlightSeatsPost, IFlightSeatsPost>({
      query: (body) => ({
        url: ERoutes.FLIGHT_SEATS,
        method: 'POST',
        body: mapFlightSeatFormData(body),
      }),
      invalidatesTags: ['flight-Seats'],
    }),

    deleteFlightSeats: builder.mutation<IFlightSeatsPost, number>({
      query: (id) => ({
        url: `${ERoutes.FLIGHT_SEATS}${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['flight-Seats'],
    }),
    patchFlightSeats: builder.mutation<IFlightSeatsPost, IFlightSeatsPost>({
      query: (body) => ({
        url: `${ERoutes.FLIGHT_SEATS}${body.id}`,
        method: 'PATCH',
        body: formatPatchBody(body),
      }),
      invalidatesTags: ['flight-Seats'],
    }),
  }),
});

export const {
  useAddFlightSeatsMutation,
  useDeleteFlightSeatsMutation,
  useGetFlightSeatsQuery,
  usePatchFlightSeatsMutation,
} = flightSeatsApi;
