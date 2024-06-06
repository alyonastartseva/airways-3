import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { postTimezones } from '@/services/timeZones/timezones.service';

const useTimezonePost = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(postTimezones, {
    onSuccess: () => {
      queryClient.invalidateQueries('timezones');
      toast({
        status: 'success',
        title: 'Часовой пояс успешно добавлен',
        position: 'top',
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast({
          status: 'error',
          title: error.message,
          position: 'top',
        });
      }
    },
  });
};

export { useTimezonePost };
