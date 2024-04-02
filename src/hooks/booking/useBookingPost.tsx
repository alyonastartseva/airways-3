import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { postBooking } from '@services/booking/booking.service';

const useBookingPost = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(postBooking, {
    onSuccess: () => {
      queryClient.invalidateQueries('booking');
      toast({
        status: 'success',
        title: 'Бронирование успешно выполнено',
        position: 'top',
      });
    },
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

export { useBookingPost };
