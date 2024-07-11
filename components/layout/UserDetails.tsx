import { fetchUser } from "@/actions/user.actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import Image from "next/image";
import OpenEllipsisButton from "../buttons/OpenEllipsisButton";

const UserDetails = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const currentUser = await fetchUser(user?.id);
  return (
    <div className="hidden min-[800px]:flex flex-col lg:flex-row  px-3 transition-colors duration-150 py-1 lg:gap-3 hover:bg-[#1c1c1c] rounded-full lg:items-center fixed ml-5 -translate-x-14 lg:-translate-x-8  xl:-translate-x-3 bottom-3">
      <div className="relative flex gap-1 items-center">
        <Image
          src={currentUser?.avatar!}
          alt={currentUser?.username!}
          width={44}
          height={44}
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
          <h2 className="text-gray-500 truncate w-[130px]">
            @{currentUser?.username}
          </h2>
        </div>
        <OpenEllipsisButton />
      </div>
    </div>
  );
};

export default UserDetails;
