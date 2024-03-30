import Image from "next/image";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createTweet, fetchTweets } from "@/lib/actions/tweet.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import AddTweet from "@/components/AddTweet";
import Link from "next/link";
import TweetCard from "@/components/TweetCard";

export default async function Home() {
  const tweets = await fetchTweets();

  return (
    <div className=" ">
      <AddTweet />
      {tweets?.map(async (tweet) => {
        const owner: any = await fetchUser(tweet.userId);

        return <TweetCard tweet={tweet} owner={owner} key={tweet._id} />;
      })}
    </div>
  );
}
