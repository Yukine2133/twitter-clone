import { fetchRetweetsForTweet } from "@/actions/retweet.actions";

const useFetchRetweetsForTweet = async (
  id: string,
  userId: string | undefined
) => {
  const retweetsData = await fetchRetweetsForTweet(id);
  const retweets = Array.isArray(retweetsData) ? retweetsData : [];
  const isRetweeted = retweets.some(
    (retweet: { userId: string }) => retweet.userId === userId
  );
  return isRetweeted;
};

export default useFetchRetweetsForTweet;
