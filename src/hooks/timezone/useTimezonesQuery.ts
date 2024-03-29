import { useQuery } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { getTimezones } from '@/services/timeZones/timezones.service';
import { ITEMS_PER_PAGE } from '@/constants/constants';

const useTimezonesQuery = (page: number, size = ITEMS_PER_PAGE) => {
  const toast = useToast();

  return useQuery(['timezones', page, size], () => getTimezones(page, size), {
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

export { useTimezonesQuery };
