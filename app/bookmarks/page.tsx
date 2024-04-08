import { getUserBookmarks } from "@/lib/actions/tweet.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import BookmarksCard from "@/components/tweets/BookmarksCard";

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
      {bookmarks?.map(async (tweet) => {
        const owner: any = await fetchUser(tweet.userId);

        return <BookmarksCard tweet={tweet} owner={owner} key={tweet._id} />;
      })}
    </>
  );
};

export default Bookmarks;
