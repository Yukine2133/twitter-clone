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

  return {
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
    retweets,
  };
};

export default useGetProfileData;
