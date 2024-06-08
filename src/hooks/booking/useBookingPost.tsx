import { useMutation, useQueryClient } from 'react-query';

import { postBooking } from '@services/booking/booking.service';

import { useToastHandler } from '../useToastHandler';

const useBookingPost = () => {
  const queryClient = useQueryClient();
  const toast = useToastHandler();

  return useMutation(postBooking, {
    onSuccess: () => {
      queryClient.invalidateQueries('booking');
      toast({
        status: 'success',
        title: 'Бронирование успешно выполнено',
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast({
          status: 'error',
          title: error.message,
        });
      }
    },
  }).mutateAsync;
};

export { useBookingPost };
