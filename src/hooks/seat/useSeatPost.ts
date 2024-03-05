import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { postSeat } from '@/services/seat/seat.service';

const useSeatPost = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(postSeat, {
    onSuccess: () => {
      queryClient.invalidateQueries('seats');
      toast({
        status: 'success',
        title: 'Сиденье успешно добавлено',
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

export { useSeatPost };
