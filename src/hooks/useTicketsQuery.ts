import { useQuery } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { getTickets } from '@/services/tickets.service';

const useTicketsQuery = (pageIndex: number) => {
  const toast = useToast();

  return useQuery(['tickets', pageIndex], () => getTickets(pageIndex), {
    onError: (error) => {
      if (error instanceof Error) {
        if (pageIndex >= 0) return;
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

export { useTicketsQuery };
