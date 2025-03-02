import { SidebarLinkCard } from "./SidebarLinkCard";
import { LeftSideBarButtons } from "./LeftSideBarButtons";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";

const LeftSideBar = async () => {
  const { currentUser } = await useGetCurrentUser();

  return (
    <>
      <div className="mt-10 fixed     ">
        <div className="flex w-full flex-col space-y-4  gap-6 px-6">
          <SidebarLinkCard
            userId={currentUser.userId}
            username={currentUser?.username}
          />

          <LeftSideBarButtons currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default LeftSideBar;
