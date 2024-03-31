import Image from "next/image";
import Link from "next/link";
import MoreButton from "./MoreButton";
import { fetchTweet } from "@/lib/actions/tweet.actions";

interface TweetProps {
  tweet: {
    text: string;
    _id: string;
  };
  owner: {
    avatar: string;
    username: string;
  };
}

const TweetCard = async ({ tweet, owner }: TweetProps) => {
  const singleTweet = await fetchTweet(tweet._id);
  return (
    <div className="mt-4 relative pl-3 flex gap-2 items-start">
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
        <MoreButton tweet={singleTweet as any} id={tweet._id.toString()} />
      </div>
    </div>
  );
};

export default TweetCard;
