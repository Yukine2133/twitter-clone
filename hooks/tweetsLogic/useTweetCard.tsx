import {
  useFetchLikesForTweet,
  useFetchBookmarksForTweet,
  useFetchRetweetsForTweet,
} from "@/hooks/useFetchUserActonForTweet";
import { getUserBookmarkFolders } from "@/actions/bookmark.actions";

import { useGetCurrentUser } from "../useGetCurrentUser";
const useTweetCard = async ({ tweetId }: { tweetId: string }) => {
  const { currentDbUser, user } = await useGetCurrentUser();

  const isLiked = await useFetchLikesForTweet(tweetId, user?.id);
  const isBookmarked = await useFetchBookmarksForTweet(tweetId, user?.id);
  const isRetweeted = await useFetchRetweetsForTweet(tweetId, user?.id);

  const userBookmarkFolders = await getUserBookmarkFolders(user?.id as string);

  return {
    currentDbUser,
    isLiked,
    isBookmarked,
    isRetweeted,
    userBookmarkFolders,
  };
};

export default useTweetCard;
