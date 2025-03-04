import { fetchTweets } from "@/actions/tweet.actions";
import TweetCard from "@/components/tweets/TweetCard";
import TweetForm from "@/components/tweets/tweetForm/TweetForm";
import { ITweet } from "@/interfaces/tweet.interface";
import ClientOnly from "../components/ClientOnly";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { parseJSON } from "@/utils/parseJSON";

export default async function Home() {
  const tweets = await fetchTweets();

  const { currentUser } = await useGetCurrentUser();

  return (
    <div>
      <TweetForm user={parseJSON(currentUser)} />
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
