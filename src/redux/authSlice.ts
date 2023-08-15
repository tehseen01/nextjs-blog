import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authStatus: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthStatus: (state, action) => {
      state.authStatus = action.payload;
    },
  },
});

export const { setAuthStatus } = authSlice.actions;
export default authSlice.reducer;
