import { useMutation, useQueryClient } from 'react-query';

import { postFlight } from '@/services/flights/flights.service';

import { useToastHandler } from '../useToastHandler';

const useFlightsPost = () => {
  const queryClient = useQueryClient();
  const toast = useToastHandler();

  return useMutation(postFlight, {
    onSuccess: () => {
      queryClient.invalidateQueries('flights');
      toast({
        status: 'success',
        title: 'Рейс успешно добавлен',
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

export { useFlightsPost };
