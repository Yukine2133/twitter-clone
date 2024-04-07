import MoreButton from "@/components/tweets/MoreButton";
import TweetActions from "@/components/tweets/TweetActions";
import { SingleTweetProps } from "@/components/tweets/TweetCard";
import {
  deleteTweet,
  fetchTweet,
  getUserBookmarks,
} from "@/lib/actions/tweet.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import BookmarksCard from "@/components/tweets/BookmarksCard";

const Bookmarks = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const bookmarks = await getUserBookmarks(user?.id as string);

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
