import { useMutation, useQueryClient } from 'react-query';

import { updateFlightSeats } from '@/services/flightSeats/flightSeats.service';

import { useRequestErrorToast } from '../useRequestErrorToast';

export const useFlightSeatsPatch = () => {
  const queryClient = useQueryClient();
  const errorHandler = useRequestErrorToast();
  return useMutation(updateFlightSeats, {
    onSuccess: () => {
      queryClient.invalidateQueries('flight-seats');
    },
    onError: errorHandler,
  });
};
