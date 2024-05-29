import { useAddAicraftMutation } from '@/store/services';

const useAircraftPost = () => {
  const [addAicraft] = useAddAicraftMutation();

  return {
    mutateAsync: addAicraft,
    title: 'Самолёт успешно добавлен',
  };
};

export { useAircraftPost };
