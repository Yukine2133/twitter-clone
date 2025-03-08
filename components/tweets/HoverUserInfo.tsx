"use client";

import Image from "next/image";
import { ReactNode } from "react";
import Link from "next/link";
import { IUser } from "@/interfaces/user.interface";
import { VerifiedBadge } from "../premium/VerifiedBadge";

interface IHoverUserInfoProps {
  children: ReactNode;
  user: IUser;
}

const HoverUserInfo = ({ children, user }: IHoverUserInfoProps) => {
  return (
    <div className="relative group flex flex-col items-center">
      {children}
      <div className="absolute top-4 left-[15px] z-20 mt-2 flex flex-col items-center transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
        <div className="relative z-20 w-64 overflow-hidden text-white whitespace-no-wrap bg-black shadow-sm shadow-white/80 rounded-lg">
          {user.backgroundImage ? (
            <Image
              src={user.backgroundImage}
              alt="Background image"
              width={300}
              height={20}
              className="w-full rounded-b-md h-24 object-cover"
            />
          ) : (
            <div className="w-full h-20 rounded-b-md bg-[#333639] object-cover" />
          )}
          <div className="flex items-center justify-between px-4 pt-2">
            <Link href={`/profile/${user.username}`}>
              <Image
                src={user.avatar}
                alt="Owner avatar"
                width={62}
                height={62}
                className="rounded-full object-cover -translate-y-12"
              />
            </Link>
          </div>
          <div className="w-fit px-4 -translate-y-4">
            <Link className="flex flex-col" href={`/profile/${user.username}`}>
              <div className="flex items-center gap-1">
                <span className="font-semibold hover:underline w-[100px] truncate sm:w-fit">
                  {user.displayName}
                </span>
                <VerifiedBadge isSubscribed={user.isSubscribed} />
              </div>
              <span className="text-gray-500 text-[15px] w-[100px] truncate sm:w-fit">
                @{user.username}
              </span>
            </Link>
          </div>
          <p className="mt-6 px-4 -translate-y-5">{user.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default HoverUserInfo;
