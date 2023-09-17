"use client";

import { useAppSelector } from "@/hooks/reduxHooks";

import { useParams } from "next/navigation";
import React from "react";

const Count = () => {
  const params = useParams();
  const { dashboardData } = useAppSelector((state) => state.dashboard);

  return (
    <>
      {dashboardData !== null ? (
        <>
          {!params.filter ? (
            <section className="grid md:grid-cols-4 grid-cols-2 gap-3 mb-4">
              <div className="w-full border rounded-md p-6 flex flex-col gap-3">
                <span className="text-3xl font-bold block">0</span>
                <p className="text-default-500">Total post reactions</p>
              </div>

              <div className="w-full border rounded-md p-6 flex flex-col gap-3">
                <span className="text-3xl font-bold block">
                  {dashboardData.posts.reduce(
                    (acu, count) => acu + count.views,
                    0
                  )}
                </span>
                <p className="text-default-500">Total post views</p>
              </div>
              <div className="w-full border rounded-md p-6 flex flex-col gap-3">
                <span className="text-3xl font-bold block">0</span>
                <p className="text-default-500">Total credits</p>
              </div>
              <div className="w-full border rounded-md p-6 flex flex-col gap-3">
                <span className="text-3xl font-bold block">
                  {dashboardData._count.comment + dashboardData._count.replies}
                </span>
                <p className="text-default-500">Total post comments</p>
              </div>
            </section>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default Count;
