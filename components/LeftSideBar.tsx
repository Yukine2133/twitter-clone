"use client";
import { sidebarLinks } from "@/lib/constants";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LeftSideBar = () => {
  const pathname = usePathname();
  const { user } = useKindeBrowserClient();
  return (
    <div className="fixed  w-64 h-screen left-72 top-1/3 ">
      <div className="flex w-full flex-col space-y-7  gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          if (link.route === "/profile")
            link.route = `${link.route}/${user?.id}`;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`flex items-center gap-3 ${isActive && "font-bold"}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="flex gap-3 items-center fixed bottom-3">
        <Image
          src={user?.picture!}
          alt={user?.given_name!}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div className="flex gap-20">
          <h2>{user?.given_name}</h2>
          <LogoutLink>Logout</LogoutLink>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
