import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { postFlightSeats } from '@/services/flightSeats/flightSeats.service';

const useFlightSeatsPost = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(postFlightSeats, {
    onSuccess: () => {
      queryClient.invalidateQueries('flights-seats');
      toast({
        status: 'success',
        title: 'Место успешно добавлен',
        position: 'top',
      });
    },
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

export { useFlightSeatsPost };
