import { createSlice } from '@reduxjs/toolkit';
import { auth } from '../../Firebase';

const initialState = { userInfo: null, user: auth.currentUser };

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
