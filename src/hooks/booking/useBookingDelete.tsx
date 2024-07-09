// import { useMutation, useQueryClient } from 'react-query';
// import { useToast } from '@chakra-ui/react';

// import { deleteBooking } from '@services/booking/booking.service';

// const useBookingDelete = () => {
//   const queryClient = useQueryClient();
//   const toast = useToast();

//   return useMutation(deleteBooking, {
//     onSuccess: () => queryClient.invalidateQueries('booking'),
//     onError: (error) => {
//       if (error instanceof Error) {
//         toast({
//           status: 'error',
//           title: error.message,
//           position: 'top',
//         });
//       }
//     },
//   });
// };

// export { useBookingDelete };
