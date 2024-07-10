import { usePatchBookingMutation } from '@/store/services';

const useBookingPatch = () => {
  const [patchBooking, { error, isError, isSuccess }] =
    usePatchBookingMutation();

  return patchBooking;
};

export { useBookingPatch };
