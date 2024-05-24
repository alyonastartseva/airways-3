import { useQuery } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { getPassengers } from '@services/passengers/passengers.service';
import { ITEMS_PER_PAGE } from '@/constants';

const usePassengersQuery = (page: number, size = ITEMS_PER_PAGE) => {
  const toast = useToast();

  return useQuery(['passengers', page, size], () => getPassengers(page, size), {
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

export { usePassengersQuery };
