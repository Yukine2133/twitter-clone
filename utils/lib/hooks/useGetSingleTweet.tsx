import { fetchTweet } from "@/actions/tweet.actions";
import { fetchUser } from "@/actions/user.actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  useFetchLikesForTweet,
  useFetchBookmarksForTweet,
  useFetchRetweetsForTweet,
} from "@/utils/lib/hooks/useFetchUserActonForTweet";

const useGetSingleTweet = async (paramsId: string) => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();
  const id = paramsId;
  const singleTweet = await fetchTweet(id);

  const owner = await fetchUser(singleTweet?.userId!);
  const currentUser = await fetchUser(user?.id);

  const isLiked = await useFetchLikesForTweet(id, user?.id);
  const isBookmarked = await useFetchBookmarksForTweet(id, user?.id);
  const isRetweeted = await useFetchRetweetsForTweet(id, user?.id);

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
