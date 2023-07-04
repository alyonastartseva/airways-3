import { useQuery } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { getSeat } from '@/services/seat.service';

const useSeatGet = (id: number) => {
  const toast = useToast();
  return useQuery(['seats', id], () => getSeat(id), {
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

export { useSeatGet };
