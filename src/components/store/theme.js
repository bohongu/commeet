const { createSlice } = require('@reduxjs/toolkit');

const initialState = { isDarkMode: false };

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode(state, action) {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice;
