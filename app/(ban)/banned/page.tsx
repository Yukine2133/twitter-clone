import BannedPageContent from "@/components/ban/BannedPageContent";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import React from "react";

const BannedPage = async () => {
  const { currentDbUser } = await useGetCurrentUser();
  return (
    <BannedPageContent
      username={currentDbUser.username}
      banReason={currentDbUser.banReason}
    />
  );
};

export default BannedPage;
