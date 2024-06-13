import { UseToastOptions, useToast } from '@chakra-ui/react';
import { useCallback } from 'react';

export const useToastHandler = () => {
  const toast = useToast();

  return useCallback(
    ({ title, status }: UseToastOptions) => {
      toast({
        status,
        title: title || 'Something went wrong',
        duration: 6000,
        isClosable: true,
        position: 'top',
      });
    },
    [toast]
  );
};
