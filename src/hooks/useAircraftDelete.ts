import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { deleteAircraft } from '@services/aircrafts.service';

const useAircraftDelete = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation(deleteAircraft, {
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

export { useAircraftDelete };
