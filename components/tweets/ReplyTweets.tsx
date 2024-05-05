import { fetchUser } from "@/actions/user.actions";
import Image from "next/image";
import Link from "next/link";
import MoreButton from "../buttons/moreButton/MoreButton";
import { IReply } from "@/types/tweet.interface";
import { IUser } from "@/types/user.interface";
import { toast } from "react-toastify";
import { fetchTweetReplies } from "@/actions/reply.actions";
import { formatCreatedAt } from "@/utils/formatTimestamp";

const ReplyTweets = async ({
  tweetId,
  tweet,
}: {
  tweetId: string;
  tweet: any;
}) => {
  const replies = await fetchTweetReplies(tweetId);

  // Fix: Property 'map' does not exist on type 'any[] | { error: string; }'.
  if (!Array.isArray(replies)) {
    toast.error("Error fetching replies:");
    return null;
  }

  if (!replies) {
    return null;
  }

  return (
    <>
      {replies.map(async (reply: IReply) => {
        const owner: IUser = await fetchUser(reply.userId);
        return (
          <div
            key={reply._id}
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
                <div className="flex items-center gap-2 t">
                  <Link href={`/profile/${owner.username}`}>
                    <span className="font-bold ">{owner.username}</span>
                  </Link>
                  <div className="flex text-gray-500 text-sm items-center gap-1">
                    <span>&middot;</span>
                    <span>{formatCreatedAt(reply.createdAt)}</span>
                  </div>
                </div>
                <h3 style={{ overflowWrap: "anywhere" }}>{reply.text}</h3>
                {reply.image && (
                  <Image
                    src={reply.image}
                    alt="User Image"
                    width={400}
                    height={400}
                    className="object-cover mt-2 rounded-lg "
                  />
                )}
                {reply.video && (
                  <video className="rounded-lg" controls src={reply.video} />
                )}
              </div>
              <div className="absolute right-0 ">
                <MoreButton
                  replyId={reply._id.toString()}
                  tweet={JSON.parse(JSON.stringify(tweet))}
                  reply={JSON.parse(JSON.stringify(reply))}
                  replyTweet={reply.text}
                  id={tweet._id.toString()}
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ReplyTweets;
