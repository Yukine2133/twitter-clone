"use client";

import { useState } from "react";
import Link from "next/link";
import { ITweetProps } from "@/types/tweet.interface";
import { toast } from "react-toastify";
import Modal from "./Modal";
import Image from "next/image";
import TweetForm from "./tweetForm/TweetForm";
import {
  ArrowPathRoundedSquareIcon,
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import * as solid from "@heroicons/react/24/solid";
import { likeTweet } from "@/actions/like.actions";
import { bookMarkTweet } from "@/actions/bookmark.actions";
import { saveRetweet } from "@/actions/retweet.actions";

interface TweetActions extends ITweetProps {
  isBookmarked: boolean;
  isLiked: boolean;
  id: string;
  seeTweet?: boolean;
  user: any;
  isRetweeted: boolean;
}

const TweetActions = ({
  isBookmarked,
  id,
  isLiked,
  owner,
  tweet,
  user,
  seeTweet,
  isRetweeted,
}: TweetActions) => {
  const SolidHeartIcon = solid.HeartIcon;
  const SolidBookmarkIcon = solid.BookmarkIcon;
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

  const addRetweet = async (tweetId: string) => {
    try {
      const id = tweetId.toString();
      const res = await saveRetweet(id);
      if (res?.message) {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Error Retweeting.");
    }
  };

  const likeCount = tweet.likes.length;
  const repliesCount = tweet.replies.length;
  const retweetsCount = tweet.retweets.length;
  return (
    <div className="flex mt-2 justify-between px-8  gap-8">
      <div className="flex gap-8 items-center text-gray-500">
        <div className="group  ">
          <button
            className="flex gap-1.5 items-center "
            onClick={() => addLike(id)}
          >
            {isLiked ? (
              <SolidHeartIcon className="text-red-500 group-hover:text-gray-500 duration-300 transition-colors h-5 w-5 text-lg" />
            ) : (
              <HeartIcon className=" h-5 w-5 group-hover:text-red-500 duration-300 transition-colors   text-lg" />
            )}
            <span
              className={`text-sm font-semibold ${
                isLiked &&
                "text-red-500 group-hover:text-gray-500 duration-300 transition-colors "
              } group-hover:text-red-500 duration-300 transition-colors`}
            >
              {likeCount > 0 ? likeCount : ""}
            </span>
          </button>
        </div>
        <div className="group">
          <button className="flex gap-1.5 items-center" onClick={toggleModal}>
            <ChatBubbleOvalLeftIcon className="group-hover:text-blue-400 duration-300 transition-colors h-5 w-5" />
            <span className="text-sm font-semibold group-hover:text-blue-400 duration-300 transition-colors">
              {repliesCount > 0 ? repliesCount : ""}
            </span>
          </button>
        </div>
        <div className="group">
          <button
            className="flex gap-1.5 items-center"
            onClick={() => addRetweet(id)}
          >
            <ArrowPathRoundedSquareIcon
              className={`${
                isRetweeted
                  ? "text-green-400 text-sm font-semibold group-hover:text-gray-500 duration-300 transition-colors h-5 w-5 "
                  : "group-hover:text-green-400 duration-300 transition-colors h-5 w-5"
              } `}
            />
            <span
              className={`${
                isRetweeted
                  ? "text-green-400 text-sm font-semibold group-hover:text-gray-500 duration-300 transition-colors"
                  : "text-sm font-semibold group-hover:text-green-400 duration-300 transition-colors"
              }`}
            >
              {retweetsCount > 0 ? retweetsCount : ""}
            </span>
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="justify-end flex" onClick={() => addBookmark(id)}>
          {isBookmarked ? (
            <SolidBookmarkIcon className="text-blue-500 h-5 w-5" />
          ) : (
            <BookmarkIcon className="h-5 w-5 hover:text-blue-500 transition-colors duration-300" />
          )}
        </button>
        {seeTweet && (
          <Link className="text-sm" href={`/tweet/${tweet._id}`}>
            See Tweet
          </Link>
        )}
      </div>
      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} toggleModal={toggleModal}>
          <div className="flex  gap-2 items-start">
            <Image
              src={owner.avatar}
              alt={owner.username}
              width={46}
              height={46}
              className="rounded-full object-cover"
            />
            <div>
              <Link href={`/profile/${owner.username}`}>
                <span className="font-bold ">{owner.username}</span>
              </Link>
              <h3 style={{ overflowWrap: "anywhere" }}>{tweet.text}</h3>
            </div>
          </div>
          <h4 className="mt-7 mb-6 ">
            Replying to <span className="font-bold ">{owner.username}</span>
          </h4>
          <TweetForm user={user!} id={id} toggleModal={toggleModal} />
        </Modal>
      )}
    </div>
  );
};

export default TweetActions;
