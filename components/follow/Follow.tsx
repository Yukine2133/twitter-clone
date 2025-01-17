"use client";

import { IUser } from "@/interfaces/user.interface";
import React, { useState } from "react";
import FollowModal from "./FollowModal";

interface IFollow {
  following: {
    length: number;
  };
  followers: {
    length: number;
  };
  followersOfTheUser: IUser[];
  followingsOfTheUser: IUser[];
  username: string;
}

const Follow = ({
  following,
  followers,
  followersOfTheUser,
  followingsOfTheUser,
  username,
}: IFollow) => {
  const [isOpenFollowers, setIsOpenFollowers] = useState(false);
  const [isOpenFollowing, setIsOpenFollowing] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpenFollowing(!isOpenFollowing)}
        className="text-slate-500 hover:underline decoration-white cursor-pointer"
      >
        <span className="text-gray-300">{following.length}</span> Following
      </button>
      <button
        onClick={() => setIsOpenFollowers(!isOpenFollowers)}
        className="text-gray-500 hover:underline decoration-white cursor-pointer"
      >
        <span className="text-gray-300">{followers.length}</span> Followers
      </button>
      {isOpenFollowers && (
        <FollowModal
          setIsOpenFollowers={setIsOpenFollowers}
          setIsOpenFollowing={setIsOpenFollowing}
          follow={JSON.parse(JSON.stringify(followersOfTheUser))}
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
          follow={JSON.parse(JSON.stringify(followingsOfTheUser))}
          isOpenFollowers={isOpenFollowers}
          isOpenFollowing={isOpenFollowing}
          isFollowers={false}
          username={username}
        />
      )}
    </>
  );
};

export default Follow;
