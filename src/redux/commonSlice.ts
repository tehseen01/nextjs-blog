import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  progress: 0,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
  },
});

export const { setProgress } = commonSlice.actions;
export default commonSlice.reducer;
