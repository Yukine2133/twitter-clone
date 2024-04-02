"use client";

import { bookMarkTweet, likeTweet } from "@/lib/actions/tweet.actions";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { SlBubble } from "react-icons/sl";
import ReplyModal from "./ReplyModal";
import { useState } from "react";
import { TweetProps } from "./TweetCard";

interface TweetActions extends TweetProps {
  isBookmarked: boolean;
  isLiked: boolean;
  id: string;
}

const TweetActions = ({
  isBookmarked,
  id,
  isLiked,
  owner,
  tweet,
}: TweetActions) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const addBookmark = async (tweetId: string) => {
    try {
      const id = tweetId.toString();
      await bookMarkTweet(id);
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };
  const addLike = async (tweetId: string) => {
    try {
      const id = tweetId.toString();
      await likeTweet(id);
    } catch (error) {
      console.error("Error adding liking:", error);
    }
  };
  return (
    <div className="flex mt-1 justify-between px-8  gap-8">
      <div className="flex  gap-8 items-center">
        <button onClick={() => addLike(id)}>
          {isLiked ? (
            <FaHeart className="text-red-500 text-lg" />
          ) : (
            <FaRegHeart className="text-red-500 text-lg" />
          )}
        </button>
        <button onClick={toggleModal}>
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
      {isModalOpen && (
        <ReplyModal
          owner={owner}
          tweet={tweet}
          id={id}
          toggleModal={toggleModal}
        />
      )}
    </div>
  );
};

export default TweetActions;
