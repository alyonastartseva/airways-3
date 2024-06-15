import { configureStore } from '@reduxjs/toolkit';

import {
  passengersApi,
  destinationsApi,
  aircraftApi,
  seatsApi,
  timezonesApi,
  flightSeatsApi,
} from './services';
import { selectedAircraftReducer } from './slices/flightSeatsSlice';

export const store = configureStore({
  reducer: {
    selectedAircraft: selectedAircraftReducer,
    [flightSeatsApi.reducerPath]: flightSeatsApi.reducer,
    [passengersApi.reducerPath]: passengersApi.reducer,
    [destinationsApi.reducerPath]: destinationsApi.reducer,
    [aircraftApi.reducerPath]: aircraftApi.reducer,
    [seatsApi.reducerPath]: seatsApi.reducer,
    [timezonesApi.reducerPath]: timezonesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      passengersApi.middleware,
      destinationsApi.middleware,
      aircraftApi.middleware,
      seatsApi.middleware,
      timezonesApi.middleware,
      flightSeatsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
