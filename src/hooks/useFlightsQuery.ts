import { useQuery } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { getFlights } from '@/services/flights.service';

const useFlightsQuery = () => {
  const toast = useToast();

  return useQuery('flights', getFlights, {
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
export default useFlightsQuery;
