import MoreButton from "@/components/tweets/MoreButton";
import TweetActions from "@/components/tweets/TweetActions";
import { SingleTweetProps } from "@/components/tweets/TweetCard";
import { fetchTweet } from "@/lib/actions/tweet.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import Image from "next/image";
import Link from "next/link";

const SingleTweet = async ({ params }: { params: { id: string } }) => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();
  const id = params.id;
  const singleTweet = await fetchTweet(id);
  const owner = await fetchUser(singleTweet?.userId!);

  const bookmarks = singleTweet?.bookmarks;

  const isBookmarked = bookmarks?.includes(user?.id as string);

  const likes = singleTweet?.likes;

  const isLiked = likes?.includes(user?.id as string);

  return (
    <div className="p-3 relative">
      <div className="flex   gap-2 items-center">
        <Image
          src={owner.avatar}
          alt={owner.username}
          width={38}
          height={38}
          className="rounded-full object-cover"
        />
        <div>
          <Link href={`/profile/${owner.username}`}>
            <span className="font-bold ">{owner.username}</span>
          </Link>
        </div>
        <div className="absolute right-0 ">
          <MoreButton
            tweet={singleTweet as SingleTweetProps}
            id={singleTweet?._id.toString()!}
          />
        </div>
      </div>
      <h3 className="pl-5 pt-4" style={{ overflowWrap: "anywhere" }}>
        {singleTweet?.text}
      </h3>
      <div className="mt-5 py-2 border-y border-[#2f3336]">
        <TweetActions
          isBookmarked={isBookmarked as boolean}
          isLiked={isLiked as boolean}
          id={singleTweet?._id.toString()!}
          owner={JSON.parse(JSON.stringify(owner))}
          tweet={JSON.parse(JSON.stringify(singleTweet))}
        />
      </div>
    </div>
  );
};

export default SingleTweet;
