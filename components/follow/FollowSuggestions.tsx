import UserCard from "../search/UserCard";
import FollowButton from "../buttons/FollowButton";
import { useFollowSuggestions } from "@/hooks/useFollowSuggestions";

const FollowSuggestions = async () => {
  const { randomUsersData, currentUserData, currentUser } =
    await useFollowSuggestions();

  return (
    <div className="bg-[#16181c] w-80 mt-4 px-4 py-2 rounded-lg">
      <h4 className="text-xl font-semibold mb-4">Who to follow</h4>
      {randomUsersData.map((randomUser: any) => {
        const isFollowing = randomUser.followers?.includes(
          currentUser?.id as string
        );

        return (
          <div
            className="flex items-center justify-between"
            key={randomUser._id}
          >
            <UserCard user={randomUser} />
            <FollowButton
              currentUserId={currentUserData?._id}
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
