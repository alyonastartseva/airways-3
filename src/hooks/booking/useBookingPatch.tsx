import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

import { patchBooking } from '@services/booking/booking.service';
import { IAxiosErrResponseData } from '@/interfaces';
import { AxiosErrorMessage } from '@/common';

const useBookingPatch = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(patchBooking, {
    onSuccess: () => queryClient.invalidateQueries('booking'),
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
        if (error instanceof Error) {
          toast({
            status: 'error',
            title: error.message,
            position: 'top',
          });
        }
      }
    },
  });
};

export { useBookingPatch };
