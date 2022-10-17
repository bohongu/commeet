import { createSlice } from '@reduxjs/toolkit';

const initialState = { isLoggedIn: false };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    isLogin(state) {
      state.isLoggedIn = true;
    },
    isLogout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
