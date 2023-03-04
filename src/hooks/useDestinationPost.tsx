import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

import searchService from '@services/searchService';

const useDestinationPost = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(searchService.postDestinations, {
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
