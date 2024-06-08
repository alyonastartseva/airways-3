import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

type QueryError = FetchBaseQueryError & { data: { message: string } };

export const isFetchBaseQueryError = (error: unknown): error is QueryError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'data' in error &&
    typeof (error as FetchBaseQueryError).data === 'object' &&
    error.data !== null &&
    'message' in (error as QueryError).data
  );
};
