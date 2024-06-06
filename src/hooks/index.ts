export { useDestinationDelete } from '@hooks/destination';
export { useDestinationPatch } from '@hooks/destination';
export { useDestinationPost } from '@hooks/destination';
export { useDestinationQuery } from '@hooks/destination';
export { useDestinationQueryByPage } from '@hooks/destination';

export { useAircraftDelete } from '@hooks/aircraft';
export { useAircraftPost } from '@hooks/aircraft';
export { useAircraftPatch } from '@hooks/aircraft';
export { useAircraftQuery } from '@hooks/aircraft';
export { useAircraftQueryById } from '@hooks/aircraft';

export { useFlightsDelete } from '@hooks/flight';
export { useFlightsPatch } from '@hooks/flight';
export { useFlightsPost } from '@hooks/flight';
export { useFlightsQuery } from '@hooks/flight';

export { usePassengersDelete } from '@hooks/passenger';
export { usePassengersPatch } from '@hooks/passenger';
export { usePassengersPost } from '@hooks/passenger';
export { usePassengersQuery } from '@hooks/passenger';

export { useTicketDelete } from '@hooks/ticket';
export { useTicketsPatch } from '@hooks/ticket';
export { useTicketsPost } from '@hooks/ticket';
export { useTicketsQuery } from '@hooks/ticket';

export { useSeatDelete } from '@hooks/seat';
export { useSeatPatch } from '@hooks/seat';
export { useSeatPost } from '@hooks/seat';
export { useSeatQuery } from '@hooks/seat';

export { useFlightSeatsQuery } from '@hooks/flightSeats';
export { usePostAircraftWithSeats } from '@hooks/usePostAircraftWithSeats';

export { useBookingPost } from '@hooks/booking';
export { useBookingPatch } from '@hooks/booking';
export { useBookingDelete } from '@hooks/booking';
export { useBookingQuery } from '@hooks/booking';

export { useTimezonePost } from '@hooks/timezone';
export { useTimezonesQuery } from '@hooks/timezone';
export { useTimezonesDelete } from '@hooks/timezone';
export { useTimezonesPatch } from '@hooks/timezone';

export { useAuth } from './useAuth';
export { default as useCountryQuery } from './useCountryQuery';
export { useRequestErrorToast } from './useRequestErrorToast';
export { useSetCurrentPageInPagination } from './useSetCurrentPageInPagination';
