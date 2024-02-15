import { useMutation, useQueryClient } from 'react-query';

import { updateFlight } from '@services/flights.service';
import { useRequestErrorToast } from '@/hooks';

export const useFlightsPatch = () => {
  const queryClient = useQueryClient();
  const errorHandler = useRequestErrorToast();
  return useMutation(updateFlight, {
    onSuccess: () => {
      queryClient.invalidateQueries('flights');
    },
    onError: errorHandler,
  });
};
