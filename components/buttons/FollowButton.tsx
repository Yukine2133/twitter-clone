"use client";

import { followUser } from "@/actions/user.actions";

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
  return (
    <button
      className="bg-blue-500 p-2 font-bold rounded-full text-white"
      onClick={async () => await followUser(userId, username, currentUserId)}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
