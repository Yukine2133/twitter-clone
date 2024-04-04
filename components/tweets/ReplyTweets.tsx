import { fetchUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import Link from "next/link";

interface Reply {
  user: string;
  text: string;
  likes: string[];
}

interface ReplyTweets {
  tweet: {
    text: string;
    _id: string;
    likes: string[];
    replies: Reply[];
  };
}

const ReplyTweets = async ({ tweet }: ReplyTweets) => {
  const owner = await Promise.all(
    tweet.replies.map(async (reply: any) => await fetchUser(reply.user))
  );
  return (
    <div>
      {owner.map((owner, index) => (
        <div
          key={index}
          className="mt-3 py-3 border-y border-[#2f3336] w-full relative  "
        >
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
              <h3 style={{ overflowWrap: "anywhere" }}>
                {tweet.replies[index].text!}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReplyTweets;
