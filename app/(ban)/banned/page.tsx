import { fetchAppeal } from "@/actions/appeal.actions";
import BannedPageContent from "@/components/ban/BannedPageContent";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { redirect } from "next/navigation";
import React from "react";

const BannedPage = async () => {
  const { currentDbUser } = await useGetCurrentUser();
  const appeal = await fetchAppeal(currentDbUser._id);

  const rejectedAppeal = appeal.status === "Rejected";

  if (currentDbUser.isBanned === false) redirect("/");
  return (
    <BannedPageContent
      username={currentDbUser.username}
      banReason={currentDbUser.banReason}
      userId={currentDbUser._id}
      isAppealSubmitted={!!appeal}
      rejectedAppeal={rejectedAppeal}
    />
  );
};

export default BannedPage;
