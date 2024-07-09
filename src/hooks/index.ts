export { useDestinationPost } from '@hooks/destination';

export { useAircraftPost } from '@hooks/aircraft';

export { useFlightsDelete } from '@hooks/flight';
export { useFlightsPatch } from '@hooks/flight';
export { useFlightsPost } from '@hooks/flight';
export { useFlightsQuery } from '@hooks/flight';

export { usePassengersPost } from '@hooks/passenger';

export { useTicketDelete } from '@hooks/ticket';
export { useTicketsPatch } from '@hooks/ticket';
export { useTicketsPost } from '@hooks/ticket';
export { useTicketsQuery } from '@hooks/ticket';

export { useSeatPost } from '@hooks/seat';
export { useFlightSeatPost } from '@hooks/flightSeats';

export { useFlightSeatsQuery } from '@hooks/flightSeats';

export { useBookingPost } from '@hooks/booking';
export { useBookingPatch } from '@hooks/booking';
export { useBookingDelete } from '@hooks/booking';
export { useBookingQuery } from '@hooks/booking';

export { useTimezonePost } from '@hooks/timezone';

export { useAuth } from './useAuth';
export { default as useCountryQuery } from './useCountryQuery';
export { useRequestErrorToast } from './useRequestErrorToast';
export { useSetCurrentPageInPagination } from './useSetCurrentPageInPagination';
export { useSeatCategories } from './useSeatCategories';
