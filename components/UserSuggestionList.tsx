import UserCard from "./search/UserCard";
import FollowButton from "./buttons/FollowButton";
import { fetchUsers } from "@/actions/user.actions";
import { parseJSON } from "@/utils/parseJSON";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";

const UserSuggestionList = async () => {
  const { currentUser } = await useGetCurrentUser();
  const users = await fetchUsers(currentUser?._id);

  return (
    <div className="space-y-4">
      {users.map((user) => {
        const isFollowing = user.followers?.includes(
          currentUser?.userId as string
        );
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
