import { useQuery } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { getDestinationsByPage } from '@/services/destinations/destinations.service';

const useDestinationQueryByPage = (pageIndex: number) => {
  const toast = useToast();

  return useQuery(
    ['destinations', pageIndex],
    () => getDestinationsByPage(pageIndex),
    {
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
    }
  );
};

export { useDestinationQueryByPage };
