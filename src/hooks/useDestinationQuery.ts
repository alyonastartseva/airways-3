import { useQuery } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { getDestinations } from '@services/destinations.service';

const useDestinationQuery = () => {
  const toast = useToast();

  return useQuery('destinations', getDestinations, {
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

export { useDestinationQuery };
