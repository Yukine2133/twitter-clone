import Image from "next/image";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createTweet } from "@/lib/actions/tweet.actions";

export default async function Home() {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  return (
    <>
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
    </>
  );
}
