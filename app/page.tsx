import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { fetchTweets } from "@/actions/tweet.actions";
import { fetchUser } from "@/actions/user.actions";
import AddTweet from "@/components/tweets/AddTweet";
import TweetCard from "@/components/tweets/TweetCard";
import TweetForm from "@/components/tweets/TweetForm";

export default async function Home() {
  const tweets = await fetchTweets();

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className=" ">
      <TweetForm user={user!} />
      {tweets &&
        tweets?.map(async (tweet) => {
          const owner: any = await fetchUser(tweet.userId);

          return <TweetCard tweet={tweet} owner={owner} key={tweet._id} />;
        })}
    </div>
  );
}
