import { useDeleteBookingMutation } from '@/store/services';

const useBookingDelete = () => {
  const [deleteBooking] = useDeleteBookingMutation();

  return deleteBooking;
};

export { useBookingDelete };
