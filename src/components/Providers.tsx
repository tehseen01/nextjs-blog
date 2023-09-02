"use client";

import { NextUIProvider } from "@nextui-org/react";

import Navbar from "./Navbar";

import { Provider } from "react-redux";
import { store } from "@/redux/store";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NextUIProvider>
          <Navbar />
          <Toaster />
          {children}
        </NextUIProvider>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
