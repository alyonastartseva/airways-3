import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/store';

const flightsSeatsSlice = createSlice({
  name: 'selectedAircraft',

  initialState: 0,

  reducers: {
    setId: (state, action) => action.payload,
  },
});

export const { setId } = flightsSeatsSlice.actions;
export const selectedId = (state: RootState) => state.selectedAircraft;
export default flightsSeatsSlice.reducer;
