import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseURL as baseUrl } from '@services/axios.service';
import { ERoutes } from '@/services';

export const seatCategoriesApi=createApi({
  reducerPath:'seatCategoriesApi',
  baseQuery:fetchBaseQuery({
    baseUrl,
    headers: { 'Content-Type': 'application/json' },
  }),
  endpoints:(builder)=>({
    getSeatCategories:builder.query({
      query:()=>ERoutes.SEAT_CATEGORIES,
    }),
  }),
});

export const {
  useGetSeatCategoriesQuery
}=seatCategoriesApi;