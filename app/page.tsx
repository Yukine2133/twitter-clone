import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { fetchTweets } from "@/actions/tweet.actions";
import { fetchUser } from "@/actions/user.actions";
import TweetCard from "@/components/tweets/TweetCard";
import TweetForm from "@/components/tweets/tweetForm/TweetForm";
import { ITweet } from "@/types/tweet.interface";
import ClientOnly from "../components/ClientOnly";

export default async function Home() {
  const tweets = await fetchTweets();

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const currentUser = await fetchUser(user?.id);

  return (
    <div className=" ">
      <TweetForm user={currentUser!} />
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
      </ClientOnly>
    </div>
  );
}
