"use client";

import { fetchFollowSuggestions } from "@/actions/user.actions";
import FollowButton from "@/components/buttons/FollowButton";
import UserCard from "@/components/search/UserCard";
import { IUsersData } from "@/interfaces/user.interface";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const FollowSuggestionCard = ({ userId }: { userId: string }) => {
  const { data } = useQuery({
    queryKey: ["followSuggestions", userId],
    queryFn: () => fetchFollowSuggestions(userId),
  });

  const {
    parsedJSONRandomUsersData: randomUsersData,
    parsedJSONCurrentUserData: currentUserData,
  } = data as IUsersData;

  return (
    <>
      {randomUsersData.map((randomUser: any) => {
        const isFollowing = randomUser.followers?.includes(userId as string);

        return (
          <div
            className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors"
            key={randomUser._id}
          >
            <div className="flex-1 min-w-0">
              <UserCard user={randomUser} />
            </div>
            <div className="flex-shrink-0">
              <FollowButton
                currentUserId={currentUserData?._id}
                isFollowing={isFollowing}
                userId={randomUser._id.toString()}
                username={randomUser.username}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};
