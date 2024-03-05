import { useQuery } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { getSeat } from '@/services/seat/seat.service';

const useSeatQuery = (id: number, page: number) => {
  const toast = useToast();
  return useQuery(['seats', id, page], () => getSeat(id, page), {
    onError: (error) => {
      if (error instanceof Error) {
        toast({
          status: 'error',
          title: error.message,
          position: 'top',
        });
      }
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};

export { useSeatQuery };
