import { useQuery } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { getFlights } from '@/services/flights/flights.service';
import { ITEMS_PER_PAGE } from '@constants/constants';

const useFlightsQuery = (pageIndex: number, size: number = ITEMS_PER_PAGE) => {
  const toast = useToast();

  return useQuery(
    ['flights', pageIndex, size],
    () => getFlights(pageIndex, size),
    {
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
    }
  );
};
export { useFlightsQuery };
