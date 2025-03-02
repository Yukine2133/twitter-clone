import UserCard from "./search/UserCard";
import FollowButton from "./buttons/FollowButton";
import { fetchUser, fetchUsers } from "@/actions/user.actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { parseJSON } from "@/utils/parseJSON";

const UserSuggestionList = async () => {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  const currentUser = await fetchUser(kindeUser?.id);
  const users = await fetchUsers(currentUser?._id);

  return (
    <div className="space-y-4">
      {users.map((user) => {
        const isFollowing = user.followers?.includes(kindeUser?.id as string);
        return (
          <div key={user._id} className="flex items-center justify-between">
            <UserCard user={parseJSON(user)} />
            <FollowButton
              currentUserId={currentUser?._id as string}
              isFollowing={isFollowing}
              userId={user._id.toString()}
              username={user.username}
            />
          </div>
        );
      })}
    </div>
  );
};

export default UserSuggestionList;
