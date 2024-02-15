import { useMutation, useQueryClient } from 'react-query';

import { patchSeat } from '@/services/seat.service';
import { useRequestErrorToast } from '@/hooks';

export const useSeatPatch = () => {
  const queryClient = useQueryClient();
  const errorHandler = useRequestErrorToast();
  return useMutation(patchSeat, {
    onSuccess: () => {
      queryClient.invalidateQueries('seats');
    },
    onError: errorHandler,
  });
};
