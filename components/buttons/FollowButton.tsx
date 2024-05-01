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
  const isNotOwner = userId != currentUserId;
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

  if (isNotOwner) {
    return (
      <button
        className="bg-white text-black py-2 px-3 font-semibold rounded-full "
        onClick={handleFollowUser}
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
    );
  }
};

export default FollowButton;
