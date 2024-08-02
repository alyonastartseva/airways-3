import { createApi } from '@reduxjs/toolkit/query/react';

import { IGetAccountsResponse, IAccount, IAccountRoles } from '@/interfaces';
import { ERoutes } from '@/services';
import { getQueryString } from '@/utils/get-query-string.utils';
import { IGetQueryArgs } from '@/interfaces/api-interfaces';
import baseReauthQuery from '@/utils/base-reauth-query.utils';

export const accountsApi = createApi({
  reducerPath: 'accountsApi',
  baseQuery: baseReauthQuery,
  tagTypes: ['Accounts'],
  endpoints: (builder) => ({
    getAccounts: builder.query<IGetAccountsResponse, IGetQueryArgs>({
      query: (query) => `${ERoutes.ACCOUNTS}${getQueryString(query)}`,
      providesTags: ['Accounts'],
    }),
    addAccount: builder.mutation<IAccount, IAccount>({
      query: (body) => ({
        url: ERoutes.ACCOUNTS,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Accounts'],
    }),
    getAccountById: builder.query<IAccount, number>({
      query: (id) => `${ERoutes.ACCOUNTS}/${id}`,
      providesTags: ['Accounts'],
    }),
    deleteAccount: builder.mutation<undefined, number>({
      query: (id) => ({
        url: `${ERoutes.ACCOUNTS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Accounts'],
    }),
    patchAccount: builder.mutation<IAccount, IAccount>({
      query: ({ id, ...body }) => ({
        url: `${ERoutes.ACCOUNTS}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Accounts'],
    }),
    getAccountRoles: builder.query<IAccountRoles[], undefined>({
      query: () => `${ERoutes.ACCOUNTS_ROLES}`,
      providesTags: ['Accounts'],
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useAddAccountMutation,
  useGetAccountByIdQuery,
  useDeleteAccountMutation,
  usePatchAccountMutation,
  useGetAccountRolesQuery,
} = accountsApi;
