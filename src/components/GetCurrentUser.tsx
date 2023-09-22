"use client";

import { useAppDispatch } from "@/hooks/reduxHooks";
import { setAuthStatus, setUser } from "@/redux/authSlice";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const GetCurrentUser = () => {
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

  return null;
};

export default GetCurrentUser;
