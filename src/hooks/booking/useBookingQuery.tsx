// import { useToast } from '@chakra-ui/react';
// import { useQuery } from 'react-query';

// // import { getBookings } from '@services/booking/booking.service';
// import { useGetBookingsQuery } from '@/store/services';
// import { ITEMS_PER_PAGE } from '@/constants';
// import { IGetQueryArgs } from '@/interfaces/api-interfaces';

// // const useBookingQuery = (page = 0, size = ITEMS_PER_PAGE) => {
// //   const toast = useToast();

// //   return useQuery(
// //     ['booking', page, size],
// //     () => useGetBookingsQuery(page, size),
// //     {
// //       onError: (error) => {
// //         if (error instanceof Error) {
// //           toast({
// //             status: 'error',
// //             title: error.message,
// //             position: 'top',
// //           });
// //         }
// //       },
// //       refetchOnWindowFocus: false,
// //       keepPreviousData: true,
// //     }
// //   );
// // };

// // export { useBookingQuery };
// const useBookingQuery = (page = 0, size = ITEMS_PER_PAGE) => {
//   const toast = useToast();

//   const queryArgs: IGetQueryArgs = { page, size };

//   const { data, error, isLoading } = useGetBookingsQuery(queryArgs);

//   if (error) {
//     toast({
//       status: 'error',
//       title: (error as Error).message,
//       position: 'top',
//     });
//   }

//   return { data, isLoading };
// };

// export { useBookingQuery };
