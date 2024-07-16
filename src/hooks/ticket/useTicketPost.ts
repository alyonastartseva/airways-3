import { useEffect } from 'react';

import { usePostTicketMutation } from '@/store/services';
import { isFetchBaseQueryError } from '@/utils/fetch-error.utils';

import { useToastHandler } from '../useToastHandler';

const useTicketsPost = () => {
  const [postTicket, { error, isError, isSuccess }] = usePostTicketMutation();
  const toast = useToastHandler();

  useEffect(() => {
    if (isError && isFetchBaseQueryError(error))
      toast({ status: 'error', title: error.data.message });
  }, [isError, toast, error]);

  useEffect(() => {
    if (isSuccess)
      toast({ status: 'success', title: 'Сиденье успешно добавлено' });
  }, [isSuccess, toast]);

  return postTicket;
};

export { useTicketsPost };
