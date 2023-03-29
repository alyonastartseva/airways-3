import { useQuery } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { getPassengers } from '@/services/passengers.service';

const usePassengersQuery = () => {
  const toast = useToast();

  return useQuery('passengers', getPassengers, {
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

export { usePassengersQuery };
