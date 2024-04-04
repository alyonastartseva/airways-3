import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { postAircraftWithSeats } from '@services/postAircraftWithSeats.service';

const usePostAircraftWithSeats = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(postAircraftWithSeats, {
    onSuccess: () => {
      queryClient.invalidateQueries('aircraftWithSeats');
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

export { usePostAircraftWithSeats };
