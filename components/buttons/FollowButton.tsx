"use client";

import { followUser } from "@/actions/user.actions";
import { toast } from "react-toastify";
import { useState } from "react";

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
  const [following, setFollowing] = useState(isFollowing);
  const [hovering, setHovering] = useState(false);
  const isNotOwner = userId !== currentUserId;

  const handleFollowUser = async () => {
    try {
      setFollowing(!following);
      const res = await followUser(userId, currentUserId);
      if (res?.message) {
        toast.error(res.message);
        setFollowing(following); // Revert on error
      }
    } catch (error) {
      toast.error(String(error));
      setFollowing(following); // Revert on error
    }
  };

  if (isNotOwner) {
    return (
      <button
        className={`rounded-full px-4 py-1.5 font-bold text-sm transition-colors ${
          following
            ? "bg-transparent text-white border border-gray-600 hover:border-red-600 hover:bg-red-500/10"
            : "bg-white text-black hover:bg-white/90"
        }`}
        onClick={handleFollowUser}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {following ? (hovering ? "Unfollow" : "Following") : "Follow"}
      </button>
    );
  }

  return null;
};

export default FollowButton;
