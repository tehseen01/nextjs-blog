"use client";

import { useAppDispatch } from "@/hooks/reduxHooks";
import { setAuthStatus, setUser } from "@/redux/authSlice";

import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useQuery(["me"], {
    queryFn: async () => {
      try {
        const { data } = await axios.get("/api/users/me");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    retry: 2,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      dispatch(setUser(data));
      dispatch(setAuthStatus(true));
    },
  });

  return <>{children}</>;
};

export default HomeLayout;
