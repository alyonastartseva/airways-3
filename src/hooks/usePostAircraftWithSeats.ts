import { useAddAircraftWithSeatsMutation } from '@/store/services';

const usePostAircraftWithSeats = () => {
  const [addAircraftWithSeats] = useAddAircraftWithSeatsMutation();

  return {
    mutateAsync: addAircraftWithSeats,
    title: 'Самолёт успешно добавлен',
  };
};

export { usePostAircraftWithSeats };
