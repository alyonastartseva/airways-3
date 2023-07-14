import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { deleteTicket } from '@services/tickets.service';

const useTicketDelete = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(deleteTicket, {
    onSuccess: () => queryClient.invalidateQueries('tickets'),
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

export { useTicketDelete };
