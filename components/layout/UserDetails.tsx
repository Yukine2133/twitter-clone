import { fetchUser } from "@/actions/user.actions";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import Image from "next/image";
import OpenEllipsisButton from "../buttons/OpenEllipsisButton";

const UserDetails = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const currentUser = await fetchUser(user?.id);
  return (
    <div className="hidden min-[800px]:flex flex-col lg:flex-row  px-3 transition-colors duration-150 py-1 lg:gap-3 hover:bg-[#1c1c1c] rounded-full lg:items-center fixed bottom-3">
      <div className="relative flex gap-1 items-center">
        <Image
          src={currentUser?.avatar!}
          alt={currentUser?.username!}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div className="lg:hidden">
          <OpenEllipsisButton />
        </div>
      </div>

      <div className="items-center gap-2 relative  hidden lg:flex ">
        <div>
          <h2 className="font-semibold truncate w-[125px]">
            {currentUser?.displayName}
          </h2>
          <h2 className="text-gray-500">@{currentUser?.username}</h2>
        </div>
        <OpenEllipsisButton />
      </div>
    </div>
  );
};

export default UserDetails;
