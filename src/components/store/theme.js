import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {},
});

export const themeActions = themeSlice.actions;
export default themeSlice;
