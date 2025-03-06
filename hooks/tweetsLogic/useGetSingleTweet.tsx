import { fetchTweet } from "@/actions/tweet.actions";
import { fetchUser } from "@/actions/user.actions";
import {
  useFetchLikesForTweet,
  useFetchBookmarksForTweet,
  useFetchRetweetsForTweet,
} from "@/hooks/useFetchUserActonForTweet";
import { getUserBookmarkFolders } from "@/actions/bookmark.actions";
import { currentUser } from "@clerk/nextjs/server";

const useGetSingleTweet = async (paramsId: string) => {
  const user = await currentUser();
  const id = paramsId;
  const singleTweet = await fetchTweet(id);

  const owner = await fetchUser(singleTweet?.userId!);
  const currentDbUser = await fetchUser(user?.id);

  const isLiked = await useFetchLikesForTweet(id, user?.id);
  const isBookmarked = await useFetchBookmarksForTweet(id, user?.id);
  const isRetweeted = await useFetchRetweetsForTweet(id, user?.id);
  const userBookmarkFolders = await getUserBookmarkFolders(user?.id as string);

  return {
    owner,
    singleTweet,
    currentDbUser,
    isBookmarked,
    isLiked,
    isRetweeted,
    userBookmarkFolders,
  };
};

export default useGetSingleTweet;
