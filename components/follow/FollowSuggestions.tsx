import UserCard from "../search/UserCard";
import FollowButton from "../buttons/FollowButton";
import { useFollowSuggestions } from "@/hooks/useFollowSuggestions";
import Link from "next/link";

const FollowSuggestions = async () => {
  const { randomUsersData, currentUserData, currentUser } =
    await useFollowSuggestions();

  return (
    <div className="mt-4 w-full max-w-[350px] bg-[#16181c] rounded-2xl overflow-hidden">
      <h2 className="text-xl font-bold px-4 py-3">Who to follow</h2>
      <div className="divide-y divide-gray-800">
        {randomUsersData.map((randomUser: any) => {
          const isFollowing = randomUser.followers?.includes(
            currentUser?.id as string
          );

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
      </div>
      <Link
        href="/connect"
        className="block px-4 py-4 text-[15px] text-blue-500 hover:bg-white/[0.03] transition-colors"
      >
        Show more
      </Link>
    </div>
  );
};

export default FollowSuggestions;
