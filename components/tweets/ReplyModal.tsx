"use client";

import { fetchTweet, replyTweet } from "@/lib/actions/tweet.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import Link from "next/link";
import { TweetProps } from "./TweetCard";
import { useRef } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

interface IReplyModal extends TweetProps {
  toggleModal: () => void;
  id: string;
}

const ReplyModal = ({ toggleModal, tweet, owner }: IReplyModal) => {
  const { user, isLoading } = useKindeBrowserClient();
  const ref = useRef<HTMLFormElement>(null);

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-80 flex justify-center items-center">
      <div className="bg-black shadow-sm rounded-lg p-8">
        <div className="flex  gap-2 items-start">
          <Image
            src={owner.avatar}
            alt={owner.username}
            width={38}
            height={38}
            className="rounded-full object-cover"
          />
          <div>
            <Link href={`/profile/${owner.username}`}>
              <span className="font-bold ">{owner.username}</span>
            </Link>
            <h3 style={{ overflowWrap: "anywhere" }}>{tweet.text}</h3>
          </div>
        </div>
        <h4 className="mt-8 ">
          Replying to <span className="font-bold ">{owner.username}</span>
        </h4>
        <form
          ref={ref}
          action={async (formData) => {
            // await replyTweet(formData, tweetId);
            ref.current?.reset();
          }}
          className="border-y mt-1 p-3 border-[#2f3336]"
        >
          <div className="flex gap-2 mt-1">
            {isLoading ? (
              <div className="rounded-full animate-pulse bg-slate-700 h-12 w-14"></div>
            ) : (
              <Image
                src={user?.picture!}
                alt={user?.given_name!}
                width={48}
                height={48}
                className="rounded-full"
              />
            )}
            <input
              type="text"
              name="text"
              placeholder="What is happening?!"
              className="bg-transparent  placeholder:text-zinc-600 outline-none w-full"
            />
          </div>
          <div className="mt-2 flex justify-between items-end px-6">
            <button>Image</button>
            <button
              className="bg-blue-500 rounded-full px-3 py-1  font-semibold "
              type="submit"
            >
              Post
            </button>
          </div>
        </form>
        <button
          onClick={toggleModal}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Close Modal
        </button>
      </div>
    </div>
  );
};

export default ReplyModal;
