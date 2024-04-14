import Image from "next/image";
import Link from "next/link";
import React from "react";
import TweetActions from "./TweetActions";
import { deleteTweet, fetchTweet } from "@/actions/tweet.actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ISingleTweetProps, ITweetProps } from "@/types/tweet.interface";
import MoreButton from "./MoreButton";

const TweetCard = async ({ tweet, owner }: ITweetProps) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const singleTweet = await fetchTweet(tweet._id);
  const bookmarks = singleTweet?.bookmarks;
  const isBookmarked = bookmarks?.includes(user?.id as string);
  const likes = singleTweet?.likes;
  const isLiked = likes?.includes(user?.id as string);
  return (
    <div className="mt-4 py-3 border-y border-[#2f3336] w-full relative">
      <div className="flex gap-2 items-start">
        <Image
          src={owner.avatar}
          alt={owner.username}
          width={38}
          height={38}
          className="rounded-full object-cover"
        />
        <div>
          <Link href={`/profile/${owner.username}`}>
            <span className="font-bold">{owner.username}</span>
          </Link>
          <h3 style={{ overflowWrap: "anywhere" }}>{tweet.text}</h3>
        </div>
        <div className="absolute right-0 ">
          <MoreButton
            action={deleteTweet}
            tweet={singleTweet as ISingleTweetProps}
            id={tweet._id.toString()}
          />
        </div>
      </div>
      <TweetActions
        isBookmarked={isBookmarked as boolean}
        isLiked={isLiked as boolean}
        id={tweet._id.toString()}
        owner={JSON.parse(JSON.stringify(owner))}
        tweet={JSON.parse(JSON.stringify(tweet))}
        seeTweet
        user={user!}
      />
    </div>
  );
};

export default TweetCard;
