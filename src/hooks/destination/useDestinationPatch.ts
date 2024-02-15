import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { patchDestinations } from '@services/destinations.service';

const useDestinationPatch = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(patchDestinations, {
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

export { useDestinationPatch };
