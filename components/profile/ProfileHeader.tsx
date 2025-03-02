"use client";

import { useEffect, useState } from "react";
import GoBackButton from "../buttons/GoBackButton";
import Link from "next/link";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import FollowButton from "../buttons/FollowButton";
import { IProfileHeaderProps } from "@/interfaces/user.interface";

export const ProfileHeader = ({
  user,
  currentUser,
  combinedPostsLength,
  isOwner,
  isFollowing,
}: IProfileHeaderProps) => {
  const [showFollowButton, setShowFollowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show follow button after scrolling past the profile section
      const scrollThreshold = 300; // Adjust this value based on your layout
      setShowFollowButton(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className="sticky top-0 z-20">
      <div className="flex items-center justify-between bg-black/60 backdrop-blur-md px-4 py-2">
        <div className="flex items-center gap-6">
          <GoBackButton />
          <div className="flex flex-col">
            <h3 className="font-bold text-xl">{user.displayName}</h3>

            <span className="text-sm text-neutral-500">
              {combinedPostsLength || 0} posts
            </span>
          </div>
        </div>
        {showFollowButton && !isOwner && (
          <div className="flex items-center gap-2">
            <Link
              className="p-2 border border-neutral-700 rounded-full hover:bg-neutral-900 transition-colors"
              href={`/messages/${user.username}?userId=${user.userId}`}
            >
              <EnvelopeIcon className="h-5 w-5" />
            </Link>
            <FollowButton
              username={user.username}
              isFollowing={isFollowing}
              userId={user._id.toString()}
              currentUserId={currentUser._id.toString()}
            />
          </div>
        )}
      </div>
    </header>
  );
};
