import { fetchBookmarksForTweet } from "@/actions/bookmark.actions";
import { fetchLikesForTweet } from "@/actions/like.actions";
import { fetchRetweetsForTweet } from "@/actions/retweet.actions";

type FetchDataFunction = (id: string) => Promise<any[] | undefined>;

const useFetchUserActionForTweet = async (
  id: string,
  userId: string | undefined,
  fetchData: FetchDataFunction
) => {
  const data = await fetchData(id);

  const dataArray = Array.isArray(data) ? data : [];
  const userAction = dataArray.some(
    (item: { userId: string }) => item.userId === userId
  );
  return userAction;
};

export const useFetchLikesForTweet = async (
  id: string,
  userId: string | undefined
) => {
  return useFetchUserActionForTweet(id, userId, fetchLikesForTweet);
};

export const useFetchBookmarksForTweet = async (
  id: string,
  userId: string | undefined
) => {
  return useFetchUserActionForTweet(id, userId, fetchBookmarksForTweet);
};

export const useFetchRetweetsForTweet = async (
  id: string,
  userId: string | undefined
) => {
  return useFetchUserActionForTweet(id, userId, fetchRetweetsForTweet);
};
