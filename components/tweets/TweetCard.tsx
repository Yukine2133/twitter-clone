import Image from "next/image";
import Link from "next/link";
import React from "react";
import TweetActions from "./TweetActions";
import { ITweetProps } from "@/interfaces/tweet.interface";
import MoreButton from "../buttons/moreButton/MoreButton";
import { formatCreatedAt } from "@/utils/formatTimestamp";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import HoverUserInfo from "./HoverUserInfo";
import TweetMedia from "./media/TweetMedia";
import useTweetCard from "@/hooks/tweetsLogic/useTweetCard";
import { renderTweetTextWithHashtags } from "@/utils/formatTweetText";
import { VerifiedBadge } from "../premium/VerifiedBadge";
import AdminBadge from "../badges/AdminBadge";

const TweetCard = async ({
  tweet,
  owner,
  type,
  retweetedUser,
}: ITweetProps) => {
  const {
    currentDbUser,
    isLiked,
    isBookmarked,
    isRetweeted,
    userBookmarkFolders,
  } = await useTweetCard({ tweetId: tweet._id });

  return (
    <div className="mt-4 px-2 md:px-4 py-3 border-y border-[#2f3336] w-full relative hover:bg-[#080808] transition-colors duration-300">
      <div className="group">
        <Link href={`/tweet/${tweet._id}`}>
          {type && type === "retweet" && (
            <div className="flex items-center gap-3 pl-4 mb-3 text-gray-500 ">
              <ArrowPathRoundedSquareIcon className="w-5 h-5" />
              <div className="flex items-center gap-2">
                <h4>{retweetedUser?.displayName}</h4>
                {owner.isAdmin && <AdminBadge />}
                <VerifiedBadge isSubscribed={owner.isSubscribed} />
              </div>
              <span>Retweeted</span>
            </div>
          )}
          <div className="flex gap-2 items-start">
            <HoverUserInfo user={owner}>
              <Image
                src={owner.avatar}
                alt={owner.username}
                width={42}
                height={42}
                className="rounded-full max-w-14 max-h-10 object-cover"
              />
            </HoverUserInfo>

            <div>
              <div className="flex items-center w-full gap-2">
                <HoverUserInfo user={owner}>
                  <Link
                    className="flex items-center gap-2"
                    href={`/profile/${owner.username}?userId=${owner.userId}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold w-[100px] truncate sm:w-fit">
                        {owner.displayName}
                      </span>
                      {owner.isAdmin && <AdminBadge />}
                      {!owner.isAdmin && (
                        <VerifiedBadge isSubscribed={owner.isSubscribed} />
                      )}
                    </div>
                    <span className="text-gray-500 text-[15px] w-[100px] truncate sm:w-fit ">
                      @{owner.username}
                    </span>
                  </Link>
                </HoverUserInfo>
                <div className="flex text-gray-500 text-[15px] items-center gap-1">
                  <span>&middot;</span>
                  <span>{formatCreatedAt(tweet.createdAt)}</span>
                </div>
              </div>

              <h3
                className="whitespace-pre-line"
                style={{ overflowWrap: "anywhere" }}
              >
                {renderTweetTextWithHashtags(tweet.text)}
              </h3>
            </div>
          </div>
        </Link>
        <TweetMedia neededMarginLeft data={tweet} />
        <div className="absolute right-2 top-2 ">
          <MoreButton
            isAdmin={currentDbUser.isAdmin}
            tweet={tweet}
            id={tweet._id}
          />
        </div>
      </div>
      <TweetActions
        isBookmarked={isBookmarked}
        isLiked={isLiked as boolean}
        isRetweeted={isRetweeted}
        id={tweet._id.toString()}
        owner={owner}
        tweet={tweet}
        user={currentDbUser!}
        userBookmarkFolders={userBookmarkFolders}
      />
    </div>
  );
};

export default TweetCard;
