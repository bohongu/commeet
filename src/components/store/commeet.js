const { createSlice } = require('@reduxjs/toolkit');

const initialState = { commeets: [] };

const commeetSlice = createSlice({
  name: 'commeet',
  initialState,
  reducers: {
    initCommeet(state, action) {
      state.commeets = action.payload;
    },
  },
});

export const commeetActions = commeetSlice.actions;
export default commeetSlice;
