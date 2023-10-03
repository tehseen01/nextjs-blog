import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import editorSlice from "./editorSlice";
import userSlice from "./userSlice";
import dashboardSlice from "./dashboardSlice";
import commonSlice from "./commonSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    editor: editorSlice,
    dashboard: dashboardSlice,
    common: commonSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
