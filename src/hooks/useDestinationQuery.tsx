import { useQuery } from 'react-query';
import { useToast } from '@chakra-ui/react';

import searchService from '@services/searchService';

const useDestinationQuery = () => {
  const toast = useToast();

  return useQuery('destinations', searchService.getDestinations, {
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

export { useDestinationQuery };
