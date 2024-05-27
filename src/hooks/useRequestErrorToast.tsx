import { useToast } from '@chakra-ui/react';
import axios from 'axios';

import { IAxiosErrResponseData } from '@/interfaces';
import { AxiosErrorMessage } from '@/common';

export const useRequestErrorToast = () => {
  const toast = useToast();

  return (error: unknown) => {
    if (
      axios.isAxiosError<IAxiosErrResponseData, Record<string, unknown>>(error)
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
  };
};
