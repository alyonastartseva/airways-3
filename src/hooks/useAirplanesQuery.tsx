import { useQuery } from 'react-query';
import { useToast } from '@chakra-ui/react';

import searchService from '@services/searchService';

const useAirplanesQuery = () => {
  const toast = useToast();

  return useQuery('aircrafts', searchService.getAircrafts, {
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

export { useAirplanesQuery };
