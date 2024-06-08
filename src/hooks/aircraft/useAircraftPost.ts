import { useEffect } from 'react';

import { useAddAicraftMutation } from '@/store/services';
import { isFetchBaseQueryError } from '@/utils/fetch-error.utils';

import { useToastHandler } from '../useToastHandler';

const useAircraftPost = () => {
  const [addAicraft, { error, isError, isSuccess }] = useAddAicraftMutation();
  const toast = useToastHandler();

  useEffect(() => {
    if (isError && isFetchBaseQueryError(error))
      toast({ status: 'error', title: error.data.message });
  }, [isError, toast, error]);

  useEffect(() => {
    if (isSuccess)
      toast({ status: 'success', title: 'Самолёт успешно добавлен' });
  }, [isSuccess, toast]);

  return addAicraft;
};

export { useAircraftPost };
