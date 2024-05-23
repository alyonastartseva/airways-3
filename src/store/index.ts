import { configureStore } from '@reduxjs/toolkit';

import { passengersApi } from './services';

export const store = configureStore({
  reducer: {
    [passengersApi.reducerPath]: passengersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(passengersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
