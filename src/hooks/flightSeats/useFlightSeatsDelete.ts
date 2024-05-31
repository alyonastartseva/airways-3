import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { deleteFlightSeats } from '@/services/flightSeats/flightSeats.service';

const useFlightSeatsDelete = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(deleteFlightSeats, {
    onSuccess: () => queryClient.invalidateQueries('flight-seats'),
    onError: (error) => {
      if (error instanceof Error) {
        toast({
          status: 'error',
          title: error.message,
          position: 'top',
        });
      }
    },
  });
};

export { useFlightSeatsDelete };
