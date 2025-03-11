"use client";

import { getQueryClient } from "@/utils/lib/getQueryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
