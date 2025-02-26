import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addBookmarkToFolder, bookMarkTweet } from "@/actions/bookmark.actions";
import { saveRetweet } from "@/actions/retweet.actions";
import { likeTweet } from "@/actions/like.actions";
import * as solid from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";

interface ITweetActions {
  initialIsLiked: boolean;
  initialIsRetweeted: boolean;
  initialIsBookmarked: boolean;
  likesLength: number;
  retweetsLength: number;
  id: string;
  userId: string;
}

const useTweetActions = ({
  initialIsLiked,
  initialIsRetweeted,
  initialIsBookmarked,
  likesLength,
  retweetsLength,
  id,
  userId,
}: ITweetActions) => {
  const SolidHeartIcon = solid.HeartIcon;
  const SolidBookmarkIcon = solid.BookmarkIcon;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookmarkFolderModalOpen, setIsBookmarkFolderModalOpen] =
    useState(false);
  const pathname = usePathname();

  const toggleModal = () => {
    // Don't open the modal if the user is on the tweet page
    if (!pathname.includes("tweet")) {
      setIsModalOpen(!isModalOpen);
    }
  };
  const [localIsLiked, setLocalIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(likesLength);

  const [localIsRetweeted, setLocalIsRetweeted] = useState(initialIsRetweeted);
  const [retweetCount, setRetweetCount] = useState(retweetsLength);

  const [localIsBookmarked, setLocalIsBookmarked] =
    useState(initialIsBookmarked);
  const [showBookmarkNotification, setShowBookmarkNotification] =
    useState(false);

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
      } else {
        setShowBookmarkNotification(true);
        setTimeout(() => {
          setShowBookmarkNotification(false);
        }, 3000);
      }
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

  const handleClick = async (folderId: string) => {
    try {
      await addBookmarkToFolder(folderId, id, userId);
      setIsBookmarkFolderModalOpen(false);
    } catch (error) {
      console.error(error);
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
    showBookmarkNotification,
    setShowBookmarkNotification,
    toggleModal,
    isModalOpen,
    isBookmarkFolderModalOpen,
    setIsBookmarkFolderModalOpen,
    handleClick,
    SolidHeartIcon,
    SolidBookmarkIcon,
  };
};

export default useTweetActions;
