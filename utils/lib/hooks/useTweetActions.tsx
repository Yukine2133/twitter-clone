import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { bookMarkTweet } from "@/actions/bookmark.actions";
import { saveRetweet } from "@/actions/retweet.actions";
import { likeTweet } from "@/actions/like.actions";

interface ITweetActions {
  initialIsLiked: boolean;
  initialIsRetweeted: boolean;
  initialIsBookmarked: boolean;
  likesLength: number;
  retweetsLength: number;
}

const useTweetActions = ({
  initialIsLiked,
  initialIsRetweeted,
  initialIsBookmarked,
  likesLength,
  retweetsLength,
}: ITweetActions) => {
  const [localIsLiked, setLocalIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(likesLength);

  const [localIsRetweeted, setLocalIsRetweeted] = useState(initialIsRetweeted);
  const [retweetCount, setRetweetCount] = useState(retweetsLength);

  const [localIsBookmarked, setLocalIsBookmarked] =
    useState(initialIsBookmarked);
  const [userHasBookmarked, setUserHasBookmarked] = useState(false);

  useEffect(() => {
    setLocalIsLiked(initialIsLiked);
    setLikeCount(likesLength);
    setLocalIsRetweeted(initialIsRetweeted);
    setRetweetCount(retweetsLength);
    setLocalIsBookmarked(initialIsBookmarked);
  }, [
    initialIsLiked,
    likesLength,
    initialIsRetweeted,
    retweetsLength,
    initialIsBookmarked,
  ]);

  const addBookmark = async (tweetId: string) => {
    try {
      const id = tweetId.toString();
      setLocalIsBookmarked((prev) => !prev);
      const res = await bookMarkTweet(id);
      if (res?.message) {
        toast.error(res.message);
        setLocalIsBookmarked((prev) => !prev);
      }
      setUserHasBookmarked(true);
    } catch (error) {
      setLocalIsBookmarked((prev) => !prev);
      console.error("Error adding bookmark:", error);
    }
  };

  const addLike = async (tweetId: string) => {
    try {
      const id = tweetId.toString();
      setLocalIsLiked((prev) => !prev);
      setLikeCount((prev) => prev + (localIsLiked ? -1 : 1));
      const res = await likeTweet(id);
      if (res?.message) {
        toast.error(res.message);
        setLocalIsLiked((prev) => !prev);
        setLikeCount((prev) => prev + (localIsLiked ? 1 : -1));
      }
    } catch (error: any) {
      toast.error("Error liking tweet:", error);
      setLocalIsLiked((prev) => !prev);
      setLikeCount((prev) => prev + (localIsLiked ? 1 : -1));
    }
  };

  const addRetweet = async (tweetId: string) => {
    try {
      const id = tweetId.toString();
      setLocalIsRetweeted((prev) => !prev);
      setRetweetCount((prev) => prev + (localIsRetweeted ? -1 : 1));
      const res = await saveRetweet(id);
      if (res?.message) {
        toast.error(res.message);
        setLocalIsRetweeted((prev) => !prev);
        setRetweetCount((prev) => prev + (localIsRetweeted ? 1 : -1));
      }
    } catch (error) {
      console.error("Error retweeting:", error);
      toast.error("Error retweeting.");
      setLocalIsRetweeted((prev) => !prev);
      setRetweetCount((prev) => prev + (localIsRetweeted ? 1 : -1));
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
    localIsBookmarked,
    userHasBookmarked,
    setUserHasBookmarked,
  };
};

export default useTweetActions;
