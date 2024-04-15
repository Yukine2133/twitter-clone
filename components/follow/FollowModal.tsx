import { IUser } from "@/types/user.interface";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import UserCard from "../search/UserCard";

interface IFollowModal {
  setIsOpenFollowers: (arg0: boolean) => void;
  setIsOpenFollowing: (arg0: boolean) => void;
  isOpenFollowers: boolean;
  isOpenFollowing: boolean;
  follow: IUser[];
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
}: IFollowModal) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (ref.current && ref.current.contains(event.target as Node)) {
        event.stopPropagation();
      }
    };

    if (isOpenFollowers || isOpenFollowing) {
      document.body.style.overflow = "hidden";
      document.addEventListener("wheel", handleScroll, { passive: false });
    } else {
      document.body.style.overflow = "auto";
      document.removeEventListener("wheel", handleScroll);
    }

    // Cleanup function to remove overflow class when unmounting or modal is closed
    return () => {
      document.body.style.overflow = "auto"; // Reset overflow style
      document.removeEventListener("wheel", handleScroll);
    };
  }, [isOpenFollowers, isOpenFollowing]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpenFollowers(false);
      setIsOpenFollowing(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div
      id="modal"
      className="fixed  top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-80 flex justify-center items-center "
    >
      <div
        ref={ref}
        className="bg-black shadow-sm w-[500px] max-h-[500px] overflow-y-auto rounded-lg mx-2 md:mx-0 p-6"
      >
        {follow.map((follower) => (
          <UserCard key={follower.username} user={follower} />
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
