import { TDashboard } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

type TDashboardSliceProp = {
  dashboardData: TDashboard | null;
  filterPost: string;
};

const initialState: TDashboardSliceProp = {
  dashboardData: null,
  filterPost: "",
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashBoardData: (state, action) => {
      state.dashboardData = action.payload;
    },

    setFilterPost: (state, action) => {
      state.filterPost = action.payload;
    },
  },
});

export const { setDashBoardData, setFilterPost } = dashboardSlice.actions;
export default dashboardSlice.reducer;
