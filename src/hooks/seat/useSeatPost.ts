import { useEffect } from 'react';

import { useAddSeatMutation } from '@/store/services';
import { isFetchBaseQueryError } from '@/utils/fetch-error.utils';

import { useToastHandler } from '../useToastHandler';

const useSeatPost = () => {
  const [addSeat, { error, isError, isSuccess }] = useAddSeatMutation();
  const toast = useToastHandler();

  useEffect(() => {
    if (isError && isFetchBaseQueryError(error))
      toast({ status: 'error', title: error.data.message });
  }, [isError, toast, error]);

  useEffect(() => {
    if (isSuccess)
      toast({ status: 'success', title: 'Сиденье успешно добавлено' });
  }, [isSuccess, toast]);

  return addSeat;
};

export { useSeatPost };
