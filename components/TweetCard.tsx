import Image from "next/image";
import Link from "next/link";
import MoreButton from "./MoreButton";

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

const TweetCard = ({ tweet, owner }: TweetProps) => {
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
          <h2 className="font-bold">{owner.username}</h2>
        </Link>
        <h3 className="">{tweet.text}</h3>
      </div>
      <div className="absolute right-0 ">
        <MoreButton id={tweet._id.toString()} />
      </div>
    </div>
  );
};

export default TweetCard;
