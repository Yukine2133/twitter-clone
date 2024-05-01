import { fetchUser, fetchUsers } from "@/actions/user.actions";
import { IUser } from "@/types/user.interface";
import UserCard from "../search/UserCard";
import FollowButton from "../buttons/FollowButton";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { shuffleArray } from "@/utils/shuffleArray";

const FollowSuggestions = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const currentUser = await fetchUser(user?.id);

  const users = await fetchUsers(currentUser?._id as string);

  const shuffledUsers = shuffleArray(users as IUser[]);
  const randomUsers = shuffledUsers.slice(0, 3);

  return (
    <div className="bg-[#16181c] w-80 mt-4 px-4 py-2 rounded-lg">
      <h4 className="text-xl font-semibold mb-4">Who to follow</h4>
      {randomUsers.map((randomUser) => {
        const isFollowing = randomUser.followers?.includes(user?.id as string);

        return (
          <div
            className="flex items-center justify-between "
            key={randomUser._id}
          >
            <UserCard user={JSON.parse(JSON.stringify(randomUser))} />
            <FollowButton
              currentUserId={currentUser._id}
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
