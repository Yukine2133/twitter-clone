import ReplyForm from "@/components/tweets/ReplyForm";
import ReplyTweets from "@/components/tweets/ReplyTweets";
import TweetActions from "@/components/tweets/TweetActions";
import { fetchTweet } from "@/actions/tweet.actions";
import { fetchUser } from "@/actions/user.actions";
import { formattedDate, formattedTime } from "@/utils/formatTimestamp";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import Image from "next/image";
import Link from "next/link";
import TweetForm from "@/components/tweets/TweetForm";

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
      <div className="flex   gap-2 items-center">
        <Image
          src={owner.avatar}
          alt={owner.username}
          width={38}
          height={38}
          className="rounded-full object-cover"
        />
        <div className="flex items-center gap-2">
          <Link href={`/profile/${owner.username}`}>
            <span className="font-bold ">{owner.username}</span>
          </Link>
          <span className="text-sm text-slate-500">
            {formattedDate(singleTweet?.createdAt!)},{" "}
            {formattedTime(singleTweet?.createdAt!)}
          </span>
        </div>
      </div>
      <h3 className="pl-5 pt-4 mb-2" style={{ overflowWrap: "anywhere" }}>
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

      <ReplyTweets tweet={JSON.parse(JSON.stringify(singleTweet))} />
    </div>
  );
};

export default SingleTweet;
