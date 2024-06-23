import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { bookMarkTweet } from "@/actions/bookmark.actions";
import { saveRetweet } from "@/actions/retweet.actions";
import { likeTweet } from "@/actions/like.actions";

interface ITweetActions {
  initialIsLiked: boolean;
  likesLength: number;
}

const useTweetActions = ({ initialIsLiked, likesLength }: ITweetActions) => {
  const [localIsLiked, setLocalIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(likesLength);

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
        throw new Error(res.message);
      }
    } catch (error) {
      console.error("Error liking tweet:", error);
      // Revert optimistic update on error
      setLocalIsLiked(!localIsLiked);
      setLikeCount(localIsLiked ? likeCount + 1 : likeCount - 1);
    }
  };

  const addRetweet = async (tweetId: string) => {
    try {
      const id = tweetId.toString();
      const res = await saveRetweet(id);
      if (res?.message) {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Error retweeting.");
    }
  };

  return {
    addLike,
    addBookmark,
    addRetweet,
    likeCount,
    localIsLiked,
  };
};

export default useTweetActions;
