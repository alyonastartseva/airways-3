import { useQuery } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { getAircraftById } from '@/services/aircraft/aircrafts.service';

const useAircraftQueryById = (id: number) => {
  const toast = useToast();

  return useQuery(['aircrafts', id], () => getAircraftById(id), {
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

export { useAircraftQueryById };
