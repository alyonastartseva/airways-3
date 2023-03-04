import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

import searchService from '@services/searchService';
import { IAirplane } from '@interfaces/plane.interfaces';

const useAirplanePatch = (editableRowState: IAirplane | null) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(() => searchService.patchAircraft(editableRowState), {
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

export { useAirplanePatch };
