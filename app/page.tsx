import Image from "next/image";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createTweet, fetchTweets } from "@/lib/actions/tweet.actions";
import { fetchUser } from "@/lib/actions/user.actions";

export default async function Home() {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  const tweets = await fetchTweets();

  return (
    <div className=" ">
      <LoginLink>Sign in</LoginLink>
      <RegisterLink>Sign up</RegisterLink>
      {user && (
        <Image
          src={user.picture!}
          alt={user.given_name!}
          width={64}
          height={64}
        />
      )}
      {user && <LogoutLink>Logout </LogoutLink>}
      <form action={createTweet}>
        <input
          type="text"
          name="text"
          className="bg-purple-600 p-4 outline-none"
        />
        <button type="submit">Submit</button>
      </form>
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
