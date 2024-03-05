import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { postAircraft } from '@/services/aircraft/aircrafts.service';

const useAircraftPost = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(postAircraft, {
    onSuccess: () => {
      queryClient.invalidateQueries('aircrafts');
      toast({
        status: 'success',
        title: 'Самолет успешно добавлен',
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

export { useAircraftPost };
