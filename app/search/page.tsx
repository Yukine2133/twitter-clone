import { searchTweets } from "@/actions/tweet.actions";
import { fetchUser } from "@/actions/user.actions";
import SearchInput from "@/components/search/SearchInput";
import TweetCard from "@/components/tweets/TweetCard";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { q: string | null };
}) => {
  const query = searchParams.q;
  const tweets = await searchTweets(query);
  if (!tweets) {
    return null;
  }

  if (!query) {
    return (
      <div className="mt-2">
        <SearchInput />
        <h2 className="mt-4 text-lg">Enter a search query to see results</h2>
      </div>
    );
  }
  return (
    <div className="mt-2 ">
      <SearchInput />
      {tweets.length === 0 ? (
        <h2 className="mt-2 text-lg">
          No results for{" "}
          <span className="font-semibold">&quot;{query}&quot;</span>{" "}
        </h2>
      ) : (
        <h2 className="mt-2 text-lg">
          Results for <span className="font-semibold">&quot;{query}&quot;</span>
        </h2>
      )}

      {tweets.map(async (tweet) => {
        const owner: any = await fetchUser(tweet.userId);

        return <TweetCard tweet={tweet} owner={owner} key={tweet._id} />;
      })}
    </div>
  );
};

export default SearchPage;
