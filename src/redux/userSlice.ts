import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  moreInfo: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMoreInfo: (state, action) => {
      state.moreInfo = action.payload;
    },
  },
});

export const { setMoreInfo } = userSlice.actions;
export default userSlice.reducer;
