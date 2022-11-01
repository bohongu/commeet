const { createSlice } = require('@reduxjs/toolkit');

const initialState = { showModal: false };

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setShowModal(state) {
      state.showModal = true;
    },
    setCloseModal(state) {
      state.showModal = false;
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice;
