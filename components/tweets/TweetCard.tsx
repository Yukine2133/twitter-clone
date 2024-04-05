import Image from "next/image";
import Link from "next/link";
import MoreButton from "./MoreButton";
import {
  deleteTweet,
  fetchTweet,
  updateTweet,
} from "@/lib/actions/tweet.actions";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import TweetActions from "./TweetActions";
import { Reply } from "./ReplyTweets";

export interface TweetProps {
  tweet: {
    text: string;
    _id: string;
    likes: string[];
    replies: string[];
  };
  owner: {
    avatar: string;
    username: string;
  };
}

export interface SingleTweetProps {
  _id: string;
  text: string;
  userId: string;
  replies: Reply[];
}

const TweetCard = async ({ tweet, owner }: TweetProps) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const singleTweet = await fetchTweet(tweet._id);
  const bookmarks = singleTweet?.bookmarks;
  const isBookmarked = bookmarks?.includes(user?.id as string);
  const likes = singleTweet?.likes;
  const isLiked = likes?.includes(user?.id as string);

  return (
    <div className="mt-4 py-3 border-y border-[#2f3336] w-full relative  ">
      <div className="flex  gap-2 items-start">
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
          <h3 style={{ overflowWrap: "anywhere" }}>{tweet.text}</h3>
        </div>
        <div className="absolute right-0 ">
          <MoreButton
            action={deleteTweet}
            tweet={singleTweet as SingleTweetProps}
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
        seeMore
        user={user!}
      />
    </div>
  );
};

export default TweetCard;
