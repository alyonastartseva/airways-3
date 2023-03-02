import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

import searchService from '@services/searchService';

const useAirplanePost = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(searchService.postAircraft, {
    onSuccess: () => {
      queryClient.invalidateQueries('aircrafts');
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

export { useAirplanePost };
