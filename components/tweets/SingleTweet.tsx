import { SingleTweetProps } from "@/interfaces/tweet.interface";

import ReplyTweets from "@/components/tweets/ReplyTweets";
import TweetActions from "@/components/tweets/TweetActions";
import Image from "next/image";
import Link from "next/link";
import TweetForm from "@/components/tweets/tweetForm/TweetForm";
import { formatDate } from "@/utils/formatTimestamp";
import MoreButton from "../buttons/moreButton/MoreButton";
import GoBackButton from "../buttons/GoBackButton";
import TweetMedia from "./media/TweetMedia";
import { renderTweetTextWithHashtags } from "@/utils/formatTweetText";

const SingleTweet = ({
  owner,
  singleTweet,
  currentUser,
  isBookmarked,
  isLiked,
  isRetweeted,
  userBookmarkFolders,
}: SingleTweetProps) => {
  const singleTweetId = singleTweet._id;
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-6 border-b border-neutral-800 bg-black/80 px-4 backdrop-blur-md">
        <GoBackButton />
        <h1 className="text-xl font-bold">Tweet</h1>
      </header>

      {/* Tweet Content */}
      <article className=" border-neutral-800 px-4 pt-3">
        <div className="mb-4 group">
          <div className="flex relative items-start justify-between gap-3">
            <div className="flex gap-3">
              <Image
                src={owner.avatar || "/placeholder.svg"}
                alt={owner.displayName}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <Link
                  href={`/profile/${owner.username}`}
                  className="group/name flex flex-col"
                >
                  <span className="font-bold group-hover/name:underline">
                    {owner.displayName}
                  </span>
                  <span className="text-neutral-500">@{owner.username}</span>
                </Link>
              </div>
            </div>
            <MoreButton tweet={singleTweet} id={singleTweetId} />
          </div>
        </div>

        <div className="mb-3 space-y-4">
          <div className="text-xl leading-normal break-words">
            {renderTweetTextWithHashtags(singleTweet?.text as string)}
          </div>

          <TweetMedia data={singleTweet} />

          <div className="flex gap-1 text-neutral-500">
            <time className="text-sm hover:underline">
              {formatDate(singleTweet?.createdAt as Date)}
            </time>
          </div>
        </div>
      </article>

      <div className="mt-5 w-full py-2 border-y border-neutral-800">
        <TweetActions
          user={currentUser}
          isBookmarked={isBookmarked}
          isLiked={isLiked}
          id={singleTweetId}
          owner={owner}
          tweet={singleTweet}
          isRetweeted={isRetweeted}
          userBookmarkFolders={userBookmarkFolders}
        />
      </div>

      {/* Reply Form */}
      <div className="border-b border-neutral-800">
        <TweetForm user={currentUser} id={singleTweetId} />
      </div>

      {/* Replies */}
      <div className="divide-y divide-neutral-800">
        <ReplyTweets tweet={singleTweet} tweetId={singleTweetId} />
      </div>
    </div>
  );
};

export default SingleTweet;
