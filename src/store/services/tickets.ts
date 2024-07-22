import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getQueryString } from '@/utils/get-query-string.utils';
import { ITickets, ITicketsPost, ITicketsGet } from '@/interfaces';
import { baseURL as baseUrl } from '@services/axios.service';
import { ERoutes } from '@/services';

export const ticketsApi = createApi({
  reducerPath: 'ticketsApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    headers: { 'Content-Type': 'application/json' },
  }),
  endpoints: (builder) => ({
    getTickets: builder.query<ITicketsGet, number | undefined>({
      query: (query) => ERoutes.TICKETS + getQueryString(query),
    }),
    postTicket: builder.mutation<ITicketsPost, ITicketsPost>({
      query: (body) => ({
        url: ERoutes.TICKETS,
        method: 'POST',
        body,
      }),
    }),
    deleteTicket: builder.mutation<ITickets, number | undefined>({
      query: (id) => ({
        url: `${ERoutes.TICKETS}/${id}`,
        method: 'DELETE',
      }),
    }),
    patchTicket: builder.mutation<ITickets, ITickets | null>({
      query: (body) => ({
        url: `${ERoutes.TICKETS}/${body?.id}`,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const {
  useGetTicketsQuery,
  usePostTicketMutation,
  useDeleteTicketMutation,
  usePatchTicketMutation,
} = ticketsApi;
