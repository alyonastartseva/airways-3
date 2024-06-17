import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/store';

const getTheme = () => {
  const theme: string = window.localStorage.getItem('theme') || 'light';
  return theme;
};

const initialState = getTheme();

const themeSlice = createSlice({
  name: 'theme',

  initialState,

  reducers: {
    set: (state, action) => action.payload,
  },
});

export const { set } = themeSlice.actions;
export const themeValue = (state: RootState) => state.theme;
export default themeSlice.reducer;
