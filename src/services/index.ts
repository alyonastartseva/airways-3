export { default as AviasalesService } from './aviasales.service';
export { default as getCountry } from './country.service';
export { default as searchService } from './search.service';
export { userApi } from './user/user.service';
export { useAuthAdmin } from './auth/auth.service';
export { getFlightsSeats } from './flightSeats/flightSeats.service';
// export { searchApi } from './searchTickets.service';
export { axiosInstance, adminInstance, clientInstance } from './axios.service';

export {
  getFlights,
  postFlight,
  deleteFlight,
  updateFlight,
} from './flights/flights.service';

export { ELinks } from './constants/admin-router-links.constants';
export { default as ERoutes } from './constants/endpoints.constants';
export { NO_CONTENT } from './constants/server-codes.constants';
