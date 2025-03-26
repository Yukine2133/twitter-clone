import BannedPageContent from "@/components/ban/BannedPageContent";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { redirect } from "next/navigation";
import React from "react";

const BannedPage = async () => {
  const { currentDbUser } = await useGetCurrentUser();

  if (currentDbUser.isBanned === false) redirect("/");
  return (
    <BannedPageContent
      username={currentDbUser.username}
      banReason={currentDbUser.banReason}
      userId={currentDbUser._id}
    />
  );
};

export default BannedPage;
