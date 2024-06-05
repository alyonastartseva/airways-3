import { useAddDestinationMutation } from '@/store/services';

const useDestinationPost = () => {
  const [addDestination] = useAddDestinationMutation();

  return {
    mutateAsync: addDestination,
    title: 'Пункт назначения успешно добавлен',
  };
};

export { useDestinationPost };
