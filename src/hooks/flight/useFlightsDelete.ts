import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { deleteFlight } from '@/services/flights.service';

const useFlightsDelete = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(deleteFlight, {
    onSuccess: () => queryClient.invalidateQueries('flights'),
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

export { useFlightsDelete };
