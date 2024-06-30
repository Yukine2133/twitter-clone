import { ITweet } from "@/types/tweet.interface";
import { IUser } from "@/types/user.interface";
import ReplyTweets from "@/components/tweets/ReplyTweets";
import TweetActions from "@/components/tweets/TweetActions";
import Image from "next/image";
import Link from "next/link";
import TweetForm from "@/components/tweets/tweetForm/TweetForm";
import { formatDate } from "@/utils/formatTimestamp";
import MoreButton from "../buttons/moreButton/MoreButton";
import GoBackButton from "../buttons/GoBackButton";
import TweetMedia from "./TweetMedia";

interface SingleTweetProps {
  owner: IUser;
  currentUser: IUser;
  singleTweet: ITweet;
  isBookmarked: boolean;
  isLiked: boolean;
  isRetweeted: boolean;
}

const SingleTweet = ({
  owner,
  singleTweet,
  currentUser,
  isBookmarked,
  isLiked,
  isRetweeted,
}: SingleTweetProps) => {
  return (
    <div className="pt-3 relative">
      <div className="group px-3  ">
        <div className="flex items-center gap-4 mb-4">
          <GoBackButton />
          <h2 className="text-xl font-semibold ">Tweet</h2>
        </div>
        <div className="flex relative  gap-3 items-center">
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
          <div className="absolute right-0  ">
            <MoreButton
              tweet={JSON.parse(JSON.stringify(singleTweet))}
              id={singleTweet._id.toString()}
            />
          </div>
        </div>
        <h3
          className="pl-5 pt-4 mb-2 text-lg"
          style={{ overflowWrap: "anywhere" }}
        >
          {singleTweet?.text}
        </h3>

        <TweetMedia data={JSON.parse(JSON.stringify(singleTweet))} />

        <p className="text-gray-500 text-[15px] mt-2 ">
          {formatDate(singleTweet?.createdAt as Date)}
        </p>
      </div>
      <div className="mt-5 py-2 border-y border-[#2f3336]">
        <TweetActions
          user={currentUser!}
          isBookmarked={isBookmarked as boolean}
          isLiked={isLiked as boolean}
          id={singleTweet?._id.toString()!}
          owner={JSON.parse(JSON.stringify(owner))}
          tweet={JSON.parse(JSON.stringify(singleTweet))}
          isRetweeted={isRetweeted}
        />
      </div>
      <div className="mt-2  border-b border-[#2f3336]">
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
