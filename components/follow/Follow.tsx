"use client";

import { IUser } from "@/types/user.interface";
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
  const openModal = (id: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };
  return (
    <>
      <button
        onClick={() => openModal("following")}
        className="text-slate-500 hover:underline decoration-white cursor-pointer"
      >
        <span className="text-gray-300">{following.length}</span> Following
      </button>
      <button
        onClick={() => openModal("followers")}
        className="text-gray-500 hover:underline decoration-white cursor-pointer"
      >
        <span className="text-gray-300">{followers.length}</span> Followers
      </button>

      {/* Following modal */}
      <FollowModal
        follow={JSON.parse(JSON.stringify(followingsOfTheUser))}
        isFollowers={false}
        username={username}
        id="following"
      />

      {/* Followers modal */}
      <FollowModal
        follow={JSON.parse(JSON.stringify(followersOfTheUser))}
        isFollowers={true}
        username={username}
        id="followers"
      />
    </>
  );
};

export default Follow;
