import { fetchUserRetweets } from "@/actions/retweet.actions";
import {
  fetchUser,
  fetchUserById,
  fetchUserTweets,
} from "@/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";

const useGetProfileData = async (userId: string) => {
  const user = await currentUser();
  const dbUser = await fetchUser(userId);

  if (!user) {
    throw new Error("User doesn't exist.");
  }
  const currentDbUser = await fetchUser(user?.id as string);
  const tweets = await fetchUserTweets(dbUser.userId);

  const retweets = await fetchUserRetweets(dbUser.userId);

  // Mark tweets and retweets
  const markedTweets = tweets?.map((tweet) => ({ ...tweet, type: "tweet" }));
  const markedRetweets = retweets.map((retweet) => ({
    ...retweet,
    type: "retweet",
  }));

  // Combine and sort by creation date
  const combinedPosts = [
    ...(markedTweets ?? []),
    ...(markedRetweets ?? []),
  ].sort((a, b) => {
    const dateA = new Date(a.createdAt || a._doc.createdAt).getTime();
    const dateB = new Date(b.createdAt || b._doc.createdAt).getTime();
    return dateB - dateA;
  });

  const followers = dbUser.followers;
  const following = dbUser.following;

  const followersOfTheUser = await Promise.all(
    followers.map(async (follower: string) => await fetchUser(follower))
  );
  const followingsOfTheUser = await Promise.all(
    following.map(async (following: string) => await fetchUserById(following))
  );

  const isFollowing = followers?.includes(user?.id as string);
  const isOwner = dbUser.userId === currentDbUser.userId;

  const privateProfile =
    dbUser.private === true &&
    !isOwner &&
    !dbUser.following?.includes(currentDbUser?._id as string);

  return {
    combinedPosts,
    followers,
    following,
    followersOfTheUser,
    followingsOfTheUser,
    isFollowing,
    isOwner,
    dbUser,
    currentDbUser,
    privateProfile,
  };
};

export default useGetProfileData;
