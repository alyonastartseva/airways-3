import { useEffect } from 'react';

import { useAddPassengerMutation } from '@/store/services';
import { isFetchBaseQueryError } from '@/utils/fetch-error.utils';

import { useToastHandler } from '../useToastHandler';

const usePassengersPost = () => {
  const [addPassenger, { error, isError, isSuccess }] =
    useAddPassengerMutation();
  const toast = useToastHandler();

  useEffect(() => {
    if (isError && isFetchBaseQueryError(error))
      toast({ status: 'error', title: error.data.message });
  }, [isError, toast, error]);

  useEffect(() => {
    if (isSuccess)
      toast({ status: 'success', title: 'Пассажир успешно добавлен' });
  }, [isSuccess, toast]);

  return addPassenger;
};

export { usePassengersPost };
