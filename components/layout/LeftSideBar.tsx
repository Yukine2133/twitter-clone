"use client";
import { combineUsername } from "@/utils/combineUsername";
import { sidebarLinks } from "@/utils/constants";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LeftSideBar = ({ user }: { user: KindeUser }) => {
  const pathname = usePathname();
  const fullUsername = combineUsername(user?.given_name, user?.family_name);
  return (
    <div className=" fixed max-[799px]:hidden  w-64 h-screen left-0 2xl:left-72 top-1/3 ">
      <div className="flex w-full flex-col space-y-7  gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          if (link.route === "/profile")
            link.route = `${link.route}/${fullUsername}`;
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
      <div className="flex pl-5 gap-3  items-center fixed bottom-3">
        <Image
          src={user?.picture!}
          alt={user?.given_name!}
          width={48}
          height={48}
          className="rounded-full"
        />

        <div className=" flex-col hidden lg:flex ">
          <h2>{fullUsername}</h2>
          <LogoutLink>Logout</LogoutLink>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
