import Image from "next/image";
import Link from "next/link";
import React from "react";
import TweetActions from "./TweetActions";
import { deleteTweet } from "@/actions/tweet.actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ITweetProps } from "@/types/tweet.interface";
import MoreButton from "./MoreButton";
import { fetchUser } from "@/actions/user.actions";

const TweetCard = async ({ tweet, owner }: ITweetProps) => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const currentUser = await fetchUser(user?.id);
  const bookmarks = tweet?.bookmarks;
  const isBookmarked = bookmarks?.includes(user?.id as string);
  const likes = tweet?.likes;
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
          {tweet.image && (
            <Image
              src={tweet.image}
              alt="User Image"
              width={400}
              height={400}
              className="object-cover rounded-lg"
            />
          )}
          {tweet.video && (
            <video className="rounded-lg" controls src={tweet.video} />
          )}
        </div>
        <div className="absolute right-0 ">
          <MoreButton
            tweet={JSON.parse(JSON.stringify(tweet))}
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
        user={currentUser!}
        seeTweet
      />
    </div>
  );
};

export default TweetCard;
