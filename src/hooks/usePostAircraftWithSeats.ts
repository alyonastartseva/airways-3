import { useEffect } from 'react';

import { useAddAircraftWithSeatsMutation } from '@/store/services';
import { isFetchBaseQueryError } from '@/utils/fetch-error.utils';

import { useToastHandler } from './useToastHandler';

const usePostAircraftWithSeats = () => {
  const [addAircraftWithSeats, { error, isSuccess, isError }] =
    useAddAircraftWithSeatsMutation();
  const toast = useToastHandler();

  useEffect(() => {
    if (isSuccess) toast({ title: 'Самолёт успешно добавлен' });

    if (isError && isFetchBaseQueryError(error))
      toast({ status: 'error', title: error.data.message });
  }, [isSuccess, isError, error]);

  return {
    mutateAsync: addAircraftWithSeats,
  };
};

export { usePostAircraftWithSeats };
