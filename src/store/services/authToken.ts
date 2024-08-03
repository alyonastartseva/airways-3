import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { AUTH_TOKEN_URL as baseUrl } from '@/services/constants/api-urls.constant';

import { IAuthTokenRequest, IAuthTokenResponse } from '../../interfaces';

export const authTokenApi = createApi({
  reducerPath: 'authTokenApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/x-www-form-urlencoded');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAccessToken: builder.query<IAuthTokenResponse, IAuthTokenRequest>({
      query: ({ username, password }) => ({
        url: '',
        method: 'POST',
        body: new URLSearchParams({
          grant_type: 'password',
          client_id: 'airline-project-client',
          username,
          password,
        }).toString(),
      }),
    }),
  }),
});

export const { useLazyGetAccessTokenQuery } = authTokenApi;
