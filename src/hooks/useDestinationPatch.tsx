import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

import searchService from '@services/searchService';
import { IDestination } from '@interfaces/search.interfaces';

const useDestinationPatch = (editableRowState: IDestination | null) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(() => searchService.patchDestinations(editableRowState), {
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
