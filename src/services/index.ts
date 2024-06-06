export { default as AviasalesService } from './aviasales.service';
export { default as getCountry } from './country.service';
export { default as searchService } from './search.service';
export { userApi } from './user/user.service';
export { useAuthAdmin } from './auth/auth.service';
export { getFlightsSeats } from './flightSeats/flightSeats.service';
export { getSeat, postSeat, deleteSeat, patchSeat } from './seat/seat.service';
export { searchApi } from './searchTickets.service';
export { postAircraftWithSeats } from './postAircraftWithSeats.service';
export { axiosInstance, adminInstance, clientInstance } from './axios.service';
export {
  getBookings,
  deleteBooking,
  postBooking,
  patchBooking,
} from './booking/booking.service';
export {
  getAircrafts,
  postAircraft,
  deleteAircraft,
  patchAircraft,
  getAircraftById,
} from './aircraft/aircrafts.service';
export {
  getDestinationsByPage,
  getDestinationsByParams,
  getDestinations,
  patchDestinations,
  postDestinations,
  deleteDestination,
} from './destinations/destinations.service';
export {
  getFlights,
  postFlight,
  deleteFlight,
  updateFlight,
} from './flights/flights.service';
export {
  getPassengers,
  postPassengers,
  deletePassengers,
  patchPassengers,
} from './passengers/passengers.service';
export {
  getTickets,
  deleteTicket,
  patchTickets,
  postTickets,
} from './tickets/tickets.service';
export {
  getTimezones,
  deleteTimezones,
  patchTimezones,
  postTimezones,
} from './timeZones/timezones.service';

// export { ELinks, ERoutes, NO_CONTENT } from './constants';
export { ELinks } from './constants/admin-router-links.constants';
export { default as ERoutes } from './constants/endpoints.constants';
export { NO_CONTENT } from './constants/server-codes.constants';
