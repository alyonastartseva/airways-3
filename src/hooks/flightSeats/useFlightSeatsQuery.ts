import { useQuery } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { getFlightsSeats } from '@services/flightSeats/flightSeats.service';
import { ITEMS_PER_PAGE } from '@/constants/constants';

const useFlightSeatsQuery = (
  pageIndex: number,
  size: number = ITEMS_PER_PAGE,
  flightId?: number
) => {
  const toast = useToast();

  return useQuery(
    ['flight-seats', pageIndex, size, flightId],
    () => getFlightsSeats(pageIndex, size, flightId),
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

export { useFlightSeatsQuery };
