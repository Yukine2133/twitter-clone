import { fetchLikesForTweet } from "@/actions/like.actions";
import { fetchTweet } from "@/actions/tweet.actions";
import { fetchUser } from "@/actions/user.actions";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const useGetSingleTweet = async (paramsId: string) => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();
  const id = paramsId;
  const singleTweet = await fetchTweet(id);

  const owner = await fetchUser(singleTweet?.userId!);
  const currentUser = await fetchUser(user?.id);

  const bookmarks = singleTweet?.bookmarks;

  const isBookmarked = bookmarks?.includes(user?.id as string);

  const likesData = await fetchLikesForTweet(singleTweet._id);

  const likes = Array.isArray(likesData) ? likesData : [];

  const isLiked = likes.some(
    (like: { userId: string }) => like.userId === user?.id
  );

  return { owner, singleTweet, currentUser, isBookmarked, isLiked };
};

export default useGetSingleTweet;
