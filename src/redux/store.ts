import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import editorSlice from "./editorSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    editor: editorSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
