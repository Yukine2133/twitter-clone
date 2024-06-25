import Image from "next/image";
import Link from "next/link";
import React from "react";
import TweetActions from "./TweetActions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ITweetProps } from "@/types/tweet.interface";
import MoreButton from "../buttons/moreButton/MoreButton";
import { fetchUser } from "@/actions/user.actions";
import { formatCreatedAt } from "@/utils/formatTimestamp";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";

import {
  useFetchLikesForTweet,
  useFetchBookmarksForTweet,
  useFetchRetweetsForTweet,
} from "@/utils/lib/hooks/useFetchUserActonForTweet";
import HoverUserInfo from "../HoverUserInfo";

const TweetCard = async ({ tweet, owner, type }: ITweetProps) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const currentUser = await fetchUser(user?.id);

  const isLiked = await useFetchLikesForTweet(tweet._id, user?.id);
  const isBookmarked = await useFetchBookmarksForTweet(tweet._id, user?.id);
  const isRetweeted = await useFetchRetweetsForTweet(tweet._id, user?.id);

  return (
    <div className="mt-4 px-2 md:px-4 py-3 border-y border-[#2f3336] w-full relative hover:bg-[#080808] transition-colors duration-300">
      <div className=" group">
        <Link href={`/tweet/${tweet._id}`}>
          {type && type === "retweet" && (
            <div className="flex items-center gap-3 pl-4 mb-3 text-gray-500 ">
              <ArrowPathRoundedSquareIcon className="w-5 h-5" />
              <h4>{currentUser.displayName}</h4>
              <span>Retweeted</span>
            </div>
          )}
          <div className="flex gap-2 items-start">
            <HoverUserInfo user={owner}>
              <Image
                src={owner.avatar}
                alt={owner.username}
                width={38}
                height={38}
                className="rounded-full object-cover"
              />
            </HoverUserInfo>

            <div>
              <HoverUserInfo user={owner}>
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
              </HoverUserInfo>

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
        <div className="absolute right-2 top-2 ">
          <MoreButton
            tweet={JSON.parse(JSON.stringify(tweet))}
            id={tweet._id.toString()}
          />
        </div>
      </div>
      <TweetActions
        isBookmarked={isBookmarked}
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
