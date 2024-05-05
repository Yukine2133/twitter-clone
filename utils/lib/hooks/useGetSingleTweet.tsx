import { fetchTweet } from "@/actions/tweet.actions";
import { fetchUser } from "@/actions/user.actions";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import useFetchLikesForTweet from "./useFetchLikesForTweet";
import useFetchRetweetsForTweet from "./useFetchRetweetsForTweet";

const useGetSingleTweet = async (paramsId: string) => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();
  const id = paramsId;
  const singleTweet = await fetchTweet(id);

  const owner = await fetchUser(singleTweet?.userId!);
  const currentUser = await fetchUser(user?.id);

  const bookmarks = singleTweet?.bookmarks;

  const isBookmarked = bookmarks?.includes(user?.id as string);

  const isLiked = await useFetchLikesForTweet(singleTweet._id, user?.id);
  const isRetweeted = await useFetchRetweetsForTweet(singleTweet._id, user?.id);

  return {
    owner,
    singleTweet,
    currentUser,
    isBookmarked,
    isLiked,
    isRetweeted,
  };
};

export default useGetSingleTweet;
