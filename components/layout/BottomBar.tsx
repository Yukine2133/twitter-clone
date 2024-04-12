"use client";

import { combineUsername } from "@/utils/combineUsername";
import { sidebarLinks } from "@/utils/constants";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import Image from "next/image";
import Link from "next/link";

const BottomBar = ({ user }: { user: KindeUser }) => {
  const fullUsername = combineUsername(user?.given_name, user?.family_name);
  return (
    <div className="fixed z-10 bg-black  px-4 border-t border-[#2f3336] w-full min-[800px]:hidden bottom-0 left-0 ">
      <div className="flex justify-between w-full p-1 items-center   sm:pl-6">
        {sidebarLinks.map((link) => {
          if (link.route === "/profile")
            link.route = `${link.route}/${fullUsername}`;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`flex items-center gap-3 `}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={26}
              />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
        <div className="flex items-center gap-2">
          <Image
            src={user?.picture!}
            alt={user?.given_name!}
            width={32}
            height={32}
            className="rounded-full"
          />
          <LogoutLink>Logout</LogoutLink>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
