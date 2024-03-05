import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { patchTickets } from '@/services/tickets/tickets.service';
import { IAxiosErrResponseData } from '@/interfaces/axios-err-response-data';
import { AxiosErrorMessage } from '@/common/AxiosErrorMessage';

const useTicketsPatch = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(patchTickets, {
    onSuccess: () => queryClient.invalidateQueries('tickets'),
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

export { useTicketsPatch };
