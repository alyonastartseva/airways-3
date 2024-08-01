export {
  passengersApi,
  useGetPassangersQuery,
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
