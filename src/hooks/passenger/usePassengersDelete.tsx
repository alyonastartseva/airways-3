import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { deletePassengers } from '@/services/passengers.service';

const usePassengersDelete = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(deletePassengers, {
    onSuccess: () => queryClient.invalidateQueries('passengers'),
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

export { usePassengersDelete };
