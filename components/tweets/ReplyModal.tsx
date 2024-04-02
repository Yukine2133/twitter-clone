import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect } from "react";
import { TweetProps } from "./TweetCard";
import { replyTweet } from "@/lib/actions/tweet.actions";

interface IReplyModal extends TweetProps {
  toggleModal: (arg0: boolean) => void;
  id: string;
}

const ReplyModal = ({ toggleModal, id, tweet, owner }: IReplyModal) => {
  const { user, isLoading } = useKindeBrowserClient();
  const ref = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        toggleModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleModal]);

  return (
    <div className="fixed  top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-80 flex justify-center items-center">
      <div ref={ref} className="bg-black shadow-sm w-[700px] rounded-lg p-8">
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
        <h4 className="mt-7 mb-6 ">
          Replying to <span className="font-bold ">{owner.username}</span>
        </h4>
        <form
          ref={formRef}
          action={async (formData) => {
            await replyTweet(formData, id);
            formRef.current?.reset();
            toggleModal(false);
          }}
          className=" mt-1 p-3 "
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
              placeholder="Post your reply"
              className="bg-transparent  placeholder:text-zinc-600 outline-none w-full"
            />
          </div>
          <div className="mt-2 flex justify-between items-end px-6">
            <button>Image</button>
            <button
              className="bg-blue-500 rounded-full px-3 py-1  font-semibold "
              type="submit"
            >
              Reply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReplyModal;
