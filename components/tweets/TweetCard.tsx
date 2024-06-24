import Image from "next/image";
import Link from "next/link";
import React from "react";
import TweetActions from "./TweetActions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ITweetProps } from "@/types/tweet.interface";
import MoreButton from "../buttons/moreButton/MoreButton";
import { fetchUser } from "@/actions/user.actions";
import { formatCreatedAt } from "@/utils/formatTimestamp";
import useFetchLikesForTweet from "@/utils/lib/hooks/useFetchLikesForTweet";
import useFetchRetweetsForTweet from "@/utils/lib/hooks/useFetchRetweetsForTweet";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";

const TweetCard = async ({ tweet, owner, type }: ITweetProps) => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const currentUser = await fetchUser(user?.id);
  const bookmarks = tweet?.bookmarks;
  const isBookmarked = bookmarks?.includes(user?.id as string);

  const isLiked = await useFetchLikesForTweet(tweet._id, user?.id);
  const isRetweeted = await useFetchRetweetsForTweet(tweet._id, user?.id);

  return (
    <div className="mt-4 py-3 border-y border-[#2f3336] w-full relative hover:bg-[#080808]">
      <Link href={`/tweet/${tweet._id}`}>
        {type && type === "retweet" && (
          <div className="flex items-center gap-3 pl-4 mb-3 text-gray-500 ">
            <ArrowPathRoundedSquareIcon className="w-5 h-5" />
            <h4>{currentUser.username}</h4>
            <span>Retweeted</span>
          </div>
        )}
        <div className="flex gap-2 items-start">
          <Image
            src={owner.avatar}
            alt={owner.username}
            width={38}
            height={38}
            className="rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <Link
                className="flex items-center gap-2"
                href={`/profile/${owner.username}`}
              >
                <span className="font-semibold w-[100px] truncate sm:w-fit">
                  {owner.displayName}
                </span>
                <span className="text-gray-500 text-[15px] w-[100px] truncate sm:w-fit ">
                  @{owner.username}
                </span>
              </Link>
              <div className="flex text-gray-500 text-[15px] items-center gap-1">
                <span>&middot;</span>
                <span>{formatCreatedAt(tweet.createdAt)}</span>
              </div>
            </div>
            <h3
              className="whitespace-pre-line"
              style={{ overflowWrap: "anywhere" }}
            >
              {tweet.text}
            </h3>
            {tweet.image && (
              <Image
                src={tweet.image}
                alt="User Image"
                width={400}
                height={400}
                className="object-cover rounded-lg mt-1"
              />
            )}
            {tweet.video && (
              <video className="rounded-lg mt-1" controls src={tweet.video} />
            )}
          </div>
        </div>
      </Link>
      <div className="absolute right-0 top-2 ">
        <MoreButton
          tweet={JSON.parse(JSON.stringify(tweet))}
          id={tweet._id.toString()}
        />
      </div>
      <TweetActions
        isBookmarked={isBookmarked as boolean}
        isLiked={isLiked as boolean}
        isRetweeted={isRetweeted}
        id={tweet._id.toString()}
        owner={JSON.parse(JSON.stringify(owner))}
        tweet={JSON.parse(JSON.stringify(tweet))}
        user={currentUser!}
      />
    </div>
  );
};

export default TweetCard;
