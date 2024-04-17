"use client";

import { fetchUser } from "@/actions/user.actions";
import { IUser } from "@/types/user.interface";
import { sidebarLinks } from "@/utils/constants";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const BottomBar = () => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await fetchUser(user?.id);
      setCurrentUser(JSON.parse(JSON.stringify(res)));
    };
    fetchCurrentUser();
  }, [user?.id]);

  return (
    <div className="fixed z-10 bg-black  px-4 border-t border-[#2f3336] w-full min-[800px]:hidden bottom-0 left-0 ">
      <div className="flex justify-between w-full p-1 items-center   sm:pl-6">
        {sidebarLinks.map((link) => {
          if (link.route === "/profile" && currentUser)
            link.route = `${link.route}/${currentUser.username}`;
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
          {currentUser ? (
            <Image
              src={currentUser?.avatar!}
              alt={currentUser?.username!}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <div className="animate-pulse bg-slate-600 h-10 w-10 rounded-full "></div>
          )}
          <LogoutLink>Logout</LogoutLink>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
