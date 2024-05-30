import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseURL as baseUrl } from '@/services/axios.service';
import { ERoutes } from '@/services/constants';
import { ITEMS_PER_PAGE } from '@/constants/constants';
import { ISeat } from '@/services/seat/seat.interfaces';
import { ISeatForm, ISeatPost } from '@/interfaces/seat.interfaces';

interface GetSeatsArgs {
  page: number;
  id: number;
  size?: number;
}

const formatPatchBody = (data: ISeatPost) => {
  const { id, ...rest } = data;
  let categoryPatch = '';

  if (typeof rest.category === 'object') categoryPatch = rest.category;
  else categoryPatch = rest.category;

  return {
    aircraftId: rest.aircraftId,
    category: categoryPatch,
    isLockedBack: rest.isLockedBack,
    isNearEmergencyExit: rest.isNearEmergencyExit,
    seatNumber: rest.seatNumber,
  };
};

const mapSeatFormData = ({
  aircraftId,
  category,
  id,
  isLockedBack,
  isNearEmergencyExit,
  seatNumber,
}: ISeatForm): ISeatPost => {
  return {
    aircraftId: Number(aircraftId || 0),
    category: category || 'ECONOMY',
    id: id || 0,
    isLockedBack: isLockedBack || false,
    isNearEmergencyExit: isNearEmergencyExit || false,
    seatNumber: seatNumber || '',
  };
};

export const seatsApi = createApi({
  reducerPath: 'seatsApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    headers: { 'Content-Type': 'application/json' },
  }),
  tagTypes: ['Seats'],
  endpoints: (builder) => ({
    getSeat: builder.query<ISeat, GetSeatsArgs>({
      query: ({ page, size = ITEMS_PER_PAGE, id }) =>
        `${ERoutes.SEAT}?page=${page}&size=${size}&aircraftId=${id}`,
      providesTags: ['Seats'],
    }),
    addSeat: builder.mutation<ISeatPost, ISeatForm>({
      query: (body) => ({
        url: ERoutes.SEAT,
        method: 'POST',
        body: mapSeatFormData(body),
      }),
      invalidatesTags: ['Seats'],
    }),
    deleteSeat: builder.mutation<ISeatPost, number>({
      query: (id) => ({
        url: `${ERoutes.SEAT}${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Seats'],
    }),
    patchSeat: builder.mutation<ISeatPost, ISeatPost>({
      query: (body) => ({
        url: `${ERoutes.SEAT}${body.id}`,
        method: 'PATCH',
        body: formatPatchBody(body),
      }),
      invalidatesTags: ['Seats'],
    }),
  }),
});

export const {
  useAddSeatMutation,
  useDeleteSeatMutation,
  useGetSeatQuery,
  usePatchSeatMutation,
} = seatsApi;
