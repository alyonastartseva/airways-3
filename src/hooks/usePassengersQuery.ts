import { useQuery } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { getPassengers } from '@/services/passengers.service';

const usePassengersQuery = (page: number) => {
  const toast = useToast();

  return useQuery(['passengers', page], () => getPassengers(page), {
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
  });
};

export { usePassengersQuery };
