import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { redirect } from "next/navigation";

export const Auth = async ({ children }: { children: React.ReactNode }) => {
  const { currentDbUser } = await useGetCurrentUser();
  if (currentDbUser.onboarded === false) {
    redirect("/onboarding");
  }
  return <>{children}</>;
};
