import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

import searchService from '@services/searchService';

const useAirplaneDelete = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(searchService.deleteAircraft, {
    onSuccess: () => queryClient.invalidateQueries('aircrafts'),
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

export { useAirplaneDelete };
