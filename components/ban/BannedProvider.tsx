import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { redirect } from "next/navigation";
import React from "react";

const BannedProvider = async ({ children }: { children: React.ReactNode }) => {
  const { currentDbUser } = await useGetCurrentUser();

  if (currentDbUser.isBanned) {
    redirect("/banned");
  }
  return <>{children}</>;
};

export default BannedProvider;
