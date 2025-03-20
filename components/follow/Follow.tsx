"use client";

import React, { useState } from "react";
import FollowModal from "./FollowModal";
import { IFollow } from "@/interfaces/follow.interface";

const Follow = ({
  following,
  followers,
  followersOfTheUser,
  followingsOfTheUser,
  username,
  userPrivate,
}: IFollow) => {
  const [isOpenFollowers, setIsOpenFollowers] = useState(false);
  const [isOpenFollowing, setIsOpenFollowing] = useState(false);

  const toggleFollow = (type: string) => {
    if (userPrivate) {
      return;
    }

    if (type === "following") {
      setIsOpenFollowing(true);
    } else {
      setIsOpenFollowers(true);
    }
  };

  return (
    <div className="flex items-center gap-4 px-4 mt-2">
      <button
        onClick={() => toggleFollow("following")}
        className="text-slate-500 hover:underline decoration-white cursor-pointer"
      >
        <span className="text-gray-300">{following.length}</span> Following
      </button>
      <button
        onClick={() => toggleFollow("followers")}
        className="text-gray-500 hover:underline decoration-white cursor-pointer"
      >
        <span className="text-gray-300">{followers.length}</span> Followers
      </button>
      {isOpenFollowers && (
        <FollowModal
          setIsOpenFollowers={setIsOpenFollowers}
          setIsOpenFollowing={setIsOpenFollowing}
          follow={followersOfTheUser}
          isOpenFollowers={isOpenFollowers}
          isOpenFollowing={isOpenFollowing}
          isFollowers={true}
          username={username}
        />
      )}
      {isOpenFollowing && (
        <FollowModal
          setIsOpenFollowers={setIsOpenFollowers}
          setIsOpenFollowing={setIsOpenFollowing}
          follow={followingsOfTheUser}
          isOpenFollowers={isOpenFollowers}
          isOpenFollowing={isOpenFollowing}
          isFollowers={false}
          username={username}
        />
      )}
    </div>
  );
};

export default Follow;
