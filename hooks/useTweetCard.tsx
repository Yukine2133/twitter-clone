import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { fetchUser } from "@/actions/user.actions";
import {
  useFetchLikesForTweet,
  useFetchBookmarksForTweet,
  useFetchRetweetsForTweet,
} from "@/hooks/useFetchUserActonForTweet";
import { getUserBookmarkFolders } from "@/actions/bookmark.actions";
import Link from "next/link";
const useTweetCard = async ({ tweetId }: { tweetId: string }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const currentUser = await fetchUser(user?.id);

  const isLiked = await useFetchLikesForTweet(tweetId, user?.id);
  const isBookmarked = await useFetchBookmarksForTweet(tweetId, user?.id);
  const isRetweeted = await useFetchRetweetsForTweet(tweetId, user?.id);

  const userBookmarkFolders = await getUserBookmarkFolders(user?.id as string);

  return {
    currentUser,
    isLiked,
    isBookmarked,
    isRetweeted,
    userBookmarkFolders,
  };
};

export default useTweetCard;
