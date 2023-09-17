"use client";

import Count from "@/components/dashboard/Count";
import DashboardFilter from "@/components/dashboard/Filter";

import { useParams } from "next/navigation";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();

  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold mb-4">
        Dashboard {params.filter ? ">>" + params.filter : null}
      </h1>
      <Count />
      <div className="grid lg:grid-cols-[250px_1fr] md:grid-cols-[200px_1fr] grid-cols-1 gap-4">
        <DashboardFilter />
        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;
