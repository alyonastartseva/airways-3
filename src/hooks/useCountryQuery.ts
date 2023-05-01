import { useQuery } from 'react-query';
import { useToast } from '@chakra-ui/react';

import getCountry from '@/services/country.service';

const useCountryQuery = () => {
  const toast = useToast();

  return useQuery('countries', getCountry, {
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
export default useCountryQuery;
