import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { bookMarkTweet } from "@/actions/bookmark.actions";
import { saveRetweet } from "@/actions/retweet.actions";
import { likeTweet } from "@/actions/like.actions";

interface ITweetActions {
  initialIsLiked: boolean;
  initialIsRetweeted: boolean;
  likesLength: number;
  retweetsLength: number;
}

const useTweetActions = ({
  initialIsLiked,
  likesLength,
  initialIsRetweeted,
  retweetsLength,
}: ITweetActions) => {
  const [localIsLiked, setLocalIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(likesLength);

  const [localIsRetweeted, setLocalIsRetweeted] = useState(initialIsRetweeted);
  const [retweetCount, setRetweetCount] = useState(retweetsLength);

  useEffect(() => {
    setLocalIsLiked(initialIsLiked);
    setLikeCount(likesLength);
  }, [initialIsLiked, likesLength]);

  const addBookmark = async (tweetId: string) => {
    try {
      const id = tweetId.toString();
      const res = await bookMarkTweet(id);
      if (res?.message) {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };

  const addLike = async (tweetId: string) => {
    try {
      const id = tweetId.toString();
      setLocalIsLiked(!localIsLiked);
      setLikeCount(localIsLiked ? likeCount - 1 : likeCount + 1);

      const res = await likeTweet(id);
      if (res?.message) {
        setLocalIsRetweeted(!localIsRetweeted);
        setRetweetCount(localIsRetweeted ? retweetCount + 1 : retweetCount - 1);
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error("Error liking tweet:", error);
      // Revert optimistic update on error
      setLocalIsLiked(!localIsLiked);
      setLikeCount(localIsLiked ? likeCount + 1 : likeCount - 1);
    }
  };

  const addRetweet = async (tweetId: string) => {
    try {
      const id = tweetId.toString();
      setLocalIsRetweeted(!localIsRetweeted);
      setRetweetCount(localIsRetweeted ? retweetCount - 1 : retweetCount + 1);

      const res = await saveRetweet(id);
      if (res?.message) {
        toast.error(res.message);
        // Revert optimistic update on error
        setLocalIsRetweeted(!localIsRetweeted);
        setRetweetCount(localIsRetweeted ? retweetCount + 1 : retweetCount - 1);
      }
    } catch (error) {
      console.error("Error retweeting:", error);
      toast.error("Error retweeting.");
      // Revert optimistic update on error
      setLocalIsRetweeted(!localIsRetweeted);
      setRetweetCount(localIsRetweeted ? retweetCount + 1 : retweetCount - 1);
    }
  };

  return {
    addLike,
    addBookmark,
    addRetweet,
    likeCount,
    localIsLiked,
    retweetCount,
    localIsRetweeted,
  };
};

export default useTweetActions;
