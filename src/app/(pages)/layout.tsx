import GetCurrentUser from "@/components/GetCurrentUser";
import { cookies } from "next/headers";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const cookiesList = cookies();
  const token = cookiesList.has("token");

  return (
    <>
      {token && <GetCurrentUser />}
      {children}
    </>
  );
};

export default HomeLayout;
