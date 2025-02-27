import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { fetchUser } from "@/actions/user.actions";
import { SidebarLinkCard } from "./SidebarLinkCard";
import { LeftSideBarButtons } from "./LeftSideBarButtons";

const LeftSideBar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const currentUser = await fetchUser(user?.id);

  return (
    <>
      <div className="mt-10 fixed -translate-x-8 lg:-translate-x-0  max-[799px]:hidden max-[799px]:mt-0    ">
        <div className="flex w-full flex-col space-y-4  gap-6 px-6">
          <SidebarLinkCard username={currentUser?.username} />

          <LeftSideBarButtons currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default LeftSideBar;
