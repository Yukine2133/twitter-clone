"use client";

import { replyTweet } from "@/lib/actions/tweet.actions";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import { useRef } from "react";

interface IReplyForm {
  id: string;
  toggleModal?: (arg0: boolean) => void;
}

const ReplyForm = ({ id, toggleModal }: IReplyForm) => {
  const { user, isLoading } = useKindeBrowserClient();

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await replyTweet(formData, id);
        formRef.current?.reset();
        toggleModal && toggleModal(false);
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
  );
};

export default ReplyForm;
