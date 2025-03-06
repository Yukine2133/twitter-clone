import { fetchUser } from "@/actions/user.actions";
import ProfileData from "@/components/profile/ProfileData";
import useGetProfileData from "@/hooks/useGetProfileData";
import { parseJSON } from "@/utils/parseJSON";

export const generateMetadata = async ({
  params,
}: {
  params: { username: string };
}) => {
  return {
    title: params.username,
  };
};

const ProfilePage = async ({
  searchParams,
}: {
  searchParams: {
    userId: string;
  };
}) => {
  const {
    currentUser,
    followers,
    following,
    followersOfTheUser,
    followingsOfTheUser,
    isFollowing,
    isOwner,
    dbUser,
    currentDbUser,
    combinedPosts,
    privateProfile,
  } = await useGetProfileData(searchParams.userId);

  return (
    <ProfileData
      user={dbUser}
      isOwner={isOwner}
      followers={followers}
      following={following}
      followersOfTheUser={parseJSON(followersOfTheUser)}
      followingsOfTheUser={parseJSON(followingsOfTheUser)}
      isFollowing={isFollowing}
      currentUser={currentDbUser}
      combinedPosts={parseJSON(combinedPosts)}
      privateProfile={privateProfile}
    />
  );
};

export default ProfilePage;
