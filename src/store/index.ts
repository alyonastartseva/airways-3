import { configureStore } from '@reduxjs/toolkit';

import { themeReducer } from '@store/slices';

import {
  passengersApi,
  destinationsApi,
  aircraftApi,
  seatsApi,
  timezonesApi,
} from './services';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
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
      timezonesApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
