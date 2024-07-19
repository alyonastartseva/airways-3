import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/store';

import { ISetPageIndexActions } from './pageIndexesSlice.interfaces';

const pageIndexesSlice = createSlice({
  name: 'pageIndexes',

  initialState: {},

  reducers: {
    setPageIndex: (state, action: ISetPageIndexActions) =>
      Object.assign(state, action.payload),
  },
});

export const { setPageIndex } = pageIndexesSlice.actions;
export const pageIndexValue = (state: RootState) => state.pageIndexes;
export default pageIndexesSlice.reducer;
