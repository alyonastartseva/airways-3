import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/store';

import {ISetPageIndexActions} from './pageIndexesSlice.interfaces';

// const getTheme = () => {
//     const pageIndex: string = 'light';
//   return pageIndex;
// };
//
// const initialState = getTheme();

const pageIndexesSlice = createSlice({
  name: 'pageIndexes',

  initialState:{
    FLIGHTS_CURR_PAGE: 1,
  },

  reducers: {
    setPageIndex: ( state, action: ISetPageIndexActions) => Object.assign(state,action.payload),
  },
});

export const { setPageIndex } = pageIndexesSlice.actions;
export const pageIndexValue = (state: RootState) => state.pageIndexes;
export default pageIndexesSlice.reducer;
