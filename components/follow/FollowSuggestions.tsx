"use client";

import { useEffect, useState } from "react";
import UserCard from "../search/UserCard";
import FollowButton from "../buttons/FollowButton";
import { shuffleArray } from "@/utils/shuffleArray";
import { fetchUser, fetchUsers } from "@/actions/user.actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const FollowSuggestions = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [randomUsers, setRandomUsers] = useState<any>([]);

  const { user } = useKindeBrowserClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUserData = await fetchUser(user?.id);
        setCurrentUser(currentUserData);

        const usersData: any = await fetchUsers(currentUserData?._id);
        const shuffledUsers = shuffleArray(usersData);
        const randomUsersData: any = shuffledUsers.slice(0, 3);

        setRandomUsers(randomUsersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user?.id]);

  return (
    <div className="bg-[#16181c] w-80 mt-4 px-4 py-2 rounded-lg">
      <h4 className="text-xl font-semibold mb-4">Who to follow</h4>
      {randomUsers.map((randomUser: any) => {
        const isFollowing = randomUser.followers?.includes(user?.id as string);

        return (
          <div
            className="flex items-center justify-between"
            key={randomUser._id}
          >
            <UserCard user={randomUser} />
            <FollowButton
              currentUserId={currentUser?._id}
              isFollowing={isFollowing}
              userId={randomUser._id.toString()}
              username={randomUser.username}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FollowSuggestions;
