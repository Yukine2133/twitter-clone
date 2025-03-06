import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import TweetCard from "@/components/tweets/TweetCard";
import { Metadata } from "next";
import { ITweet } from "@/interfaces/tweet.interface";
import { getUserBookmarks } from "@/actions/bookmark.actions";
import ClientOnly from "@/components/ClientOnly";

export const metadata: Metadata = {
  title: "All Bookmarks",
  description: "Tweeter Bookmarks",
};

const AllBookmarks = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const bookmarks = await getUserBookmarks(user?.id as string);

  if (bookmarks?.length === 0) {
    return (
      <h1 className="pt-3 px-2 md:px-4 text-xl">
        You haven&apos;t added any tweets to your bookmarks.
      </h1>
    );
  }

  return (
    <>
      <h2 className="mt-2 text-lg mb-2 px-2 md:px-4">Your bookmarks</h2>
      <ClientOnly>
        {bookmarks?.map(async (tweet: ITweet) => {
          return <TweetCard tweet={tweet} owner={tweet.user} key={tweet._id} />;
        })}
      </ClientOnly>
    </>
  );
};

export default AllBookmarks;
