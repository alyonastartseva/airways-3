import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ISearchData } from '@/interfaces';
import { baseURL } from '@/services/axios.service';

export const searchTicketsApi = createApi({
  reducerPath: 'searchTicketsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchSearchResults: builder.query<any, ISearchData>({
      query: ({
        airportFrom,
        departureDate,
        returnDate,
        numberOfPassengers,
        airportTo,
        categoryOfSeats,
      }) => {
        const params = {
          airportFrom,
          airportTo,
          departureDate,
          returnDate,
          numberOfPassengers,
          categoryOfSeats,
        };

        return {
          url: '/search',
          method: 'GET',
          params,
        };
      },
    }),
  }),
});

export const { useFetchSearchResultsQuery, useLazyFetchSearchResultsQuery } =
  searchTicketsApi;
