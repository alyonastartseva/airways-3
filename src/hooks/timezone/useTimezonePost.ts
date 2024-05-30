import { useAddTimezoneMutation } from '@/store/services/timezones';

const useTimezonePost = () => {
  const [addTimezone] = useAddTimezoneMutation();

  return { mutateAsync: addTimezone, title: 'Часовой пояс успешно добавлен' };
};

export { useTimezonePost };
