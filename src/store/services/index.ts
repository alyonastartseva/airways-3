export {
  passengersApi,
  useGetPassengersQuery,
  useAddPassengerMutation,
  useDeletePassengerMutation,
  usePatchPassengerMutation,
} from './passengers';

export {
  destinationsApi,
  useGetDestionationsQuery,
  useAddDestinationMutation,
  useDeleteDestinationMutation,
  usePatchDestinationMutation,
  useLazyGetDestionationsQuery,
} from './destinations';

export {
  aircraftApi,
  useAddAicraftMutation,
  useDeleteAircraftMutation,
  useGetAircraftByIdQuery,
  useGetAircraftQuery,
  usePatchAircraftMutation,
  useAddAircraftWithSeatsMutation,
} from './aircraft';

export {
  seatsApi,
  useAddSeatMutation,
  useDeleteSeatMutation,
  useGetSeatQuery,
  usePatchSeatMutation,
} from './seats';

export {
  timezonesApi,
  useAddTimezoneMutation,
  useDeleteTimezoneMutation,
  useGetTimezonesQuery,
  usePatchTimezoneMutation,
} from './timezones';

export {
  flightSeatsApi,
  useAddFlightSeatsMutation,
  useDeleteFlightSeatsMutation,
  useGetFlightSeatsQuery,
  usePatchFlightSeatsMutation,
} from './flightSeats';

export { seatCategoriesApi, useGetSeatCategoriesQuery } from './seatCategories';

export {
  ticketsApi,
  useGetTicketsQuery,
  usePostTicketMutation,
  useDeleteTicketMutation,
  usePatchTicketMutation,
} from './tickets';

export {
  bookingApi,
  useGetBookingsQuery,
  useGetBookingByIdQuery,
  useAddBookingMutation,
  useDeleteBookingMutation,
  usePatchBookingMutation,
} from './booking';

export {
  flightSlice,
  useAddFlightMutation,
  useDeleteFlightMutation,
  useGetFlightsQuery,
  usePatchFlightMutation,
} from './flightSlice';

export { authTokenApi, useLazyGetAccessTokenQuery } from './authToken';

export {
  accountsApi,
  useAddAccountMutation,
  useDeleteAccountMutation,
  useGetAccountByIdQuery,
  useGetAccountRolesQuery,
  useGetAccountsQuery,
  usePatchAccountMutation,
} from './account';

export {
  searchTicketsApi,
  useFetchSearchResultsQuery,
  useLazyFetchSearchResultsQuery,
} from './searchTickets';
