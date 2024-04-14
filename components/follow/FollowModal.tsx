import { User } from "@/types/user.interface";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

interface FollowModal {
  setIsOpenFollowers: (arg0: boolean) => void;
  setIsOpenFollowing: (arg0: boolean) => void;
  isOpenFollowers: boolean;
  isOpenFollowing: boolean;
  follow: User[];
  isFollowers: boolean;
  username: string;
}

const FollowModal = ({
  setIsOpenFollowers,
  setIsOpenFollowing,
  isOpenFollowers,
  isOpenFollowing,
  follow,
  isFollowers,
  username,
}: FollowModal) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpenFollowers(false);
        setIsOpenFollowing(false);
      }
    };

    const body = document.querySelector("body");

    if (isOpenFollowers || isOpenFollowing) {
      body?.classList.add("overflow-hidden");
    } else {
      body?.classList.remove("overflow-hidden");
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    isOpenFollowers,
    setIsOpenFollowers,
    isOpenFollowing,
    setIsOpenFollowing,
  ]);

  return (
    <div
      id="modal"
      className="fixed  top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-80 flex justify-center items-center"
    >
      <div
        ref={ref}
        className="bg-black shadow-sm w-[500px] max-h-[500px] overflow-y-auto rounded-lg p-6"
      >
        {follow.map((follower) => (
          <div key={follower.userId} className="flex  gap-2 items-center mb-4">
            <Image
              src={follower.avatar}
              alt={follower.username}
              width={38}
              height={38}
              className="rounded-full object-cover"
            />
            <div>
              <Link href={`/profile/${follower.username}`}>
                <span className="font-bold ">{follower.username}</span>
              </Link>
            </div>
          </div>
        ))}
        {follow.length === 0 && (
          <h5 className="text-lg font-semibold">
            {isFollowers
              ? `${username} does not have any followers.`
              : `${username}  does not follow anyone.`}
          </h5>
        )}
      </div>
    </div>
  );
};

export default FollowModal;
