"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/utils/constants";

interface ISidebarLinkCardProps {
  username: string;
  isMobile?: boolean;
  userId: string;
  unreadMessages?: number;
  unreadNotifications?: number;
}

export const SidebarLinkCard = ({
  username,
  isMobile = false,
  userId,
  unreadMessages = 0,
  unreadNotifications = 0,
}: ISidebarLinkCardProps) => {
  const pathname = usePathname();

  return (
    <>
      {sidebarLinks.map((link) => {
        let { Icon, SolidIcon, label, route } = link;
        const isActive =
          (pathname.includes(route) && route.length > 1) || pathname === route;

        if (route === "/profile" && username)
          route = `${route}/${username}?userId=${userId}`;

        return (
          <Link
            key={label}
            href={route}
            className={`flex items-center  ${
              isMobile ? "px-3 flex-col justify-center" : "text-xl gap-3"
            } ${
              isActive
                ? "text-blue-500"
                : "text-neutral-400 hover:text-white transition-colors duration-300 ease-in-out"
            }`}
          >
            <div className="relative">
              {isActive ? (
                <SolidIcon className={isMobile ? "h-6 w-6" : "h-7 w-7"} />
              ) : (
                <Icon className={isMobile ? "h-6 w-6" : "h-7 w-7"} />
              )}
              {label === "Messages" && unreadMessages > 0 && (
                <span className="absolute -top-1 -right-1.5 flex justify-center items-center text-xs text-white bg-blue-500 rounded-full w-5 h-5">
                  {unreadMessages}
                </span>
              )}
              {label === "Notifications" && unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1.5 flex justify-center items-center text-xs text-white bg-blue-500 rounded-full w-5 h-5">
                  {unreadNotifications}
                </span>
              )}
            </div>

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
