"use client";

import { User } from "@/types/user.interface";
import { sidebarLinks } from "@/utils/constants";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";

const BottomBar = ({ user }: { user: User }) => {
  return (
    <div className="fixed z-10 bg-black  px-4 border-t border-[#2f3336] w-full min-[800px]:hidden bottom-0 left-0 ">
      <div className="flex justify-between w-full p-1 items-center   sm:pl-6">
        {sidebarLinks.map((link) => {
          if (link.route === "/profile")
            link.route = `${link.route}/${user.username}`;
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
            src={user?.avatar!}
            alt={user?.username!}
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
