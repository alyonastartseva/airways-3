import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseURL as baseUrl } from '@/services/axios.service';
import { ERoutes } from '@/services/constants';
import { ITEMS_PER_PAGE } from '@/constants/constants';
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
  reducerPath: 'passengeresApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    headers: { 'Content-Type': 'application/json' },
  }),
  tagTypes: ['Passenger'],
  endpoints: (builder) => ({
    getPassangers: builder.query<FormPassengersGet, IGetQueryArgs>({
      query: ({ page, size = ITEMS_PER_PAGE }) =>
        `${ERoutes.PASSENGERS}?page=${page}&size=${size}`,
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
  useGetPassangersQuery,
  useAddPassengerMutation,
  useDeletePassengerMutation,
  usePatchPassengerMutation,
} = passengersApi;
