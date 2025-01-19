import { fetchUser } from "@/actions/user.actions";
import ProfileData from "@/components/profile/ProfileData";
import useGetProfileData from "@/hooks/useGetProfileData";

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
    followers,
    following,
    followersOfTheUser,
    followingsOfTheUser,
    isFollowing,
    isOwner,
    user,
    combinedPosts,
    privateProfile,
  } = await useGetProfileData(params.username);

  return (
    <ProfileData
      user={user}
      isOwner={isOwner}
      followers={followers}
      following={following}
      followersOfTheUser={followersOfTheUser}
      followingsOfTheUser={followingsOfTheUser}
      username={username}
      isFollowing={isFollowing}
      currentUser={currentUser}
      combinedPosts={combinedPosts}
      privateProfile={privateProfile}
    />
  );
};

export default ProfilePage;
