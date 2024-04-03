import { fetchUser } from "@/lib/actions/user.actions";
import { TweetProps } from "./TweetCard";

interface ReplyTweets {
  tweet: {
    text: string;
    _id: string;
    likes: string[];
    replies: string[];
  };
}

const ReplyTweets = ({ tweet }: ReplyTweets) => {
  return (
    <div>
      {tweet.replies.map(async (reply: any) => {
        const owner: any = await fetchUser(reply.user);
        return (
          <div key={reply._id}>
            <h3>
              {" "}
              {owner.username} {reply.text}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default ReplyTweets;
