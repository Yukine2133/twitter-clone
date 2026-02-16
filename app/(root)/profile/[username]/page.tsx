import ProfileData from "@/components/profile/ProfileData";
import useGetProfileData from "@/hooks/useGetProfileData";
import { parseJSON } from "@/utils/parseJSON";

export const generateMetadata = async ({
  params,
}: {
  params: { username: string };
}) => {
  const { username } = await params;
  return {
    title: username,
  };
};

const ProfilePage = async ({
  searchParams,
}: {
  searchParams: {
    userId: string;
  };
}) => {
  const { userId } = await searchParams;
  const {
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
  } = await useGetProfileData(userId);

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
