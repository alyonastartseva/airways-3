import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { postTickets } from '@/services/tickets.service';

const useTicketsPost = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(postTickets, {
    onSuccess: () => {
      queryClient.invalidateQueries('tickets');
      toast({
        status: 'success',
        title: 'Билет успешно добавлен',
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

export { useTicketsPost };
