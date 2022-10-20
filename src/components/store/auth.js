import { createSlice } from '@reduxjs/toolkit';

const initialState = { isLoggedIn: false };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin(state) {
      state.isLoggedIn = true;
    },
    setLogout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
