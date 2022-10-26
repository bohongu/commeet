import { configureStore } from '@reduxjs/toolkit';
import authSlice from 'components/store/auth';
import userSlice from 'components/store/user';
import themeSlice from './theme';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    theme: themeSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
