import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

import {
  BASE_URL_API as baseUrl,
  AUTH_TOKEN_URL as authUrl,
} from '@/constants';

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
const tokenQuery = fetchBaseQuery({
  baseUrl: authUrl,
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  },
});

const baseReauthQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
      const refreshResult = await tokenQuery(
        {
          url: '',
          method: 'POST',
          body: new URLSearchParams({
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
            client_id: 'airline-project-client',
          }).toString(),
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const { access_token, refresh_token } = refreshResult.data as {
          access_token: string;
          refresh_token: string;
        };
        localStorage.setItem('adminToken', access_token);
        localStorage.setItem('refreshToken', refresh_token);

        result = await baseQuery(args, api, extraOptions);
      } else {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('refreshToken');
      }
    } else {
      localStorage.removeItem('adminToken');
    }
  }
  return result;
};

export default baseReauthQuery;
