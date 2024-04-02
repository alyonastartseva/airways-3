import { useToast } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import { getBookings } from '@services/booking/booking.service';
import { ITEMS_PER_PAGE } from '@constants/constants';

const useBookingQuery = (page: number, size = ITEMS_PER_PAGE) => {
  const toast = useToast();

  return useQuery(['booking', page, size], () => getBookings(page, size), {
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

export { useBookingQuery };
