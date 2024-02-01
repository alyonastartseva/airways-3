import { useQuery } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { getSeat } from '@/services/seat.service';

const useSeatQuery = (id: number, size: number, page: number) => {
  const toast = useToast();
  return useQuery(['seats', id], () => getSeat(id, size, page), {
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

export { useSeatQuery };
