import { searchTweets } from "@/actions/tweet.actions";
import { fetchUser } from "@/actions/user.actions";
import TweetCard from "@/components/tweets/TweetCard";
import SearchResults from "@/components/search/SearchResults";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { q: string | null };
}) => {
  const query = searchParams.q;
  const tweets = await searchTweets(query);

  const renderTweetResult = async (tweet: any) => {
    const owner: any = await fetchUser(tweet.userId);
    return <TweetCard tweet={tweet} owner={owner} key={tweet._id} />;
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
