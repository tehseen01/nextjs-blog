"use client";

import DashboardPosts from "@/components/dashboard/Posts";
import { TDashboard } from "@/lib/types";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setDashBoardData } from "@/redux/dashboardSlice";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState<TDashboard | null>(null);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { filterPost } = useAppSelector((state) => state.dashboard);

  const postData = useQuery(["dashboard", user?.username], {
    queryFn: async (): Promise<TDashboard> => {
      const { data } = await axios.get(`/api/dashboard`);
      return data;
    },
    onSuccess: (fetchedData) => {
      setData(fetchedData);
      dispatch(setDashBoardData(fetchedData));
    },
  });

  const postDataWithFilter = useQuery(["dashboard", filterPost], {
    queryFn: async (): Promise<TDashboard> => {
      const { data } = await axios.get(`/api/dashboard?filter=${filterPost}`);
      return data;
    },
    enabled: !!filterPost,
    onSuccess: (fetchedData) => {
      setData(fetchedData);
      dispatch(setDashBoardData(fetchedData));
    },
  });

  if (postData.isLoading) {
    return (
      <div className="h-[calc(100dvh_-_150px)] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <section className="">
      {data !== null && Object.entries(data).length > 0 ? (
        <DashboardPosts dashboardData={data} />
      ) : null}
    </section>
  );
};

export default Dashboard;
