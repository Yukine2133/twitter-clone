import { searchTweets } from "@/actions/tweet.actions";
import TweetCard from "@/components/tweets/TweetCard";
import SearchResults from "@/components/search/SearchResults";
import { ITweet } from "@/interfaces/tweet.interface";

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: { q: string | null };
}) => {
  if (!searchParams.q) {
    return { title: "Explore " };
  }
  return {
    title: `${searchParams.q} - Search`,
  };
};

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { q: string | null };
}) => {
  const query = searchParams.q;
  const tweets = await searchTweets(query);

  const renderTweetResult = async (tweet: ITweet) => {
    return <TweetCard tweet={tweet} owner={tweet.user} key={tweet._id} />;
  };

  return (
    <SearchResults
      path="search"
      query={query}
      results={tweets!}
      renderResult={renderTweetResult}
    />
  );
};

export default SearchPage;
