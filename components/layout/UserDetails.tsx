import Image from "next/image";
import OpenEllipsisButton from "../buttons/OpenEllipsisButton";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";

const UserDetails = async () => {
  const { currentDbUser } = await useGetCurrentUser();

  return (
    <div className="fixed bottom-4 z-10 hidden min-[800px]:block">
      <div className="group flex w-full items-center lg:gap-3 rounded-full p-3 transition-colors hover:bg-white/10">
        <div className="relative flex-shrink-0">
          <Image
            src={currentDbUser?.avatar || "/placeholder.svg"}
            alt={currentDbUser?.username || "User"}
            width={40}
            height={40}
            className="rounded-full object-cover max-h-10"
          />
        </div>
        <div className="hidden flex-grow lg:block">
          <p className="truncate text-sm font-bold leading-tight">
            {currentDbUser?.displayName}
          </p>
          <p className="truncate text-sm text-gray-500 leading-tight">
            @{currentDbUser?.username}
          </p>
        </div>
        <div className="flex-shrink-0">
          <OpenEllipsisButton />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
