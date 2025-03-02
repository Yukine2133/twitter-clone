"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/utils/constants";

interface ISidebarLinkCardProps {
  username: string;
  isMobile?: boolean;
}

export const SidebarLinkCard = ({
  username,
  isMobile = false,
}: ISidebarLinkCardProps) => {
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
            className={`flex  items-center  ${
              isMobile ? "px-3 flex-col justify-center" : "text-xl gap-3"
            } ${
              isActive
                ? "text-blue-500"
                : "text-neutral-400 hover:text-white transition-colors duration-300 ease-in-out"
            }`}
          >
            {isActive ? (
              <SolidIcon className={isMobile ? "h-6 w-6" : "h-7 w-7"} />
            ) : (
              <Icon className={isMobile ? "h-6 w-6" : "h-7 w-7"} />
            )}
            {isMobile && (
              <span className="mt-1 text-xs font-medium">{label}</span>
            )}
            {!isMobile && <p className="text-light-1 max-lg:hidden">{label}</p>}
          </Link>
        );
      })}
    </>
  );
};
