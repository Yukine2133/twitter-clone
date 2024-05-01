import ReplyTweets from "@/components/tweets/ReplyTweets";
import TweetActions from "@/components/tweets/TweetActions";
import { fetchTweet } from "@/actions/tweet.actions";
import { fetchUser } from "@/actions/user.actions";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import Image from "next/image";
import Link from "next/link";
import TweetForm from "@/components/tweets/TweetForm";
import { formatDate } from "@/utils/formatTimestamp";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const tweet = await fetchTweet(params.id);
  return {
    title: tweet?.text,
  };
};

const SingleTweet = async ({ params }: { params: { id: string } }) => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();
  const id = params.id;
  const singleTweet = await fetchTweet(id);

  const owner = await fetchUser(singleTweet?.userId!);
  const currentUser = await fetchUser(user?.id);

  const bookmarks = singleTweet?.bookmarks;

  const isBookmarked = bookmarks?.includes(user?.id as string);

  const likes = singleTweet?.likes;

  const isLiked = likes?.includes(user?.id as string);

  return (
    <div className="p-3 relative ">
      <div className="flex   gap-4 items-center">
        <Image
          src={owner.avatar}
          alt={owner.username}
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
        <Link className="flex  flex-col " href={`/profile/${owner.username}`}>
          <span className="font-semibold ">{owner.displayName}</span>
          <span className="text-gray-500 ">@{owner.username}</span>
        </Link>
      </div>
      <h3
        className="pl-5 pt-4 mb-2 text-lg"
        style={{ overflowWrap: "anywhere" }}
      >
        {singleTweet?.text}
      </h3>

      {singleTweet?.image && (
        <Image
          src={singleTweet.image}
          alt="User Image"
          width={500}
          height={400}
          className="object-cover"
        />
      )}
      {singleTweet?.video && (
        <video src={singleTweet.video} className="rounded-lg mt-1" controls />
      )}
      <span className="text-gray-500 text-[15px]">
        {formatDate(singleTweet?.createdAt as Date)}
      </span>
      <div className="mt-5 py-2 border-y border-[#2f3336]">
        <TweetActions
          user={currentUser!}
          isBookmarked={isBookmarked as boolean}
          isLiked={isLiked as boolean}
          id={singleTweet?._id.toString()!}
          owner={JSON.parse(JSON.stringify(owner))}
          tweet={JSON.parse(JSON.stringify(singleTweet))}
        />
      </div>
      <div className="mt-2 border-b border-[#2f3336]">
        <TweetForm user={currentUser!} id={singleTweet?._id.toString()!} />
      </div>

      <ReplyTweets
        tweet={JSON.parse(JSON.stringify(singleTweet))}
        tweetId={singleTweet?._id.toString() as string}
      />
    </div>
  );
};

export default SingleTweet;
