import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { postPassengers } from '@/services/passengers.servise';

const usePassengersPost = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(postPassengers, {
    onSuccess: () => {
      queryClient.invalidateQueries('passengers');
      toast({
        status: 'success',
        title: 'Пункт назначения успешно добавлен',
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

export { usePassengersPost };
