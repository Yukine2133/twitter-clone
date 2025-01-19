import { fetchUserRetweets } from "@/actions/retweet.actions";
import {
  fetchUser,
  fetchUserById,
  fetchUserTweets,
} from "@/actions/user.actions";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const useGetProfileData = async (profileUsername: string) => {
  const { getUser } = getKindeServerSession();
  const currentSessionUser = await getUser();
  const username = profileUsername;
  const user = await fetchUser(undefined, username);

  if (!user) {
    throw new Error("User doesn't exist.");
  }
  const currentUser = await fetchUser(currentSessionUser?.id);
  const tweets = await fetchUserTweets(user.userId);

  const retweets = await fetchUserRetweets();

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

  const followers = user.followers;
  const following = user.following;

  const followersOfTheUser = await Promise.all(
    followers.map(async (follower: string) => await fetchUser(follower))
  );
  const followingsOfTheUser = await Promise.all(
    following.map(async (following: string) => await fetchUserById(following))
  );

  const isFollowing = followers?.includes(currentSessionUser?.id as string);
  const isOwner = user.userId === currentUser.userId;

  const privateProfile =
    user.private === true &&
    !isOwner &&
    !user.following?.includes(currentUser?._id as string);

  return {
    username,
    currentUser,
    combinedPosts,
    followers,
    following,
    followersOfTheUser,
    followingsOfTheUser,
    isFollowing,
    isOwner,
    user,
    privateProfile,
  };
};

export default useGetProfileData;
