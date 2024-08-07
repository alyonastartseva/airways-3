export type {
  IFormUserCreate,
  IGetAccountsResponse,
  IAccount,
  IAccountRoles,
} from './account.interfaces';
export type { IAircraft, IAircraftPost } from './aircraft.interfaces';
export type { ISort, IGetQuery, IError } from './api-interfaces';
export type { IAxiosErrResponseData } from './axios-err-response-data';
export type { ICountry } from './country.interfaces';
export type { IFormValuesRegisterUser } from './form-values-register-user.interfaces';
export type { TPerson } from './person.interfaces';
export { PersonGenders } from './person.interfaces';
export { ERolesPassenger } from './roles.interfaces';
export type { TDestQuery, ISearchData } from './search-tickets.interfaces';
export type { IModalFormPage } from './table.interfaces';
export type {
  ITickets,
  ITicketsPost,
  ITicketsForm,
  ITicketsGet,
} from './tickets.interface';
export type { ITimeZone, TTimeZoneForm } from './time-zone.interfaces';
export type { TypeInput } from './type-input.types';
export type { IValidatePattern } from './validate-ptterns.interface';
export type { ISeatPost, ISeatForm, ISeatContent } from './seat.interfaces';
export type {
  IArticle,
  IPassenger,
  IPassport,
  FormPassengersPost,
  ISearchQuery,
  IFromTo,
} from './search.interfaces';
export type {
  IFormPassengers,
  IFormPassenger,
  PassengersTableInterface,
} from './passenger.interfaces';
export type {
  SetPaginationDataCallback,
  UseSetCurrentPageInPagination,
} from './pagination.interfaces';
export type {
  IDestination,
  IDestinationPost,
  IDestinationList,
  IDestinationData,
} from './destination.interfaces';
export type {
  TFlightsStatus,
  IFlight,
  IFlightPresentation,
  IFlightPost,
  IFlightPostFormFields,
} from './flights.interfaces';
export type {
  IBooking,
  IFormBooking,
  TBookingStatus,
} from './booking.interfaces';
export type {
  ISearch,
  IFlightTest,
  TiketDataProps,
  ITicketFlightProps,
} from './ticketsForTest.interfaces';
export type {
  IAuthTokenRequest,
  IAuthTokenResponse,
} from './auth-token.interfaces';
