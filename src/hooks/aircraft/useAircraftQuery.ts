import { useQuery } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { getAircrafts } from '@/services/aircraft/aircrafts.service';

const useAircraftQuery = (page?: number) => {
  const toast = useToast();

  return useQuery(['aircrafts', page], () => getAircrafts(page), {
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

export { useAircraftQuery };
