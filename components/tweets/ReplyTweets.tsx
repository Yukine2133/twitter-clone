import { fetchUser } from "@/actions/user.actions";
import Image from "next/image";
import Link from "next/link";
import MoreButton from "./MoreButton";
import { deleteReply } from "@/actions/tweet.actions";
import { IReply } from "@/types/tweet.interface";

interface ReplyTweets {
  tweet: {
    text: string;
    _id: string;
    likes: string[];
    replies: IReply[];
  };
}

const ReplyTweets = async ({ tweet }: ReplyTweets) => {
  const owner = await Promise.all(
    tweet.replies.map(async (reply: any) => await fetchUser(reply.user))
  );
  return (
    <div>
      {owner.map((owner, index) => {
        return (
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
                {tweet.replies[index].image && (
                  <Image
                    src={tweet.replies[index].image}
                    alt="User Image"
                    width={400}
                    height={400}
                    className="object-cover mt-2 "
                  />
                )}
              </div>
              <div className="absolute right-0 ">
                <MoreButton
                  replyId={tweet.replies[index]._id}
                  tweet={tweet as any}
                  replyTweet={tweet.replies[index].text}
                  id={tweet._id.toString()}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReplyTweets;
