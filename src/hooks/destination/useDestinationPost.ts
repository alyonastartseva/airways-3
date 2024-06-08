import { useEffect } from 'react';

import { useAddDestinationMutation } from '@/store/services';
import { isFetchBaseQueryError } from '@/utils/fetch-error.utils';

import { useToastHandler } from '../useToastHandler';

const useDestinationPost = () => {
  const [addDestination, { error, isError, isSuccess }] =
    useAddDestinationMutation();
  const toast = useToastHandler();

  useEffect(() => {
    if (isError && isFetchBaseQueryError(error))
      toast({ status: 'error', title: error.data.message });
  }, [isError, toast, error]);

  useEffect(() => {
    if (isSuccess)
      toast({ status: 'success', title: 'Пункт назначения успешно добавлен' });
  }, [isSuccess, toast]);

  return addDestination;
};

export { useDestinationPost };
