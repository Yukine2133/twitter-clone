import { fetchUser } from "@/actions/user.actions";
import ProfileData from "@/components/profile/ProfileData";
import useGetProfileData from "@/utils/lib/hooks/useGetProfileData";

export const generateMetadata = async ({
  params,
}: {
  params: { username: string };
}) => {
  const user = await fetchUser(undefined, params.username);
  return {
    title: user.username,
  };
};

const ProfilePage = async ({
  params,
}: {
  params: {
    username: string;
  };
}) => {
  const {
    username,
    currentUser,
    tweets,
    followers,
    following,
    followersOfTheUser,
    followingsOfTheUser,
    isFollowing,
    isOwner,
    user,
  } = await useGetProfileData(params.username);

  if (!tweets) {
    return (
      <h2 className="p-6 text-center text-xl">
        Something went wrong. Please reload page.
      </h2>
    );
  }

  return (
    <ProfileData
      user={user}
      tweets={tweets}
      isOwner={isOwner}
      followers={followers}
      following={following}
      followersOfTheUser={followersOfTheUser}
      followingsOfTheUser={followingsOfTheUser}
      username={username}
      isFollowing={isFollowing}
      currentUser={currentUser}
    />
  );
};

export default ProfilePage;
