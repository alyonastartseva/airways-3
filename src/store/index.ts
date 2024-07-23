import { configureStore } from '@reduxjs/toolkit';

import { themeReducer } from '@store/slices';
import { pageIndexReducer } from '@/store/slices/pageIndexesSlice';

import { selectedAircraftReducer } from './slices/flightSeatsSlice';
import {
  passengersApi,
  destinationsApi,
  aircraftApi,
  seatsApi,
  timezonesApi,
  flightSeatsApi,
  seatCategoriesApi,
  ticketsApi,
  bookingApi,
  searchApi,
} from './services';
import { flightSlice } from './services/flightSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    pageIndexes: pageIndexReducer,
    selectedAircraft: selectedAircraftReducer,
    [flightSeatsApi.reducerPath]: flightSeatsApi.reducer,
    [passengersApi.reducerPath]: passengersApi.reducer,
    [destinationsApi.reducerPath]: destinationsApi.reducer,
    [aircraftApi.reducerPath]: aircraftApi.reducer,
    [seatsApi.reducerPath]: seatsApi.reducer,
    [timezonesApi.reducerPath]: timezonesApi.reducer,
    [flightSlice.reducerPath]: flightSlice.reducer,
    [seatCategoriesApi.reducerPath]: seatCategoriesApi.reducer,
    [ticketsApi.reducerPath]: ticketsApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      passengersApi.middleware,
      destinationsApi.middleware,
      aircraftApi.middleware,
      seatsApi.middleware,
      timezonesApi.middleware,
      flightSeatsApi.middleware,
      flightSlice.middleware,
      seatCategoriesApi.middleware,
      ticketsApi.middleware,
      bookingApi.middleware,
      searchApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
