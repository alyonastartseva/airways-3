import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { deleteTimezones } from '@/services/timeZones/timezones.service';

const useTimezonesDelete = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(deleteTimezones, {
    onSuccess: () => queryClient.invalidateQueries('timezones'),
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

export { useTimezonesDelete };
