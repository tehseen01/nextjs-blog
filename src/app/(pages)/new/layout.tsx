import Loading from "@/components/Loading";
import React, { Suspense } from "react";

const NewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
};

export default NewLayout;
