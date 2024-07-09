import { useAddBookingMutation } from '@/store/services';
import { IFormBooking } from '@/interfaces';

import { useToastHandler } from '../useToastHandler';

const useBookingPost = () => {
  const [addBooking] = useAddBookingMutation();
  const toast = useToastHandler();

  const postBooking = async (data: IFormBooking) => {
    try {
      await addBooking(data).unwrap();
      toast({
        status: 'success',
        title: 'Бронирование успешно выполнено',
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          status: 'error',
          title: error.message,
        });
      }
    }
  };

  return postBooking;
};

export { useBookingPost };
