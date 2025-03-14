import { fetchUser } from "@/actions/user.actions";
import Image from "next/image";
import { SidebarLinkCard } from "./LeftSiderBar/SidebarLinkCard";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";

const BottomBar = async () => {
  const { currentDbUser } = await useGetCurrentUser();

  return (
    <div className="fixed bottom-0 left-0 z-10 w-full border-t border-neutral-800 bg-black px-2 py-3 min-[800px]:hidden">
      <nav className="flex items-center justify-around">
        <div className="flex items-center space-x-1 sm:space-x-4">
          <SidebarLinkCard
            userId={currentDbUser.userId}
            username={currentDbUser?.username}
            isMobile
          />
        </div>
        {currentDbUser && (
          <div className="relative h-8 w-8 overflow-hidden rounded-full">
            <Image
              src={currentDbUser.avatar}
              alt={currentDbUser.username}
              fill
              className="object-cover"
            />
          </div>
        )}
      </nav>
    </div>
  );
};

export default BottomBar;
