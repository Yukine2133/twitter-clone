import { IUser } from "@/types/user.interface";
import React, { useRef } from "react";
import UserCard from "../search/UserCard";
import useClickOutside from "@/utils/lib/hooks/useClickOutisde";

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

  useClickOutside(isOpenFollowers, setIsOpenFollowers, ref);
  useClickOutside(isOpenFollowing, setIsOpenFollowing, ref);

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
