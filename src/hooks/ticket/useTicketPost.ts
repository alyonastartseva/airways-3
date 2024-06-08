import { useMutation, useQueryClient } from 'react-query';

import { postTickets } from '@/services/tickets/tickets.service';

import { useToastHandler } from '../useToastHandler';

const useTicketsPost = () => {
  const queryClient = useQueryClient();
  const toast = useToastHandler();

  return useMutation(postTickets, {
    onSuccess: () => {
      queryClient.invalidateQueries('tickets');
      toast({
        status: 'success',
        title: 'Билет успешно добавлен',
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast({
          status: 'error',
          title: error.message,
        });
      }
    },
  }).mutateAsync;
};

export { useTicketsPost };
