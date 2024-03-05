import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { postDestinations } from '@/services/destinations/destinations.service';

const useDestinationPost = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(postDestinations, {
    onSuccess: () => {
      queryClient.invalidateQueries('destinations');
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

export { useDestinationPost };
