import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { postFlight } from '@/services/flights.service';

const useFlightsPost = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(postFlight, {
    onSuccess: () => {
      queryClient.invalidateQueries('flights');
      toast({
        status: 'success',
        title: 'Рейс успешно добавлен',
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

export default useFlightsPost;
