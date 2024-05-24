import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { patchTimezones } from '@services/timeZones/timezones.service';
import { IAxiosErrResponseData } from '@/interfaces';
import { AxiosErrorMessage } from '@/common';

const useTimezonesPatch = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(patchTimezones, {
    onSuccess: () => queryClient.invalidateQueries('timezones'),
    onError: (error) => {
      if (
        axios.isAxiosError<IAxiosErrResponseData, Record<string, unknown>>(
          error
        )
      ) {
        toast({
          status: 'error',
          title: error.message,
          description: error.response?.data ? (
            <AxiosErrorMessage resData={error.response.data} />
          ) : (
            ''
          ),
          position: 'top',
        });
      } else {
        if (error instanceof Error)
          toast({
            status: 'error',
            title: error.message,
            position: 'top',
          });
      }
    },
  });
};

export { useTimezonesPatch };
