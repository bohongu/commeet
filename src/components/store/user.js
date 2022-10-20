import { createSlice } from '@reduxjs/toolkit';

const initialState = { userInfo: null };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
