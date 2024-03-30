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

export default async function Home() {
  const tweets = await fetchTweets();

  return (
    <div className=" ">
      <AddTweet />
      {tweets?.map(async (tweet) => {
        const owner: any = await fetchUser(tweet.userId);

        return (
          <div className="mt-4 pl-3 flex gap-2 items-start" key={tweet._id}>
            <Image
              src={owner.avatar}
              alt={owner.username}
              width={38}
              height={38}
              className="rounded-full object-cover"
            />
            <div>
              <Link href={`/profile/${owner.username}`}>
                <h2 className="font-bold">{owner.username}</h2>
              </Link>
              <h3 className="">{tweet.text}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
