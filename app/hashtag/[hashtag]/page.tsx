import { searchTweets } from "@/actions/tweet.actions";
import ClientOnly from "@/components/ClientOnly";
import TweetCard from "@/components/tweets/TweetCard";
import { ITweet } from "@/types/tweet.interface";

const HashTagPage = async ({
  params,
}: {
  params: {
    hashtag: string;
  };
}) => {
  const hashtag = params.hashtag;
  const tweets = await searchTweets(hashtag, true);
  return (
    <div className="px-4 py-3">
      <h2 className="text-xl ">
        Tweets with hashtag: #<span className="font-semibold">{hashtag}</span>
      </h2>
      <ClientOnly>
        {tweets &&
          tweets?.map((tweet: ITweet | any) => {
            return (
              <TweetCard
                tweet={JSON.parse(JSON.stringify(tweet))}
                owner={tweet.user}
                key={tweet._id}
              />
            );
          })}
        {tweets.length === 0 && (
          <h3 className="mt-10 text-center  text-lg">
            There are no tweets with hashtag #
            <span className="font-semibold">{hashtag}</span>
          </h3>
        )}
      </ClientOnly>
    </div>
  );
};

export default HashTagPage;
