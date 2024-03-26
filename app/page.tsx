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

export default async function Home() {
  const tweets = await fetchTweets();

  return (
    <div className=" ">
      <AddTweet />
      {tweets?.map(async (tweet) => {
        const owner: any = await fetchUser(tweet.userId);

        return (
          <div key={tweet._id}>
            <Image
              src={owner.avatar}
              alt={owner.username}
              width={32}
              height={32}
            />
            <h2>{tweet.text}</h2>
          </div>
        );
      })}
    </div>
  );
}
