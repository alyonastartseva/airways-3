import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { patchAircraft } from '@services/aircrafts.service';

const useAircraftPatch = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(patchAircraft, {
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

export { useAircraftPatch };
