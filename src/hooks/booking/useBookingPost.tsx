import { useEffect } from 'react';

import { useAddBookingMutation } from '@/store/services';
import { isFetchBaseQueryError } from '@/utils/fetch-error.utils';

import { useToastHandler } from '../useToastHandler';

const useBookingPost = () => {
  const [addBooking, { error, isError, isSuccess }] = useAddBookingMutation();
  const toast = useToastHandler();

  useEffect(() => {
    if (isError && isFetchBaseQueryError(error))
      toast({ status: 'error', title: error.data.message });
  }, [isError, toast, error]);

  useEffect(() => {
    if (isSuccess)
      toast({ status: 'success', title: 'Бронирование успешно выполнено' });
  }, [isSuccess, toast]);

  return addBooking;
};

export { useBookingPost };
