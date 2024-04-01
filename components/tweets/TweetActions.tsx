"use client";

import { bookMarkTweet } from "@/lib/actions/bookmarks.actions";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { SlBubble } from "react-icons/sl";

interface TweetActions {
  isBookmarked: boolean;
  id: string;
}

const TweetActions = ({ isBookmarked, id }: TweetActions) => {
  const addBookmark = async (tweetId: string) => {
    try {
      const id = tweetId.toString();
      await bookMarkTweet(id);
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };
  const isLiked = false;
  return (
    <div className="flex mt-1 justify-between px-8  gap-8">
      <div className="flex  gap-8 items-center">
        <button>
          {isLiked ? (
            // <IoMdHeart />
            <FaHeart className="text-red-500 text-lg" />
          ) : (
            <FaRegHeart className="text-red-500 text-lg" />
          )}
        </button>
        <button>
          <SlBubble />
        </button>
      </div>
      <button className="justify-end flex" onClick={() => addBookmark(id)}>
        {isBookmarked ? (
          <BsBookmarkFill className="text-blue-500" />
        ) : (
          <BsBookmark />
        )}
      </button>
    </div>
  );
};

export default TweetActions;
