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
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LeftSideBar = () => {
  const pathname = usePathname();
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
    <div className="mt-10  max-[799px]:hidden max-[799px]:mt-0    ">
      <div className="flex w-full flex-col space-y-7  gap-6 px-6">
        {sidebarLinks.map((link) => {
          let { Icon, SolidIcon, disabled, route } = link;
          const isActive =
            (pathname.includes(route) && route.length > 1) ||
            pathname === route;
          if (link.route === "/profile" && currentUser?.username)
            link.route = `${link.route}/${currentUser.username}`;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`flex items-center text-xl gap-3 ${
                disabled && "cursor-not-allowed"
              } ${isActive && "font-bold"}`}
            >
              {/* <HeroIcon
                className={"h-6 w-6"}
                iconName={link.imgUrl}
                solid={isActive}
              /> */}
              {isActive ? (
                <SolidIcon className="h-7 w-7" />
              ) : (
                <Icon className="h-7 w-7" />
              )}
              {/* <SolidIcon /> */}
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="flex flex-col lg:flex-row pl-5 lg:gap-3  lg:items-center fixed bottom-3">
        {currentUser ? (
          <Image
            src={currentUser?.avatar!}
            alt={currentUser?.username!}
            width={48}
            height={48}
            className="rounded-full"
          />
        ) : (
          <div className="animate-pulse bg-slate-600 h-12 w-12 rounded-full "></div>
        )}
        <LogoutLink className="lg:hidden">Logout</LogoutLink>

        <div className=" flex-col hidden lg:flex ">
          {/* <h2>{currentUser ? currentUser.username}</h2> */}
          {currentUser ? (
            <h2>{currentUser.username}</h2>
          ) : (
            <h2 className="animate-pulse h-4 rounded-full w-16 bg-slate-600"></h2>
          )}
          <LogoutLink>Logout</LogoutLink>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
