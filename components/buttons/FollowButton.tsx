"use client";

import { followUser } from "@/actions/user.actions";
import { toast } from "react-toastify";

const FollowButton = ({
  userId,
  isFollowing,
  username,
  currentUserId,
}: {
  userId: string;
  isFollowing: boolean;
  username: string;
  currentUserId: string;
}) => {
  const handleFollowUser = async () => {
    try {
      const res = await followUser(userId, username, currentUserId);
      if (res?.message) {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(String(error));
    }
  };
  return (
    <button
      className="bg-blue-500 p-2 font-bold rounded-full text-white"
      onClick={handleFollowUser}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
