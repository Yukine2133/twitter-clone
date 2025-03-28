import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { redirect } from "next/navigation";

import { ReactNode } from "react";

export const AdminProvider = async ({ children }: { children: ReactNode }) => {
  const { currentDbUser } = await useGetCurrentUser();

  if (currentDbUser.isAdmin === false) {
    return redirect("/");
  }
  return <>{children}</>;
};
