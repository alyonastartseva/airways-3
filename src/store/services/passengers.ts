import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseURL as baseUrl } from '@/services/axios.service';
import { ERoutes } from '@/services';
import {
  FormPassengersGet,
  IFormPassenger,
  IFormPassengers,
} from '@/interfaces/passenger.interfaces';
import {
  FormPassengersPost,
  IPassenger,
  IPassport,
} from '@/interfaces/search.interfaces';
import { IGetQueryArgs } from '@/interfaces/api-interfaces';
import { getQueryString } from '@/utils/get-query-string.utils';

const mapPassengersFormData = (data: IFormPassengers): FormPassengersPost => {
  const {
    rolesName,
    passportIssuingCountry,
    passportIssuingDate,
    serialNumberPassport,
    gender,
    middleName,
    ...dataRest
  } = data;

  const rolesArray = rolesName ? [{ name: rolesName }] : [];

  const roles = {
    roles: rolesArray,
  };

  const passport: { passport: IPassport } = {
    passport: {
      passportIssuingCountry,
      passportIssuingDate,
      serialNumberPassport,
      gender,
      middleName,
    },
  };

  const passenger = {
    '@type': 'passenger',
  };

  return Object.assign({}, dataRest, roles, passport, passenger);
};

export const passengersApi = createApi({
  reducerPath: 'passengersApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    headers: { 'Content-Type': 'application/json' },
  }),
  tagTypes: ['Passenger'],
  endpoints: (builder) => ({
    getPassengers: builder.query<FormPassengersGet, IGetQueryArgs>({
      query: (query) => `${ERoutes.PASSENGERS}${getQueryString(query)}`,
      providesTags: ['Passenger'],
    }),
    addPassenger: builder.mutation<IPassenger, IFormPassenger>({
      query: (body) => ({
        url: ERoutes.PASSENGERS,
        method: 'POST',
        body: mapPassengersFormData(body),
      }),
      invalidatesTags: ['Passenger'],
    }),
    deletePassenger: builder.mutation<IPassenger, number>({
      query: (id) => ({
        url: `${ERoutes.PASSENGERS}${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Passenger'],
    }),
    patchPassenger: builder.mutation<IPassenger, IPassenger>({
      query: ({ id, ...body }) => ({
        url: `${ERoutes.PASSENGERS}${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Passenger'],
    }),
  }),
});

export const {
  useGetPassengersQuery,
  useAddPassengerMutation,
  useDeletePassengerMutation,
  usePatchPassengerMutation,
} = passengersApi;
