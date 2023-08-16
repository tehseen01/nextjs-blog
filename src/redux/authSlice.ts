import { TUser } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  user: TUser | null;
  authStatus: boolean;
};

const initialState: TInitialState = {
  authStatus: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthStatus: (state, action) => {
      state.authStatus = action.payload;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setAuthStatus, setUser } = authSlice.actions;
export default authSlice.reducer;
