import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { fetchTweets } from "@/actions/tweet.actions";
import { fetchUser } from "@/actions/user.actions";
import TweetCard from "@/components/tweets/TweetCard";
import TweetForm from "@/components/tweets/tweetForm/TweetForm";
import { ITweet } from "@/interfaces/tweet.interface";
import ClientOnly from "../components/ClientOnly";

export default async function Home() {
  const tweets = await fetchTweets();

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const currentUser = await fetchUser(user?.id);

  return (
    <div>
      <TweetForm user={currentUser} />
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
