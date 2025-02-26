"use client";

import Link from "next/link";
import { ITweetProps } from "@/interfaces/tweet.interface";
import Modal from "./Modal";
import Image from "next/image";
import TweetForm from "./tweetForm/TweetForm";
import {
  ArrowPathRoundedSquareIcon,
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import useTweetActions from "@/hooks/tweetsLogic/useTweetActions";

const colors = [
  "bg-purple-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-pink-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-lime-500",
  "bg-cyan-500",
  "bg-fuchsia-500",
  "bg-violet-500",
  "bg-rose-500",
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-indigo-500",
];

interface TweetActionsProps extends ITweetProps {
  isBookmarked: boolean;
  isLiked: boolean;
  id: string;
  user: any;
  isRetweeted: boolean;
  userBookmarkFolders: any;
}

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
    handleClick,
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
      {/* {isModalOpen && (
        <Modal isModalOpen={isModalOpen} toggleModal={toggleModal}>
          <div className="flex gap-2 items-start">
            <Image
              src={owner.avatar}
              alt={owner.username}
              width={46}
              height={46}
              className="rounded-full object-cover"
            />
            <div>
              <Link href={`/profile/${owner.username}`}>
                <span className="font-bold">{owner.username}</span>
              </Link>
              <h3 style={{ overflowWrap: "anywhere" }}>{tweet.text}</h3>
            </div>
          </div>
          <h4 className="mt-7 mb-6">
            Replying to <span className="font-bold">{owner.username}</span>
          </h4>
          <TweetForm user={user} id={id} toggleModal={toggleModal} />
        </Modal>
      )} */}
      <Modal isModalOpen={isModalOpen} toggleModal={toggleModal}>
        <div className="relative max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 z-10 flex items-center bg-black/80 px-4 py-2 backdrop-blur-sm">
            <button
              onClick={toggleModal}
              className="rounded-full p-1 hover:bg-white/10"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-3 p-4">
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <Image
                  src={owner.avatar || "/placeholder.svg"}
                  alt={owner.username}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div className="my-2 h-full w-0.5 bg-neutral-800" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <Link
                    href={`/profile/${owner.username}`}
                    className="font-bold hover:underline"
                  >
                    {owner.username}
                  </Link>
                  {/* {owner.isVerified && <CheckBadgeIcon className="h-5 w-5 text-blue-500" />} */}
                </div>
                <p className="whitespace-pre-wrap break-words text-[15px] text-neutral-100">
                  {tweet.text}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Image
                src={user.avatar || "/placeholder.svg"}
                alt={user.username}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="mb-4 text-sm text-neutral-500">
                  Replying to{" "}
                  <Link
                    href={`/profile/${owner.username}`}
                    className="text-blue-500 hover:underline"
                  >
                    @{owner.username}
                  </Link>
                </p>
                <TweetForm user={user} id={id} toggleModal={toggleModal} />
                {/* <form className="space-y-4">
                  <TweetFormReply />
                </form> */}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {showBookmarkNotification && localIsBookmarked && (
        <div className="fixed bottom-10 transform translate-x-20 z-10">
          <div className="bg-blue-500 px-4 py-2 rounded-md z-10 flex gap-2">
            <h2>Added to your bookmarks. </h2>
            <button
              onClick={() => {
                setIsBookmarkFolderModalOpen(!isBookmarkFolderModalOpen);
                setShowBookmarkNotification(false);
              }}
              className="hover:underline font-medium"
            >
              Add to folder
            </button>
          </div>
        </div>
      )}
      {isBookmarkFolderModalOpen && (
        <Modal
          className="md:p-4"
          isModalOpen={isBookmarkFolderModalOpen}
          toggleModal={() => setIsBookmarkFolderModalOpen(false)}
        >
          <div className="">
            <div className="flex items-center gap-6 mb-4">
              <XMarkIcon
                onClick={() => setIsBookmarkFolderModalOpen(false)}
                className="size-6 cursor-pointer"
              />
              <h5 className="font-semibold text-xl">Add to Folder</h5>
            </div>
            {userBookmarkFolders?.map((folder: any, index: number) => {
              const colorClass = colors[index % colors.length];
              return (
                <div key={folder._id}>
                  <button
                    onClick={() => handleClick(folder._id)}
                    className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-gray-600/20 transition-colors duration-300 w-full"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`${colorClass} rounded-full p-[10px]`}>
                        <SolidBookmarkIcon className="size-6 z-10" />
                      </div>
                      <p>{folder.name}</p>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TweetActions;
