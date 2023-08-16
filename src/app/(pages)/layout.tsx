"use client";

import { useAppDispatch } from "@/hooks/reduxHooks";
import { setAuthStatus, setUser } from "@/redux/authSlice";

import axios from "axios";
import React, { useEffect } from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get("/api/users/me");
        dispatch(setUser(data));
        dispatch(setAuthStatus(true));
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [dispatch]);

  return <>{children}</>;
};

export default HomeLayout;
