import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { TPerson } from '@/interfaces/person.interfaces';
import { IFormPassenger } from '@/interfaces/passenger.interfaces';

import { baseURL } from '../../services/axios.service';
export const userSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getUsers: builder.query<TPerson[], void>({
      query: () => 'users',
    }),
    createUserAsPassenger: builder.mutation<void, IFormPassenger>({
      query: (user) => ({
        url: 'create-user',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useCreateUserAsPassengerMutation } = userSlice;
