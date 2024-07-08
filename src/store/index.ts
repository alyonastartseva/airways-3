import { configureStore } from '@reduxjs/toolkit';

import { themeReducer } from '@store/slices';

import {
  passengersApi,
  destinationsApi,
  aircraftApi,
  seatsApi,
  timezonesApi,
  flightSeatsApi,
  bookingApi,
} from './services';
import { selectedAircraftReducer } from './slices/flightSeatsSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    selectedAircraft: selectedAircraftReducer,
    [flightSeatsApi.reducerPath]: flightSeatsApi.reducer,
    [passengersApi.reducerPath]: passengersApi.reducer,
    [destinationsApi.reducerPath]: destinationsApi.reducer,
    [aircraftApi.reducerPath]: aircraftApi.reducer,
    [seatsApi.reducerPath]: seatsApi.reducer,
    [timezonesApi.reducerPath]: timezonesApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      passengersApi.middleware,
      destinationsApi.middleware,
      aircraftApi.middleware,
      seatsApi.middleware,
      timezonesApi.middleware,
      flightSeatsApi.middleware,
      bookingApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
