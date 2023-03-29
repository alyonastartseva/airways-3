import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { patchPassengers } from '@/services/passengers.service';

const usePassengersPatch = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(patchPassengers, {
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

export { usePassengersPatch };
