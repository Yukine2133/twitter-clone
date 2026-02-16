import { searchTweets } from "@/actions/tweet.actions";
import TweetCard from "@/components/tweets/TweetCard";
import SearchResults from "@/components/search/SearchResults";
import { ITweet } from "@/interfaces/tweet.interface";

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: { q: string | null };
}) => {
  const { q } = await searchParams;
  if (!q) {
    return { title: "Explore " };
  }
  return {
    title: `${q} - Search`,
  };
};

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { q: string | null };
}) => {
  const { q } = await searchParams;
  const tweets = await searchTweets(q);

  const renderTweetResult = async (tweet: ITweet) => {
    return <TweetCard tweet={tweet} owner={tweet.user} key={tweet._id} />;
  };

  return (
    <SearchResults
      path="search"
      query={q}
      results={tweets!}
      renderResult={renderTweetResult}
    />
  );
};

export default SearchPage;
