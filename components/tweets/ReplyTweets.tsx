import { fetchUser } from "@/actions/user.actions";
import Image from "next/image";
import Link from "next/link";
import MoreButton from "../buttons/moreButton/MoreButton";
import { IReply } from "@/types/tweet.interface";
import { IUser } from "@/types/user.interface";
import { toast } from "react-toastify";
import { fetchTweetReplies } from "@/actions/reply.actions";
import { formatCreatedAt } from "@/utils/formatTimestamp";
import TweetMedia from "./media/TweetMedia";

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
            className="mt-3 px-2 md:px-4 py-3 border-y border-[#2f3336] w-full relative hover:bg-[#080808] transition-colors duration-300  "
          >
            <div className="flex group  gap-2 items-start">
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
                <TweetMedia data={reply} />
              </div>
              <div className="absolute right-2 ">
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
