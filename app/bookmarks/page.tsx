import { fetchUser } from "@/actions/user.actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import TweetCard from "@/components/tweets/TweetCard";
import { Metadata } from "next";
import { IUser } from "@/types/user.interface";
import { ITweet } from "@/types/tweet.interface";
import { getUserBookmarks } from "@/actions/bookmark.actions";
import ClientOnly from "@/components/ClientOnly";

export const metadata: Metadata = {
  title: "Bookmarks",
  description: "Tweeter Bookmarks",
};

const Bookmarks = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const bookmarks = await getUserBookmarks(user?.id as string);

  if (bookmarks?.length === 0) {
    return (
      <h1 className="pt-3 text-xl">
        You haven&apos;t added any tweets to your bookmarks.
      </h1>
    );
  }

  return (
    <>
      <h2 className="mt-2 text-lg mb-2">Your bookmarks</h2>
      <ClientOnly>
        {bookmarks?.map(async (tweet: ITweet) => {
          const owner: IUser = await fetchUser(tweet.userId);

          return <TweetCard tweet={tweet} owner={owner} key={tweet._id} />;
        })}
      </ClientOnly>
    </>
  );
};

export default Bookmarks;
