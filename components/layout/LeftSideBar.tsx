"use client";

import { User } from "@/types/user.interface";

import { sidebarLinks } from "@/utils/constants";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LeftSideBar = ({ user }: { user: User }) => {
  const pathname = usePathname();

  return (
    <div className=" fixed max-[799px]:hidden  w-64 h-screen left-0 2xl:left-72 top-1/3 ">
      <div className="flex w-full flex-col space-y-7  gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          if (link.route === "/profile")
            link.route = `${link.route}/${user.username}`;
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
          src={user?.avatar!}
          alt={user?.username!}
          width={48}
          height={48}
          className="rounded-full"
        />

        <div className=" flex-col hidden lg:flex ">
          <h2>{user.username}</h2>
          <LogoutLink>Logout</LogoutLink>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
