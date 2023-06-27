import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { deleteSeat } from '@services/seat.service';

const useTickets = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation(deleteSeat, {
    onSuccess: () => queryClient.invalidateQueries('seats'),
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

export { useTickets };
