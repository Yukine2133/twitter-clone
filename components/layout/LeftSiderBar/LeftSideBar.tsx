import { SidebarLinkCard } from "./SidebarLinkCard";
import { LeftSideBarButtons } from "./LeftSideBarButtons";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { fetchUnreadMessages } from "@/actions/message.actions";
import { fetchUnreadNotifications } from "@/actions/notification.actions";

const LeftSideBar = async () => {
  const { currentDbUser } = await useGetCurrentUser();
  const unreadMessages = await fetchUnreadMessages(currentDbUser._id);
  const unreadNotifications = await fetchUnreadNotifications(
    currentDbUser.userId
  );

  return (
    <>
      <div className="mt-10 fixed     ">
        <div className="flex w-full flex-col space-y-4  gap-6 px-6">
          <SidebarLinkCard
            userId={currentDbUser.userId}
            username={currentDbUser?.username}
            unreadMessages={unreadMessages}
            unreadNotifications={unreadNotifications}
          />

          <LeftSideBarButtons currentUser={currentDbUser} />
        </div>
      </div>
    </>
  );
};

export default LeftSideBar;
