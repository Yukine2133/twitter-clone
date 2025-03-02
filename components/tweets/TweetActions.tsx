"use client";

import { TweetActionsProps } from "@/interfaces/tweet.interface";
import {
  ArrowPathRoundedSquareIcon,
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import useTweetActions from "@/hooks/tweetsLogic/useTweetActions";
import { ReplyModal } from "./ReplyModal";
import { BookmarkNotification } from "../bookmarks/BookmarkNotification";
import { BookmarkModal } from "../bookmarks/BookmarkModal";

const TweetActions = ({
  isBookmarked: initialIsBookmarked,
  isRetweeted: initialIsRetweeted,
  isLiked: initialIsLiked,
  id,
  owner,
  tweet,
  user,
  userBookmarkFolders,
}: TweetActionsProps) => {
  const {
    addLike,
    addBookmark,
    showBookmarkNotification,
    setShowBookmarkNotification,
    addRetweet,
    likeCount,
    localIsLiked,
    retweetCount,
    localIsRetweeted,
    localIsBookmarked,
    toggleModal,
    isModalOpen,
    isBookmarkFolderModalOpen,
    setIsBookmarkFolderModalOpen,
    handleBookmarkFolderClick,
    SolidHeartIcon,
    SolidBookmarkIcon,
  } = useTweetActions({
    initialIsLiked,
    initialIsRetweeted,
    initialIsBookmarked,
    likesLength: tweet.likes.length,
    retweetsLength: tweet.retweets.length,
    id,
    userId: user.userId,
  });

  const repliesCount = tweet.replies.length;

  return (
    <div className="flex mt-2 justify-between px-8 gap-8">
      <div className="flex gap-8 items-center text-gray-500">
        <div className="group">
          <button
            className="flex gap-1.5 items-center "
            onClick={() => addLike(id)}
          >
            {localIsLiked ? (
              <SolidHeartIcon className="text-red-500 group-hover:text-gray-500 duration-300 transition-colors h-5 w-5 text-lg" />
            ) : (
              <HeartIcon className="h-5 w-5 group-hover:text-red-500 duration-300 transition-colors text-lg" />
            )}
            <span
              className={`text-sm font-semibold ${
                localIsLiked &&
                "text-red-500 group-hover:text-gray-500 duration-300 transition-colors"
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
                localIsRetweeted
                  ? "text-green-400 text-sm font-semibold group-hover:text-gray-500 duration-300 transition-colors h-5 w-5"
                  : "group-hover:text-green-400 duration-300 transition-colors h-5 w-5"
              }`}
            />
            <span
              className={`${
                localIsRetweeted
                  ? "text-green-400 text-sm font-semibold group-hover:text-gray-500 duration-300 transition-colors"
                  : "text-sm font-semibold group-hover:text-green-400 duration-300 transition-colors"
              }`}
            >
              {retweetCount > 0 ? retweetCount : ""}
            </span>
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="justify-end flex" onClick={() => addBookmark(id)}>
          {localIsBookmarked ? (
            <SolidBookmarkIcon className="text-blue-500 h-5 w-5" />
          ) : (
            <BookmarkIcon className="h-5 w-5 hover:text-blue-500 transition-colors duration-300" />
          )}
        </button>
      </div>

      <ReplyModal
        id={id}
        toggleModal={toggleModal}
        isModalOpen={isModalOpen}
        owner={owner}
        tweetText={tweet.text}
        user={user}
      />

      {showBookmarkNotification && localIsBookmarked && (
        <BookmarkNotification
          isBookmarkFolderModalOpen={isBookmarkFolderModalOpen}
          setIsBookmarkFolderModalOpen={setIsBookmarkFolderModalOpen}
          setShowBookmarkNotification={setShowBookmarkNotification}
        />
      )}
      {isBookmarkFolderModalOpen && (
        <BookmarkModal
          handleBookmarkFolderClick={handleBookmarkFolderClick}
          userBookmarkFolders={userBookmarkFolders}
          isBookmarkFolderModalOpen={isBookmarkFolderModalOpen}
          setIsBookmarkFolderModalOpen={setIsBookmarkFolderModalOpen}
        />
      )}
    </div>
  );
};

export default TweetActions;
