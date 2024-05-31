import { searchTweets } from "@/actions/tweet.actions";
import { fetchUser } from "@/actions/user.actions";
import TweetCard from "@/components/tweets/TweetCard";
import SearchResults from "@/components/search/SearchResults";
import { IUser } from "@/types/user.interface";
import { ITweet } from "@/types/tweet.interface";
import ClientOnly from "@/components/ClientOnly";

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
    const owner: IUser = await fetchUser(tweet.userId);
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
