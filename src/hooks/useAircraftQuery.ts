import { useQuery } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { getAircrafts } from '@services/aircrafts.service';

const useAircraftQuery = () => {
  const toast = useToast();

  return useQuery('aircrafts', getAircrafts, {
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

export { useAircraftQuery };
