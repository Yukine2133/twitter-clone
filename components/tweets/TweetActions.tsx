"use client";

import { bookMarkTweet, likeTweet } from "@/actions/tweet.actions";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { SlBubble } from "react-icons/sl";
import ReplyModal from "./ReplyModal";
import { useState } from "react";
import Link from "next/link";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { ITweetProps } from "@/types/tweet.interface";
import { toast } from "react-toastify";

interface TweetActions extends ITweetProps {
  isBookmarked: boolean;
  isLiked: boolean;
  id: string;
  seeTweet?: boolean;
  user: KindeUser;
}

const TweetActions = ({
  isBookmarked,
  id,
  isLiked,
  owner,
  tweet,
  seeTweet,
  user,
}: TweetActions) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
      const res = await likeTweet(id);
      if (res?.message) {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error adding liking:", error);
    }
  };

  const likeCount = tweet.likes.length;
  const repliesCount = tweet.replies.length;
  return (
    <div className="flex mt-1 justify-between px-8  gap-8">
      <div className="flex gap-8 items-center">
        <div className="group">
          <button
            className="flex gap-1.5 items-center "
            onClick={() => addLike(id)}
          >
            {isLiked ? (
              <FaHeart className="text-red-500 text-lg" />
            ) : (
              <FaRegHeart className="text-gray-400 group-hover:text-red-500 duration-300 transition-colors   text-lg" />
            )}
            <span
              className={`text-sm font-semibold ${
                isLiked && "text-red-500"
              } group-hover:text-red-500 duration-300 transition-colors`}
            >
              {likeCount}
            </span>
          </button>
        </div>
        <div className="group">
          <button className="flex gap-1.5 items-center" onClick={toggleModal}>
            <SlBubble className="group-hover:text-blue-400 duration-300 transition-colors" />
            <span className="text-sm font-semibold group-hover:text-blue-400 duration-300 transition-colors">
              {repliesCount}
            </span>
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="justify-end flex" onClick={() => addBookmark(id)}>
          {isBookmarked ? (
            <BsBookmarkFill className="text-blue-500" />
          ) : (
            <BsBookmark />
          )}
        </button>
        {seeTweet && (
          <Link className="text-sm" href={`/tweet/${tweet._id}`}>
            See Tweet
          </Link>
        )}
      </div>
      {isModalOpen && (
        <ReplyModal
          user={user!}
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
