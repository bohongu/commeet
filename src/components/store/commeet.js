import { createSlice } from '@reduxjs/toolkit/dist';

const initialState = {};

const commeetSlice = createSlice({
  name: 'commeet',
  initialState,
  reducers: {},
});

export const commeetActions = commeetSlice.actions;
export default commeetSlice;
