import { fetchTweets } from "@/actions/tweet.actions";
import TweetCard from "@/components/tweets/TweetCard";
import TweetForm from "@/components/tweets/tweetForm/TweetForm";
import { ITweet } from "@/interfaces/tweet.interface";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { parseJSON } from "@/utils/parseJSON";
import ClientOnly from "@/components/loaders/ClientOnly";

export default async function Home() {
  const tweets = await fetchTweets();

  const { currentDbUser } = await useGetCurrentUser();

  return (
    <div>
      <TweetForm user={parseJSON(currentDbUser)} />
      <ClientOnly>
        {tweets &&
          tweets?.map((tweet) => {
            return (
              <TweetCard
                tweet={tweet as ITweet}
                owner={tweet.user}
                key={tweet._id}
              />
            );
          })}
      </ClientOnly>
    </div>
  );
}
