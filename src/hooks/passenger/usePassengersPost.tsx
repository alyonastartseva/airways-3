import { useAddPassengerMutation } from '@/store/services';

const usePassengersPost = () => {
  const [addPassenger] = useAddPassengerMutation();

  return {
    mutateAsync: addPassenger,
    title: 'Пассажир успешно добавлен',
  };
};

export { usePassengersPost };
