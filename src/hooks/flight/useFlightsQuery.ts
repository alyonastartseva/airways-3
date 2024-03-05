import { useQuery } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { getFlights } from '@/services/flights/flights.service';

const useFlightsQuery = (pageIndex: number) => {
  const toast = useToast();

  return useQuery(['flights', pageIndex], () => getFlights(pageIndex), {
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
export { useFlightsQuery };
