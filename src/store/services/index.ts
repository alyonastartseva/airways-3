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

export {
  bookingApi,
  useGetBookingsQuery,
  useGetBookingByIdQuery,
  useAddBookingMutation,
  useDeleteBookingMutation,
  usePatchBookingMutation,
} from './booking';
