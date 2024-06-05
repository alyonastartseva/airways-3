import { useAddSeatMutation } from '@/store/services';

const useSeatPost = () => {
  const [addSeat] = useAddSeatMutation();

  return { mutateAsync: addSeat, title: 'Сиденье успешно добавлено' };
};

export { useSeatPost };
