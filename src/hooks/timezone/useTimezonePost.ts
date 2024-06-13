import { useEffect } from 'react';

import { useAddTimezoneMutation } from '@/store/services/timezones';
import { isFetchBaseQueryError } from '@/utils/fetch-error.utils';

import { useToastHandler } from '../useToastHandler';

const useTimezonePost = () => {
  const [addTimezone, { error, isError, isSuccess }] = useAddTimezoneMutation();
  const toast = useToastHandler();

  useEffect(() => {
    if (isError && isFetchBaseQueryError(error))
      toast({ status: 'error', title: error.data.message });
  }, [isError, toast, error]);

  useEffect(() => {
    if (isSuccess)
      toast({ status: 'success', title: 'Часовой пояс успешно добавлен' });
  }, [isSuccess]);

  return addTimezone;
};

export { useTimezonePost };
