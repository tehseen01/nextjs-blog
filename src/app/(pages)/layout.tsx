import GetCurrentUser from "@/components/GetCurrentUser";
import Loading from "@/components/Loading";
import { cookies } from "next/headers";
import React, { Suspense } from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const cookiesList = cookies();
  const token = cookiesList.has("token");

  return (
    <>
      {token && <GetCurrentUser />}
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
};

export default HomeLayout;
