"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/utils/constants";

interface ISidebarLinkCardProps {
  username: string;
}

export const SidebarLinkCard = ({ username }: ISidebarLinkCardProps) => {
  const pathname = usePathname();

  return (
    <>
      {sidebarLinks.map((link) => {
        let { Icon, SolidIcon, label, route } = link;
        const isActive =
          (pathname.includes(route) && route.length > 1) || pathname === route;

        if (route === "/profile" && username) route = `${route}/${username}`;
        return (
          <Link
            key={label}
            href={route}
            className={`flex items-center text-xl gap-3 ${
              isActive ? "font-bold" : ""
            }`}
          >
            {isActive ? (
              <SolidIcon className="h-7 w-7" />
            ) : (
              <Icon className="h-7 w-7" />
            )}
            <p className="text-light-1 max-lg:hidden">{label}</p>
          </Link>
        );
      })}
    </>
  );
};
