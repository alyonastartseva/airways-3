import { useQuery } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { getFlightsSeats } from '@services/flightSeats/flightSeats.service';

const useFlightSeatsQuery = () => {
  const toast = useToast();

  return useQuery(['flight-seats'], () => getFlightsSeats(), {
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

export { useFlightSeatsQuery };
