import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postContent: "",
  postTitle: "",
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setPostContent: (state, action) => {
      state.postContent = action.payload;
    },

    setPostTitle: (state, action) => {
      state.postTitle = action.payload;
    },
  },
});

export const { setPostContent, setPostTitle } = editorSlice.actions;
export default editorSlice.reducer;
