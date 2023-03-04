import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

import searchService from '@services/searchService';

const useDestinationDelete = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(searchService.deleteDestination, {
    onSuccess: () => queryClient.invalidateQueries('destinations'),
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

export { useDestinationDelete };
