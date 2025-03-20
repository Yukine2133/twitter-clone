import { IUser } from "@/interfaces/user.interface";
import React from "react";
import { MoreButtonProfile } from "./moreButton/MoreButtonProfile";
import Link from "next/link";
import FollowButton from "../buttons/FollowButton";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import EditProfileButton from "@/components/buttons/EditProfileButton";

export const ProfileActions = ({
  user,
  isOwner,
  isFollowing,
  currentUser,
}: {
  user: IUser;
  isOwner: boolean;
  isFollowing: boolean;
  currentUser: IUser;
}) => {
  return (
    <div className="mt-4 px-4 flex items-center justify-end gap-4">
      {currentUser.isAdmin && (
        <MoreButtonProfile userId={user.userId} isBanned={user.isBanned} />
      )}
      {!isOwner && !user.isBanned && (
        <>
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
        </>
      )}
      {(isOwner || currentUser.isAdmin) && <EditProfileButton user={user} />}
    </div>
  );
};
